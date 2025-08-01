import { FetchError } from '@/components/FetchError';
import { Pagination } from '@/components/Pagination';
import { SimpleRecipeCard } from '@/components/SimpleRecipeCard';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { mapToSimpleCardData } from '@/lib/recipes/mappers';
import { RawRecipe, SimpleRecipeCardData } from '@/lib/recipes/models';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receitas',
  description: 'Lista de todas as receitas dos site',
};

type RecipesPageProps = {
  searchParams: { page?: string } | Promise<{ page?: string }>;
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const pageSize = 16;
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const recipesUrl = new URL(
    `/api/recipes/public-recipes/?page=${page}&page_size=${pageSize}`,
    PUBLIC_SITE_URL,
  );

  const response = await fetch(recipesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  })
    .then(resp => (!resp.ok ? null : resp.json()))
    .catch(() => null);

  if (response === null) return <FetchError />;

  const rawData = response as {
    count: number;
    next: string | null;
    previous: string | null;
    results: RawRecipe[];
  };

  const recipes: SimpleRecipeCardData[] = rawData.results.map(element =>
    mapToSimpleCardData(element),
  );

  return (
    <div className='max-content-size mx-auto mt-8'>
      <div className='mb-8'>
        <h1 className='text-center text-4xl font-bold mb-3'>
          Novas&nbsp;
          <span className='text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/50'>
            Receitas
          </span>
        </h1>
        <p className='text-center text-xl text-muted-foreground'>
          Últimas receitas postadas para você.
        </p>
      </div>

      {rawData.count > 0 && (
        <p className='mb-4 text-muted-foreground'>
          Exibindo {page}-{Math.ceil(rawData.count / pageSize)} de&nbsp;
          {Math.ceil(rawData.count / pageSize)} páginas
        </p>
      )}

      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {recipes.map((v, i) => (
          <div key={i}>
            <SimpleRecipeCard recipe={v} />
          </div>
        ))}
      </div>

      {rawData.next != null || rawData.previous != null ? (
        <div className='flex justify-center mt-6'>
          <Pagination
            current={page}
            count={rawData.count}
            pageSize={pageSize}
            next={rawData.next}
            previous={rawData.previous}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
