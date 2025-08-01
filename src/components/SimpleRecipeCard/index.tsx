import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Difficulty, SimpleRecipeCardData } from '@/lib/recipes/models';
import { convertToReadableTime } from '@/utils/recipe-helpers';
import { Clock3Icon } from 'lucide-react';

type SimpleRecipeCardProps = {
  recipe: SimpleRecipeCardData;
};

export function SimpleRecipeCard({ recipe }: SimpleRecipeCardProps) {
  const difficultyMap: Record<Difficulty, string> = {
    Fácil: 'easy',
    Médio: 'medium',
    Difícil: 'hard',
  };

  return (
    <Link href={`recipes/${recipe.slug}`} className='text-foreground overflow-hidden group'>
      <div className='rounded-xl overflow-hidden'>
        <div className='relative w-full h-40 shadow overflow-hidden'>
          <Image
            className='object-cover transition-all duration-300 group-hover:scale-120'
            src={recipe.cover || '/images/placeholder-large.jpg'}
            alt={recipe.title}
            fill
            sizes='(min-width: 640px) 50vw, (min-width: 768) 25vh, 100vh'
            priority
          ></Image>

          <div
            className={clsx(
              'absolute left-2 top-2',
              difficultyMap[recipe.difficulty as Difficulty],
            )}
          >
            {recipe.difficulty}
          </div>

          <div
            className={clsx(
              'flex items-center gap-1 px-2 py-1',
              'text-white font-bold rounded-full text-xs',
              'absolute bottom-2 right-2 bg-black/50 backdrop-blur-3xl',
            )}
          >
            <div className='flex items-center gap-1'>
              <Clock3Icon size={15} />
              <span>{convertToReadableTime(recipe.preparation_time, true)}</span>
            </div>
          </div>
        </div>

        <div className='pt-3'>
          <div className='mb-4'>
            <h1
              className={clsx(
                'text-lg font-bold mb-2 line-clamp-2 transition-all',
                'leading-tight group-hover:text-primary',
              )}
            >
              {recipe.title}
            </h1>
            <p className='text-sm line-clamp-2'>{recipe.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
