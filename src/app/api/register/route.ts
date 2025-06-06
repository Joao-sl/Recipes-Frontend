import { RegisterUserSchema } from '@/validations/user.schema';
import { NextResponse } from 'next/server';
import { API_DOMAIN } from '@/lib/config';
import { z } from 'zod/v4';

export async function POST(request: Request) {
  const data = await request.json();
  const dataParsed = RegisterUserSchema.safeParse(data);

  if (!dataParsed.success) {
    return NextResponse.json(z.flattenError(dataParsed.error), { status: 400 });
  }

  try {
    const response = await fetch(`${API_DOMAIN}/api/user/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: dataParsed.data.username,
        password: dataParsed.data.password,
        email: dataParsed.data.email,
      }),
    });

    const apiResult = await response.json();

    if (response.status === 400) {
      return NextResponse.json({ fieldErrors: apiResult }, { status: 400 });
    }

    if (!response.ok) {
      return NextResponse.json(
        { formError: 'Erro inesperado por favor tente novamente mais tarde.' },
        { status: response.status },
      );
    }

    return NextResponse.json({ data: apiResult }, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        formError: 'Desculpe, erro de conexão com o servidor por favor tente novamente mais tarde',
      },
      { status: 503 },
    );
  }
}
