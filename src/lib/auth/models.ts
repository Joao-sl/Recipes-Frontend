export interface User {
  username: string;
  email: string;
  profile: {
    avatar: string;
    first_name: string;
    last_name: string;
    description: string;
    birth_date: string;
    favorite_recipe: string;
  } | null;
}
