import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { API_DOMAIN } from '@/lib/config';
import { InvalidRefreshTokenError, NetworkError } from '@/utils/errors';

type TokenPair = {
  access: string;
  refresh: string;
};

type DecodedToken = {
  exp: number;
};

export const REFRESH_COOKIE = 'refreshToken';
export const ACCESS_COOKIE = 'accessToken';
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function setRefreshCookie(refreshToken: string) {
  const cookieStore = await cookies();
  const { exp } = jwtDecode<DecodedToken>(refreshToken);
  const now_in_seconds = Date.now() / 1000;

  if (cookieStore.get(REFRESH_COOKIE)) {
    cookieStore.delete(REFRESH_COOKIE);
  }

  cookieStore.set(REFRESH_COOKIE, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: Math.round(exp - now_in_seconds),
  });
}

export async function setAccessCookie(accessToken: string) {
  const cookieStore = await cookies();
  const { exp } = jwtDecode<DecodedToken>(accessToken);
  const now_in_seconds = Date.now() / 1000;

  if (cookieStore.get(ACCESS_COOKIE)) {
    cookieStore.delete(ACCESS_COOKIE);
  }

  cookieStore.set(ACCESS_COOKIE, accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: Math.round(exp - now_in_seconds),
  });
}

export async function setLoginSession(tokens: TokenPair) {
  await setRefreshCookie(tokens.refresh);
  await setAccessCookie(tokens.access);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  const access = cookieStore.get(ACCESS_COOKIE)?.value ?? null;
  return access;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_COOKIE)?.value ?? null;
  return refresh;
}

export async function isTokenExpired(token: string | null, almostExpired = 30) {
  if (!token) return true;

  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    const now_in_seconds = Math.floor(Date.now() / 1000);

    return exp - now_in_seconds < almostExpired;
  } catch {
    return true;
  }
}

export async function refreshAccessToken() {
  const refresh = await getRefreshToken();

  if (!refresh || (await isTokenExpired(refresh))) {
    throw new InvalidRefreshTokenError();
  }

  try {
    const response = await fetch(`${API_DOMAIN}/user/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) throw new InvalidRefreshTokenError(`status: ${response.status}`);

    const { access } = await response.json();
    await setAccessCookie(access);

    return access;
  } catch (error) {
    return new NetworkError((error as Error).message);
  }
}

export async function ensureValidAccessToken() {
  let access = await getAccessToken();

  if (!access || (await isTokenExpired(access))) {
    try {
      access = await refreshAccessToken();

      return access;
    } catch (error) {
      switch (error) {
        case error instanceof NetworkError:
          return NetworkError;

        case error instanceof InvalidRefreshTokenError:
          return null;

        default:
          return null;
      }
    }
  }
  return access;
}

export async function closeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(REFRESH_COOKIE);
  cookieStore.delete(ACCESS_COOKIE);
}
