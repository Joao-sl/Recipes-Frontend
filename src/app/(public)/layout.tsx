import { HomeMenuContainer } from '@/components/HomeMenuContainer';
import { getRefreshToken, getAccessToken, closeSession } from '@/lib/auth/manage-user-session';
import { User } from '@/lib/auth/models';
import { PUBLIC_SITE_URL } from '@/lib/config';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const refresh = await getRefreshToken();
  const access = await getAccessToken();
  const url = new URL('/api/me/', PUBLIC_SITE_URL);

  const user: User | null = refresh
    ? await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: `refreshToken=${refresh}; accessToken=${access}`,
        },
        next: { revalidate: 0 },
      })
        .then(res => (res.ok ? res.json() : closeSession()))
        .catch(() => closeSession())
    : null;

  return (
    <div>
      <HomeMenuContainer user={user} />
      {children}
      <footer>TODO: FOOTER</footer>
    </div>
  );
}
