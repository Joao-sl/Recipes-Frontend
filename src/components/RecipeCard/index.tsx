'use client';

import { UserRecipeCardData } from '@/lib/recipes/models';
import { brazilianDateFormat } from '@/utils/format-date';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function RecipeCard({
  recipeData,
  redirectBase,
}: {
  recipeData: UserRecipeCardData;
  redirectBase: 'root' | 'relative';
}) {
  const pathName = usePathname();
  const relative = `${pathName}/${recipeData.slug}`;

  return (
    <Link href={redirectBase == 'root' ? `${recipeData.slug}` : relative}>
      <div className='flex flex-col bg-divider border-standard rounded-lg shadow-sm overflow-hidden'>
        <div className='relative aspect-square'>
          <Image
            src={recipeData.cover ?? '/images/placeholder-large.jpg'}
            alt={`Imagem sobre ${recipeData.title}`}
            fill
            priority={false}
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            className='object-cover'
          />
          <div className='flex justify-end gap-1 relative top-2 right-2'>
            <p
              className={clsx(
                'text-xs font-medium  px-2 py-1 rounded-full',
                recipeData.admin_approved
                  ? 'bg-green-600 text-inverse'
                  : 'bg-white text-base-color',
              )}
            >
              {recipeData.admin_approved ? 'Aprovada' : 'Em análise'}
            </p>
            <p
              className={clsx(
                'text-xs font-medium px-2 py-1 rounded-full ',
                recipeData.public ? 'bg-primary text-inverse' : 'bg-white text-base-color',
              )}
            >
              {recipeData.public ? 'Publicada' : 'Não publicada'}
            </p>
          </div>
        </div>

        <div className='space-y-4 p-4 text-sm text-muted'>
          <h1 className='font-semibold text-lg mb-2 line-clamp-1 text-base-color'>
            {recipeData.title}
          </h1>
          <p className='line-clamp-2 h-10'>{recipeData.description}</p>

          <div className='line-clamp-1'>
            <p>Criada em: {brazilianDateFormat(recipeData.created_at)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
