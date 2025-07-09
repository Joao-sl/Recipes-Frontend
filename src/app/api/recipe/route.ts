import {
  REFRESH_COOKIE,
  isTokenExpired,
  closeSession,
  ensureValidAccessToken,
} from '@/lib/auth/manage-user-session';
import { API_DOMAIN } from '@/lib/config';
import { NetworkError } from '@/utils/errors';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_COOKIE)?.value || null;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('page_size') || '10';

  if (await isTokenExpired(refresh)) {
    closeSession();
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
  }

  const access = await ensureValidAccessToken();
  if (access instanceof NetworkError) {
    return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
  }

  if (!access) {
    closeSession();
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${API_DOMAIN}/api/recipes/user/?page=${page}&page_size=${pageSize}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access}`,
        },
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

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_COOKIE)?.value || null;

  const dataBlob = formData.get('data') as Blob;
  const jsonData = JSON.parse(await dataBlob.text());
  const cover = formData.get('cover') as File | null;

  if (await isTokenExpired(refresh)) {
    closeSession();
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
  }

  const access = await ensureValidAccessToken();
  if (access instanceof NetworkError) {
    return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
  }

  if (!access) {
    closeSession();
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
  }

  try {
    const formData = new FormData();

    Object.entries(jsonData).forEach(([key, value]) => {
      if (value != null && (Array.isArray(value) || typeof value === 'object')) {
        formData.append(key, JSON.stringify(value));
      } else formData.append(key, String(value));
    });
    if (cover) formData.append('cover', cover);

    const response = await fetch(`${API_DOMAIN}/api/recipes/user/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: formData,
    });

    if (!response.ok) {
      return NextResponse.json(await response.json(), { status: response.status });
    }

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
  }
}
