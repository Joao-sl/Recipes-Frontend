import { FetchError } from '@/components/FetchError';
import { PUBLIC_SITE_URL } from '@/lib/config';
import { RawRecipe } from '@/lib/recipes/models';
import { RecipeDetail } from '@/components/RecipeDetail';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const url = new URL(`/api/recipes/public-recipes/${resolvedParams.slug}`, PUBLIC_SITE_URL);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 600,
      tags: ['public-recipe-updated'],
    },
  });

  if (response.status === 404) {
    return (
      <FetchError statusCode={404} message='Desculpe não conseguimos encontrar essa receita.' />
    );
  }

  if (!response.ok) {
    console.log('FROM: RecipeDetailPage', response);
    return <FetchError />;
  }
  const recipeData: RawRecipe = await response.json();

  return (
    <div className=''>
      <RecipeDetail recipe={recipeData} />
    </div>
  );
}
