import { LoadingSpinner } from '@/components/Loading';
import { NewRecipeForm } from '@/components/NewRecipeForm';
import { getAccessToken, getRefreshToken } from '@/lib/auth/manage-user-session';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Nova Receita',
};

export default async function AddNewRecipe() {
  const refresh = await getRefreshToken();
  const access = await getAccessToken();
  const url = new URL('/api/categories', PUBLIC_SITE_URL);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refreshToken=${refresh}; accessToken=${access}`,
    },
    next: {
      revalidate: false,
      tags: ['categories-updated'],
    },
  });

  if (response.status === 401) {
    redirect('/login?next=%2Fprofile');
  }

  const categoriesData = response.ok ? await response.json() : [];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className='private-page-wrapper'>
        <NewRecipeForm categoriesData={categoriesData} />
      </div>
    </Suspense>
  );
}
