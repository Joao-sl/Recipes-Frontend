'use client';

import clsx from 'clsx';
import { DetailedRecipeCardData, SiteStats } from '@/lib/recipes/models';
import { formatStats } from '@/utils/format-stats';
import { ArrowRightIcon, CookingPotIcon, SearchIcon, TrendingUpIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DetailedRecipeCard } from '../DetailedRecipeCard';
import { SITE_NAME } from '@/lib/config';

type HomePageContentProps = {
  stats: SiteStats;
  recipes: DetailedRecipeCardData[] | null;
};

export function HomePageContent({ stats, recipes }: HomePageContentProps) {
  const categoriesMap = [
    {
      href: 'cafe da manha',
      icon: '☀️',
      name: 'Café da manhã',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-secondary to-secondary/50',
    },
    {
      href: 'almoço',
      icon: '🍽️',
      name: 'Almoço',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-green-500 to-blue-500',
    },
    {
      href: 'jantar',
      icon: '🌙',
      name: 'Jantar',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    },
    {
      href: 'sobremesa',
      icon: '🍰',
      name: 'Sobremesa',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-pink-400 to-red-500',
    },
    {
      href: 'lanche',
      icon: '🥪',
      name: 'Lanche',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-primary to-primary/30',
    },
    {
      href: 'saladas',
      icon: '🥗',
      name: 'Saladas',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-green-400 to-green-600',
    },
    {
      href: 'carnes',
      icon: '🥩',
      name: 'Carnes',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-red-400 to-red-700',
    },
    {
      href: 'massas',
      icon: '🍜',
      name: 'Massas',
      subTitle: 'Test',
      iconBgColor: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
    },
  ];

  return (
    <div className='text-foreground'>
      <section
        className={clsx(
          'py-16 sm:py-20 overflow-hidden',
          'bg-gradient-to-t from-slate-100 to-white',
        )}
      >
        <div className='max-content-size mx-auto'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='flex flex-col justify-center space-y-5 sm:space-y-7'>
              <div
                className={clsx(
                  'flex items-center gap-2',
                  'text-sm text-orange-800 font-medium',
                  'px-4 py-2 rounded-full max-w-fit bg-primary/10',
                )}
              >
                <TrendingUpIcon size={16} />
                Novas receitas toda semana
              </div>

              <div>
                <h1
                  className={clsx(
                    'flex justify-center flex-wrap space-x-2 text-4xl font-bold mb-4',
                    'sm:justify-start lg:space-x-4 lg:text-6xl',
                  )}
                >
                  <span>Descubra</span>
                  <span
                    className={clsx(
                      'bg-clip-text text-transparent',
                      'bg-gradient-to-br from-primary to-primary/50',
                    )}
                  >
                    Receitas
                  </span>
                  <span>Incríveis</span>
                </h1>

                <p className='text-center sm:text-left text-xl text-muted-foreground'>
                  Explore centenas de receitas deliciosas criadas por chefs profissionais e amadores
                  apaixonados pela culinária.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row items-center gap-6'>
                <Link
                  href='#features-recipes'
                  className={clsx(
                    'flex items-center justify-center gap-2 rounded-lg',
                    'text-inverse shadow font-medium',
                    'bg-gradient-to-br from-primary to-primary/50',
                    'border-2 border-transparent bg-origin-border',
                    'cursor-pointer transition hover:scale-105 hover:shadow-lg',
                    'w-full h-9 sm:w-55',
                  )}
                >
                  <SearchIcon size={16} /> Explorar Receitas
                </Link>

                <Link
                  href='#categories'
                  className={clsx(
                    'flex items-center justify-center gap-2 rounded-lg',
                    'text-primary font-medium shadow border-2 border-primary/80',
                    'cursor-pointer transition hover:scale-105 hover:shadow-lg',
                    'w-full sm:w-55 h-9',
                  )}
                >
                  <CookingPotIcon size={16} />
                  Categorias
                </Link>
              </div>

              <div className='grid grid-cols-3 gap-8'>
                <div>
                  <p className='font-bold text-2xl sm:text-3xl text-primary'>
                    {formatStats(stats.recipes_count)}+
                  </p>
                  <p className='font-medium'>Receitas</p>
                </div>

                <div>
                  <p className='font-bold text-2xl sm:text-3xl text-primary'>
                    {formatStats(stats.category_count)}+
                  </p>
                  <p className='font-medium'>Categorias</p>
                </div>

                <div>
                  <p className='font-bold text-2xl sm:text-3xl text-primary'>
                    {formatStats(stats.user_count)}+
                  </p>
                  <p className='font-medium '>Usuários</p>
                </div>
              </div>
            </div>

            <div className='hidden md:block relative w-full h-[500px] shadow rounded-xl'>
              <Image
                src={'/images/home-header-banner.png'}
                alt=''
                className='object-cover rounded-xl'
                priority
                fill
                sizes='(min-width: 768px) 50vw'
              ></Image>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white' id='categories'>
        <div className='max-content-size mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='font-bold text-4xl mb-4'>
              <span>Explore por </span>
              <span
                className={clsx(
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-br from-primary to-primary/50',
                )}
              >
                Categorias
              </span>
            </h2>
            <p className={clsx('text-muted-foreground max-w-2xl text-xl mx-auto')}>
              Descubra receitas organizadas por categoria e encontre exatamente o que você está
              procurando.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
            {categoriesMap.map((v, i) => (
              <Link
                key={i}
                className={clsx(
                  'p-6 border-2 rounded-xl border-muted-foreground/15 shadow',
                  'group transition-all duration-300 hover:scale-105',
                  'hover:border-primary/50 hover:shadow-lg',
                )}
                href={`search/?q=${v.href}`}
              >
                <div className='flex flex-col items-center justify-center'>
                  <span
                    className={clsx(
                      'flex justify-center items-center mb-4 w-16 h-16 text-2xl',
                      'rounded-full transition-all duration-300 group-hover:scale-105',
                      v.iconBgColor,
                    )}
                  >
                    {v.icon}
                  </span>
                  <p
                    className={clsx(
                      'font-medium mb-1',
                      'transition-all duration-300 group-hover:text-primary',
                    )}
                  >
                    {v.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>{v.subTitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className='py-16 bg-gradient-to-b from-slate-50 to-orange-50/25'
        id='features-recipes'
      >
        <div className='max-content-size mx-auto'>
          <div className='text-left mb-12'>
            <h2 className='text-center font-bold text-4xl mb-4'>
              <span
                className={clsx(
                  'bg-clip-text text-transparent',
                  'bg-gradient-to-br from-primary to-primary/50',
                )}
              >
                Receitas
              </span>
              <span> Quentinhas</span>
            </h2>
            <p className='text-center mx-auto text-muted-foreground max-w-2xl text-xl'>
              Explore nossas últimas receitas.
            </p>
          </div>

          <div
            className={clsx(
              'grid grid-cols-1 grid-rows-2 gap-8 mb-10',
              'sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {recipes?.map((e, i) => (
              <div key={i} className={clsx(i === 0 ? 'sm:col-span-2' : '')}>
                <DetailedRecipeCard recipe={e} isFeaturedCard={i === 0} />
              </div>
            ))}
          </div>

          <div className='flex justify-center'>
            <Link
              href='/recipes'
              className={clsx(
                'flex items-center justify-center gap-2 rounded-lg',
                'w-60 h-9 text-inverse shadow font-medium',
                'bg-gradient-to-br from-primary to-primary/50',
                'border-2 border-transparent bg-origin-border',
                'cursor-pointer transition hover:scale-105 hover:shadow-lg',
              )}
            >
              Mais Receitas <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='max-content-size mx-auto'>
          <div className='mb-12'>
            <h1 className='text-4xl font-bold text-center mb-3'>
              Sobre o&nbsp;
              <span className='bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/50'>
                {SITE_NAME}
              </span>
            </h1>

            <p className='text-center text-xl text-muted-foreground'>
              Um pouco sobre nós e nossos objetivos
            </p>
          </div>

          <div className='grid sm:grid-cols-3 gap-8'>
            <div>
              <div className='relative mb-4 w-full h-50'>
                <Image
                  className='object-cover rounded-xl'
                  src={'/images/home-about-1.png'}
                  alt='Pratos de comida ilustrativos em cima de uma mesa'
                  fill
                  sizes='100%'
                ></Image>
              </div>

              <div>
                <h2 className='text-2xl font-semibold mb-1'>Receitas para você</h2>
                <p>Receitas diárias simples e elaboradas para todas as ocasiões.</p>
              </div>
            </div>

            <div>
              <div className='relative mb-4 w-full h-50'>
                <Image
                  className='object-cover rounded-xl'
                  src={'/images/home-about-2.png'}
                  alt='Ingredientes ilustrativos em cima de uma tábua de cortar'
                  fill
                  sizes='100%'
                ></Image>
              </div>

              <div>
                <h2 className='text-2xl font-semibold mb-1'>Fácil de Fazer</h2>
                <p>
                  Passo a passo simplificado com dicas úteis para você sempre acertar nas receitas.
                </p>
              </div>
            </div>

            <div>
              <div className='relative mb-4 w-full h-50'>
                <Image
                  className='object-cover rounded-xl'
                  src={'/images/home-about-3.png'}
                  alt='Dois cozinheiros gerados por inteligência artificial cozinhando'
                  fill
                  sizes='(min-width: 768px) 33vw, 100vw'
                ></Image>
              </div>

              <div>
                <h2 className='text-2xl font-semibold mb-1'>Previamente Testado</h2>
                <p>Todas as nossa receitas são previamente testadas por nosso chefs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
