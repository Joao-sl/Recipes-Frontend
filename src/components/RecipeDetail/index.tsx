'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {
  CircleCheckBigIcon,
  Clock4Icon,
  HeartIcon,
  LucideLightbulb,
  Share2Icon,
  ShoppingBasketIcon,
  Users2Icon,
} from 'lucide-react';
import { SITE_NAME } from '@/lib/config';
import { Difficulty, RawRecipe } from '@/lib/recipes/models';
import { convertToReadableTime, formatServings } from '@/utils/recipe-helpers';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type RecipeDetailProps = {
  recipe: RawRecipe;
};

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const pathname = usePathname();
  const [ingIsChecked, setIngIsChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(recipe.ingredients.map((_, i) => [i, false])),
  );
  const [stepIsChecked, setStepIsChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(recipe.preparation_steps.map((_, i) => [i, false])),
  );

  const difficultyMap: Record<Difficulty, string> = {
    Fácil: 'easy',
    Médio: 'medium',
    Difícil: 'hard',
  };

  return (
    <main className='max-w-[1400px] w-full mx-auto px-4 py-8 space-y-8 text-foreground'>
      <div className='space-x-2 text-sm'>
        <Link className='text-muted-foreground' href={'/'}>
          Home
        </Link>
        <span>›</span>
        {pathname.split('/').map((v, i) => (v ? <span key={i}>{v}</span> : null))}
      </div>

      <div
        className={clsx(
          'relative rounded-2xl overflow-hidden',
          'bg-gradient-to-br from-recipe-warm/30 to-transparent',
        )}
      >
        <div className={clsx('grid gap-8 p-8', 'md:grid-cols-2 md:grid-rows-1')}>
          <div className='flex flex-col justify-center space-y-6'>
            <div className='space-y-4'>
              <div className='flex flex-wrap items-center gap-2'>
                {recipe.categories.map((v, i) => (
                  <Link
                    className={clsx(
                      'text-xs font-bold bg-primary/50 border border-transparent',
                      'text-white px-2 py-0.5 shadow rounded-full',
                      'hover:bg-primary hover:text-inverse',
                    )}
                    href={`/search/${v.slug}`}
                    key={i}
                  >
                    {v.category_name}
                  </Link>
                ))}

                <span className={clsx(difficultyMap[recipe.difficulty as Difficulty])}>
                  {recipe.difficulty}
                </span>
              </div>

              <h1 className='text-4xl sm:text-5xl font-bold'>{recipe.title}</h1>
              <p className='sm:text-lg text-muted-foreground leading-relaxed'>
                {recipe.description}
              </p>
            </div>

            <div className='flex flex-wrap gap-6 text-sm text-muted-foreground [&_svg]:w-4 [&_svg]:h-4'>
              <div className='flex items-center gap-2'>
                <Clock4Icon />
                <span>{convertToReadableTime(recipe.preparation_time)}</span>
              </div>

              <div className='flex items-center gap-2'>
                <Users2Icon />
                <span>{formatServings(recipe.servings)}</span>
              </div>

              {/* TODO: Reviews */}
              <div>
                <span className='text-primary'>★★★★★ </span>
                <span>(5/5)</span>
              </div>
            </div>

            <div className='flex flex-wrap items-center justify-between [&_svg]:w-4 [&_svg]:h-4'>
              <div className='flex items-center gap-3'>
                <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                  <Image
                    src={recipe.author.profile?.avatar || '/images/user-placeholder.png'}
                    alt={`Foto de perfil de ${recipe.author.username}`}
                    fill
                    sizes='40px'
                  ></Image>
                </div>

                <div>
                  <h3 className='font-semibold'>
                    Por&nbsp;
                    {recipe.author.profile
                      ? `${recipe.author.profile?.first_name}
                         ${recipe.author.profile?.last_name || ''}`
                      : recipe.author.username}
                  </h3>
                  <p className='text-sm text-muted-foreground'>Usuário do {SITE_NAME}</p>
                </div>
              </div>

              <div className='flex gap-2'>
                {/* TODO: Button to Like and button to share */}
                <button
                  className={clsx(
                    'flex justify-center items-center w-10 h-10 cursor-pointer',
                    'transition duration-400 hover:text-red-500',
                  )}
                  aria-label='Favoritar conteúdo'
                  aria-disabled={true}
                >
                  <HeartIcon />
                </button>

                <button
                  className={clsx(
                    'flex justify-center items-center w-10 h-10 cursor-pointer',
                    'transition hover:text-blue-600',
                  )}
                  aria-label='Compartilhar conteúdo'
                  aria-disabled={true}
                >
                  <Share2Icon />
                </button>
              </div>
            </div>
          </div>

          <div className='overflow-hidden rounded-xl shadow-sm'>
            <div className='relative h-full w-full aspect-[4/3]'>
              <Image
                className='object-cover transition-transform duration-500 hover:scale-105'
                src={recipe.cover || '/images/placeholder-large.jpg'}
                alt={`Capa da receita ${recipe.title}`}
                fill
                sizes='(min-width: 768px) 50vw, 100vw'
                priority
              ></Image>
            </div>
          </div>
        </div>
      </div>

      <div className={'flex flex-col md:grid md:grid-cols-3 gap-8'}>
        <div className=''>
          <div className='p-6 rounded-lg border border-primary/15'>
            <div className='flex flex-wrap items-center gap-2 mb-6'>
              <span
                className={clsx(
                  'flex items-center text-inverse justify-center w-8 h-8 rounded-lg',
                  'bg-gradient-to-br from-primary to-primary/60',
                )}
              >
                <ShoppingBasketIcon size={18} />
              </span>
              <h3 className='text-xl font-semibold'>Ingredientes</h3>
              <span className='text-sm text-muted-foreground'>
                ({recipe.ingredients.length} Items)
              </span>
            </div>

            <div className='space-y-3'>
              {recipe.ingredients.map((v, i) => (
                <div
                  key={i}
                  className={clsx(
                    'flex items-center gap-3 p-3 rounded-lg cursor-pointer',
                    'transition-all duration-200 hover:bg-recipe-warm',
                    ingIsChecked[i] ? 'bg-recipe-warm line-through text-muted-foreground/50' : '',
                  )}
                  onClick={() => setIngIsChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                >
                  <div
                    className={clsx(
                      '[&_svg]:w-5 [&_svg]:h-5',
                      ingIsChecked[i] ? 'text-primary/50' : 'text-muted-foreground',
                    )}
                  >
                    <CircleCheckBigIcon />
                  </div>
                  <span className='font-medium'>
                    {v.quantity}
                    <span className='font-normal'> de {v.name}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className='mt-6 p-4 rounded-lg border border-primary/10 bg-recipe-warm'>
              <p className='text-sm'>
                <span className='font-semibold'>💡Dica: </span>Clique nos ingredientes para
                marcá-los conforme for usando!
              </p>
            </div>
          </div>
        </div>

        <div className='sm:col-span-2 space-y-8'>
          <div
            className={clsx(
              'p-6 border border-primary/15 rounded-lg',
              'bg-gradient-to-br from-white to-recipe-warm',
            )}
          >
            <div className='flex flex-wrap items-center gap-2 mb-6'>
              <span
                className={clsx(
                  'flex items-center text-inverse justify-center w-8 h-8 rounded-lg',
                  'bg-gradient-to-br from-primary to-primary/60',
                )}
              >
                👨‍🍳
              </span>
              <h3 className='text-xl font-semibold'>Modo de Preparo</h3>
              <span className='text-sm text-muted-foreground'>
                ({recipe.preparation_steps.length} Passos)
              </span>
            </div>

            <div className='space-y-4'>
              {recipe.preparation_steps.map((v, i, arr) => (
                <div
                  key={i}
                  className={clsx(
                    'relative flex gap-4 p-4 rounded-lg cursor-pointer',
                    'transition-all duration-200 hover:bg-recipe-warm',
                    stepIsChecked[i] ? 'bg-recipe-warm' : '',
                  )}
                  onClick={() => setStepIsChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                >
                  <div
                    className={clsx(
                      'flex items-center justify-center text-sm min-w-6 h-6 font-semibold',
                      'rounded-full',
                      'sm:min-w-8 sm:h-8',
                      stepIsChecked[i] ? 'bg-primary/50' : 'bg-gray-200/60',
                    )}
                  >
                    <span
                      className={clsx(
                        stepIsChecked[i] ? 'text-white' : '',
                        'transition-all duration-200',
                      )}
                    >
                      {stepIsChecked[i] ? '✓' : i + 1}
                    </span>
                  </div>

                  {arr.length !== i + 1 && (
                    <div
                      className={clsx(
                        'absolute left-[27px] top-[40px] w-0.5 h-3',
                        '',
                        'sm:h-4 sm:left-[31px] sm:top-[48px]',
                        stepIsChecked[i] ? 'bg-primary/50' : 'bg-gray-200/60',
                      )}
                    ></div>
                  )}

                  <div
                    className={clsx(
                      'transition-all duration-200',
                      stepIsChecked[i]
                        ? 'bg-recipe-warm line-through text-muted-foreground/50'
                        : '',
                    )}
                  >
                    {v.step}
                  </div>
                </div>
              ))}
            </div>

            {recipe.tips && (
              <div className='mt-6 p-4 rounded-lg border border-primary/10 bg-recipe-warm'>
                <p className='text-sm'>
                  <span className='font-semibold'>🧩 Sugestão: </span>Leia as dicas antes de
                  começar, elas podem te ajudar a fazer uma {recipe.title} ainda melhor.
                </p>
              </div>
            )}
          </div>

          {recipe.tips && (
            <div
              className={clsx(
                'p-6 border border-primary/15 rounded-lg',
                'bg-gradient-to-br from-white to-recipe-warm',
              )}
            >
              <div className='flex items-center gap-2 mb-6'>
                <span
                  className={clsx(
                    'flex items-center text-inverse justify-center w-8 h-8 rounded-lg',
                    'bg-gradient-to-br from-primary to-primary/60',
                  )}
                >
                  <LucideLightbulb size={18} />
                </span>
                <h3 className='text-xl font-semibold'>Dicas</h3>
              </div>
              <p className='px-4'>{recipe.tips}</p>

              <div className='mt-6 p-4 rounded-lg border border-primary/10 bg-primary/5'>
                <span className='text-sm'>
                  <span className='font-semibold'>🌟 Avalie esta receita: </span>Sua opinião nos
                  ajuda a melhorar nossas receitas!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
