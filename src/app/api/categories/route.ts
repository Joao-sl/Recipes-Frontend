import { API_DOMAIN } from '@/lib/config';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${API_DOMAIN}/api/categories/all/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Something went wrong' }, { status: response.status });
    }
    const categories = await response.json();

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'API Connection Error' }, { status: 500 });
  }
}
