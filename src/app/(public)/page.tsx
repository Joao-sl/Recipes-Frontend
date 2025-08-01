import { HomePageContent } from '@/components/HomePage';
import { API_DOMAIN, PUBLIC_SITE_URL } from '@/lib/config';
import { mapToDetailedCardData } from '@/lib/recipes/mappers';
import { DetailedRecipeCardData, RawRecipe, SiteStats } from '@/lib/recipes/models';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Home`,
  description:
    'Descubra novas receitas para todas as ocasiões. Inspire-se com dicas culinárias, compartilhe as suas receitas e dicas com o grupo.',
};

export default async function HomePage() {
  const statsUrl = new URL('/api/stats/', API_DOMAIN);
  const recipesUrl = new URL('/api/recipes/public-recipes/?page_size=5', PUBLIC_SITE_URL);

  const stats: SiteStats = await fetch(statsUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 86400 },
  })
    .then(resp =>
      !resp.ok
        ? {
            recipes_count: 1000,
            category_count: 200,
            user_count: 300,
          }
        : resp.json(),
    )
    .catch(() => ({
      recipes_count: 1000,
      category_count: 200,
      user_count: 300,
    }));

  const rawData = await fetch(recipesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  })
    .then(resp => (!resp.ok ? null : resp.json()))
    .catch(() => null);

  const recipesRawData = rawData as {
    count: number;
    next: string | null;
    previous: string | null;
    results: RawRecipe[];
  } | null;

  const recipesData: DetailedRecipeCardData[] | null = recipesRawData
    ? recipesRawData.results.map(e => mapToDetailedCardData(e))
    : null;

  return <HomePageContent stats={stats} recipes={recipesData} />;
}
