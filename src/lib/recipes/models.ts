export interface RawRecipe {
  title: string;
  description: string;
  preparation_time: string;
  ingredients: { name: string; quantity: string }[] | [];
  preparation_steps: { step: string }[] | [];
  servings: string;
  categories: { id: number; category_name: string; slug: string }[] | [];
  slug: string;
  author: {
    username: string;
    profile?: { first_name: string | null; last_name: string | null } | null;
  };
  tips: string;
  public: boolean;
  admin_approved: boolean;
  approved_by: {
    username: string;
    profile?: { first_name: string | null; last_name: string | null } | null;
  };
  created_at: string;
  updated_at: string;
  cover: string | null;
}

export interface Category {
  id: number;
  category_name: string;
  slug: string;
}

export type UserRecipeCardData = Pick<
  RawRecipe,
  'title' | 'description' | 'created_at' | 'slug' | 'cover' | 'public' | 'admin_approved'
>;
