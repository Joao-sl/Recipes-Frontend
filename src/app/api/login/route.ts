import { setLoginSession } from '@/lib/auth/manage-user-session';
import { API_DOMAIN } from '@/lib/config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const response = await fetch(`${API_DOMAIN}/user/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const tokens = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Usuário ou senha inválidos' },
        { status: response.status },
      );
    }

    await setLoginSession(tokens);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        error: 'Desculpe, erro de conexão com o servidor por favor tente novamente mais tarde',
      },
      { status: 503 },
    );
  }
}
