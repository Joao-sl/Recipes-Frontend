import {
  closeSession,
  ensureValidAccessToken,
  isTokenExpired,
  REFRESH_COOKIE,
} from '@/lib/auth/manage-user-session';
import { InvalidRefreshTokenError, NetworkError } from '@/utils/errors';
import { cookies } from 'next/headers';
import { API_DOMAIN } from '@/lib/config';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refresh = cookieStore.get(REFRESH_COOKIE)?.value || null;

    if (await isTokenExpired(refresh)) {
      closeSession();
      return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
    }

    const access = await ensureValidAccessToken();
    if (!access) {
      closeSession();
      return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
    }

    const response = await fetch(`${API_DOMAIN}/api/user/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Something went wrong' }, { status: response.status });
    }
    const profileData = await response.json();

    return NextResponse.json(profileData);
  } catch (error) {
    if (error instanceof InvalidRefreshTokenError) {
      closeSession();
      return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
    }

    if (error instanceof NetworkError) {
      return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
    }
  }
  return;
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_COOKIE)?.value || null;

  if (await isTokenExpired(refresh)) {
    closeSession();
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
  }

  const access = await ensureValidAccessToken();
  try {
    const response = await fetch(`${API_DOMAIN}/api/user/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ profile: data }),
    });

    if (!response.ok) {
      return NextResponse.json(await response.json(), { status: response.status });
    }

    revalidateTag('user-updated');
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ message: 'Server connection error' }, { status: 503 });
  }
}
