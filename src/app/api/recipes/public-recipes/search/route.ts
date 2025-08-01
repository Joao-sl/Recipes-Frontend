import { API_DOMAIN } from '@/lib/config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const pageSize = request.nextUrl.searchParams.get('page_size') || '25';
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  console.log(search);

  try {
    const response = await fetch(
      `${API_DOMAIN}/api/recipes/?search=${search}&page=${page}&page_size=${pageSize}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      return NextResponse.json(await response.json(), { status: response.status });
    }

    const recipesData = await response.json();
    return NextResponse.json(recipesData);
  } catch {
    return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
  }
}
