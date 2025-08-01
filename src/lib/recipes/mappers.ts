import {
  DetailedRecipeCardData,
  SimpleRecipeCardData,
  RawRecipe,
  UserRecipeCardData,
} from './models';

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

export function mapToDetailedCardData(rawData: RawRecipe): DetailedRecipeCardData {
  const {
    title,
    description,
    difficulty,
    created_at,
    slug,
    cover,
    categories,
    preparation_time,
    servings,
    author,
  } = rawData;

  return {
    title,
    description,
    difficulty,
    created_at,
    slug,
    cover,
    categories,
    preparation_time,
    servings,
    author,
  };
}

export function mapToSimpleCardData(rawData: RawRecipe): SimpleRecipeCardData {
  const { title, description, difficulty, slug, cover, preparation_time } = rawData;

  return {
    title,
    description,
    difficulty,
    slug,
    cover,
    preparation_time,
  };
}
