import { RawRecipe, UserRecipeCardData } from './models';

export function mapToCardData(rawData: RawRecipe): UserRecipeCardData {
  const { title, description, created_at, slug, cover, public: isPublic, admin_approved } = rawData;

  return {
    title,
    description,
    created_at,
    slug,
    cover,
    public: isPublic,
    admin_approved,
  };
}
