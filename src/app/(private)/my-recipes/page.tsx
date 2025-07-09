import { Pagination } from '@/components/Pagination';
import { RecipeCard } from '@/components/RecipeCard';
import { getRefreshToken, getAccessToken } from '@/lib/auth/manage-user-session';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { mapToCardData } from '@/lib/recipes/mappers';
import { RawRecipe, UserRecipeCardData } from '@/lib/recipes/models';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Minhas receitas',
};

type MyRecipesPageProps = {
  searchParams: { page?: string } | Promise<{ page?: string }>;
};

export default async function MyRecipesPage({ searchParams }: MyRecipesPageProps) {
  const refresh = await getRefreshToken();
  const access = await getAccessToken();
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const pageSize = 10;
  const url = new URL(`/api/recipe/?page=${page}&page_size=${pageSize}`, PUBLIC_SITE_URL);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `refreshToken=${refresh}; accessToken=${access}`,
    },
    next: {
      revalidate: 600,
      tags: ['recipes-updated'],
    },
  });

  if (response.status === 401) {
    redirect('/login?next=%2Fprofile');
  }

  if (!response.ok) {
    console.log(response);
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <p className='border-r-1 border-r-slate-600  mr-4 px-6 text-2xl/[49px] font-bold'>
          {response.status}
        </p>
        <p className='text-sm font-normal/[49px] m-0 max-w-97'>
          Desculpe não conseguimos carregar suas receitas por um erro interno, por favor tente
          novamente mais tarde
        </p>
      </div>
    );
  }
  const data = await response.json();

  const recipesRawData = data as {
    count: number;
    next: string | null;
    previous: string | null;
    results: RawRecipe[];
  };
  const recipes: UserRecipeCardData[] = recipesRawData.results.map(element =>
    mapToCardData(element),
  );
  return (
    <div className='space-y-5 mb-8'>
      <div className='flex flex-col px-6 mt-4 sm:items-center sm:justify-between sm:flex-row'>
        <div>
          <h1 className='text-3xl font-bold text-gray-700 mb-1 sm:text-left'>Minhas Receitas</h1>
          <p className='text-stone-500 sm:text-left'>Gerencie suas receitas cadastradas</p>
        </div>

        <div>
          <p className='text-sm text-stone-500'>{recipesRawData.count} receitas</p>
        </div>
      </div>

      <hr className='text-gray-200' />

      {recipesRawData.count == 0 ? (
        <p className='pl-6 text-slate-600'>Você ainda não enviou nenhuma receita.</p>
      ) : (
        <div>
          <p className='text-stone-500 text-xs mb-2 sm:pl-6 text-center sm:text-left'>
            Você só poderá editar receitas que ainda não foram aprovadas.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-6'>
            {recipes.map((element, index) => (
              <div key={index} className='transition hover:scale-[102%_102%_102%]'>
                <RecipeCard recipeData={element} redirectBase='relative' />
              </div>
            ))}
          </div>
        </div>
      )}

      {recipesRawData.next != null || recipesRawData.previous != null ? (
        <div className='flex justify-center mt-20'>
          <Pagination
            props={{
              current: page,
              count: recipesRawData.count,
              pageSize: pageSize,
              next: recipesRawData.next,
              previous: recipesRawData.previous,
            }}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
