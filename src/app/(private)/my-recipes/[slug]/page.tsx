import { EditRecipeForm } from '@/components/EditRecipeForm';
import { FetchError } from '@/components/FetchError';
import { getRefreshToken, getAccessToken } from '@/lib/auth/manage-user-session';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { RawRecipe } from '@/lib/recipes/models';
import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function UserRecipeEdit({ params }: PageProps) {
  const refresh = await getRefreshToken();
  const access = await getAccessToken();
  const resolvedParams = await params;
  const recipeUrl = new URL(`/api/recipes/user-recipes/${resolvedParams.slug}`, PUBLIC_SITE_URL);
  const categoriesUrl = new URL('/api/categories', PUBLIC_SITE_URL);

  const recipeResponse = await fetch(recipeUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refreshToken=${refresh}; accessToken=${access}`,
    },
    next: {
      revalidate: 600,
      tags: ['recipe-updated'],
    },
  });

  if (recipeResponse.status === 401) {
    redirect('/login?next=%2Fprofile');
  }

  if (!recipeResponse.ok) {
    console.log('FROM: UserRecipeEdit Page', recipeResponse);
    return <FetchError />;
  }
  const RecipeData: RawRecipe = await recipeResponse.json();

  const categoriesResponse = await fetch(categoriesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refreshToken=${refresh}; accessToken=${access}`,
    },
    next: {
      revalidate: 600,
      tags: ['categories-updated'],
    },
  });
  const categoriesData = categoriesResponse.ok ? await categoriesResponse.json() : [];

  return (
    <div className='private-page-wrapper'>
      <EditRecipeForm initialData={RecipeData} categoriesData={categoriesData} />
    </div>
  );
}
