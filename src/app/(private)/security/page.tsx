import { AccountSecurityForm } from '@/components/AccountSecurityForm';
import { LoadingSpinner } from '@/components/Loading';
import { getRefreshToken, getAccessToken } from '@/lib/auth/manage-user-session';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { privatePagesClasses } from '@/utils/styles/privatePageStyles';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Segurança da Conta',
};

export default async function MyRecipesPage() {
  const refresh = await getRefreshToken();
  const access = await getAccessToken();
  const url = new URL('/api/me', PUBLIC_SITE_URL);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refreshToken=${refresh}; accessToken=${access}`,
    },
    next: {
      revalidate: 600,
      tags: ['user-updated'],
    },
  });

  if (response.status === 401) {
    redirect('/login?next=%2Fsecurity');
  }

  if (!response.ok) {
    console.log(response);
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <div className={privatePagesClasses}>
          <AccountSecurityForm />
        </div>
      </Suspense>
    );
  }

  const profileData = await response.json();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className={privatePagesClasses}>
        <AccountSecurityForm email={profileData.email} />
      </div>
    </Suspense>
  );
}
