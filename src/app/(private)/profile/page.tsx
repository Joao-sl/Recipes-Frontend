import clsx from 'clsx';
import { ProfileForm } from '@/components/ProfileForm';
import { Metadata } from 'next';
import { getAccessToken, getRefreshToken } from '@/lib/auth/manage-user-session';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Perfil',
};

export default async function ProfilePage() {
  const refresh = await getRefreshToken();
  const access = await getAccessToken();
  const url = new URL('/api/me', PUBLIC_SITE_URL);
  const pageWrapperClasses = clsx(
    'flex justify-center rounded-md',
    'sm:py-6 sm:border sm:bg-slate-100 sm:border-slate-200',
  );

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
    redirect('/login?next=%2Fprofile');
  }

  if (!response.ok) {
    console.log(response);
    return (
      <div className={pageWrapperClasses}>
        <ProfileForm />
      </div>
    );
  }

  const profileData = await response.json();
  return (
    <div className={pageWrapperClasses}>
      <ProfileForm initialData={profileData.profile} />
    </div>
  );
}
