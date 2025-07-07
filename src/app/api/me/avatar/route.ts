import {
  closeSession,
  ensureValidAccessToken,
  isTokenExpired,
  REFRESH_COOKIE,
} from '@/lib/auth/manage-user-session';
import { API_DOMAIN } from '@/lib/config';
import { NetworkError } from '@/utils/errors';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const data = await request.formData();
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_COOKIE)?.value || null;

  if (await isTokenExpired(refresh)) {
    closeSession();
    return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
  }

  const access = await ensureValidAccessToken();
  if (access instanceof NetworkError) {
    return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
  }
  try {
    const response = await fetch(`${API_DOMAIN}/api/user/me/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${access}`,
      },
      body: data,
    });

    if (!response.ok) {
      return NextResponse.json(response);
    }

    revalidateTag('user-updated');
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ message: 'Server connection error' }, { status: 503 });
  }
}
