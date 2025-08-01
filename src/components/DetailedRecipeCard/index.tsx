import clsx from 'clsx';
import { Difficulty, DetailedRecipeCardData } from '@/lib/recipes/models';
import { convertToReadableTime, formatServings } from '@/utils/recipe-helpers';
import { Clock4Icon, UsersRoundIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type HomeRecipeCardProps = {
  recipe: DetailedRecipeCardData;
  isFeaturedCard?: boolean;
};

export function DetailedRecipeCard({ recipe, isFeaturedCard = false }: HomeRecipeCardProps) {
  const difficultyMap: Record<Difficulty, string> = {
    Fácil: 'easy',
    Médio: 'medium',
    Difícil: 'hard',
  };

  return (
    <Link
      className={clsx(
        'flex flex-col bg-white w-full h-full rounded-xl shadow relative',
        'group hover:shadow-xl overflow-hidden',
        'transition-all duration-300 hover:scale-105',
      )}
      href={`recipes/${recipe.slug}`}
    >
      <div className={clsx('relative', isFeaturedCard ? 'h-full' : 'h-48')}>
        <Image
          className={clsx(
            'object-cover group-hover:scale-105',
            'transition-all duration-500 shadow-xl',
          )}
          src={recipe.cover || '/images/placeholder-large.jpg'}
          alt={recipe.title}
          fill
          sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
        />

        <div className={clsx('absolute', isFeaturedCard ? 'p-6' : 'top-3 left-3')}>
          <p className={clsx('', difficultyMap[recipe.difficulty as Difficulty])}>
            {recipe.difficulty}
          </p>
        </div>

        {/* TODO: Reviews */}
        <div
          className={clsx(
            'absolute z-1',
            isFeaturedCard ? 'bottom-0 right-0 p-6' : 'bottom-3 right-3',
          )}
        >
          <div className='flex items-center gap-1 px-3 rounded-full bg-white/90 shadow'>
            <span className='text-xl text-primary'>★</span>
            <span className='text-sm font-medium'>4.8</span>
          </div>
        </div>
      </div>

      {isFeaturedCard && (
        <div
          className={clsx(
            'absolute bottom-0 h-2/3 w-full',
            'bg-gradient-to-t from-black/80 to-transparent',
          )}
        ></div>
      )}

      <div
        className={clsx(
          'p-6 overflow-hidden',
          isFeaturedCard ? 'absolute bottom-0 text-white' : ' sticky',
        )}
      >
        <div className='flex gap-2 text-xs text-white font-semibold mb-2 h-5'>
          {recipe.categories.length > 0 ? (
            recipe.categories.map((e, i) =>
              i < 4 ? (
                <div
                  className={clsx('bg-gray-100 text-foreground rounded-lg px-2.5 py-0.5')}
                  key={i}
                >
                  {e.category_name}
                </div>
              ) : null,
            )
          ) : (
            <div className={clsx('bg-gray-100 text-foreground rounded-lg px-2.5 py-0.5')}>
              Ainda não categorizado
            </div>
          )}
        </div>

        <h3
          className={clsx(
            'line-clamp-1 mb-2',
            isFeaturedCard ? 'text-5xl font-bold py-1' : 'text-xl font-semibold ',
          )}
        >
          {recipe.title}
        </h3>
        <p
          className={clsx(
            'line-clamp-2 mb-4',
            isFeaturedCard ? 'text-white text-xl font-medium' : 'text-muted-foreground h-12',
          )}
        >
          {recipe.description}
        </p>

        <div
          className={clsx(
            'flex items-center gap-4 mb-4 text-sm',
            isFeaturedCard ? 'text-white' : 'text-muted-foreground',
          )}
        >
          <div className='flex items-center gap-1'>
            <Clock4Icon size={16} />
            <span>{convertToReadableTime(recipe.preparation_time)}</span>
          </div>

          <div className='flex items-center gap-1'>
            <UsersRoundIcon size={16} />
            <span>{formatServings(recipe.servings)}</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='relative w-8 h-8 rounded-full overflow-hidden'>
              <Image
                className='object-cover'
                src={recipe.author.profile?.avatar || '/images/user-placeholder.png'}
                alt='Avatar do autor da receita'
                fill
                sizes='32px'
                priority={false}
                quality={100}
              ></Image>
            </div>
            <p className='text-sm font-medium'>
              Por&nbsp;
              {recipe.author.profile
                ? `${recipe.author.profile?.first_name}
                 ${recipe.author.profile?.last_name || ''}`
                : recipe.author.username}
            </p>
          </div>

          <div
            className={clsx(
              'flex items-center justify-center gap-2 text-sm',
              'rounded-lg w-22 h-8 text-inverse shadow font-medium',
              'bg-gradient-to-br from-primary to-primary/50',
              'cursor-pointer transition hover:scale-105 hover:shadow-lg',
              isFeaturedCard ? 'hidden' : '',
            )}
          >
            Ver receita
          </div>
        </div>
      </div>
    </Link>
  );
}
