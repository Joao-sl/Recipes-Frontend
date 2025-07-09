'use client';

import { UserRecipeCardData } from '@/lib/recipes/models';
import { brazilianDateFormat } from '@/utils/formatDate';
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
      <div className='flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
        <div className='relative aspect-square'>
          <Image
            src={recipeData.cover ? recipeData.cover : '/images/placeholder-large.jpg'}
            alt='Put recipe title here'
            fill
            priority={true}
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            className='object-cover'
          />
          <div className='flex justify-end gap-1 relative top-2 right-2'>
            <p
              className={clsx(
                'text-xs font-medium text-white px-2 py-1 rounded-full',
                recipeData.admin_approved ? 'bg-green-600' : 'bg-red-600',
              )}
            >
              {recipeData.admin_approved ? 'Aprovada' : 'Em análise'}
            </p>
            <p
              className={clsx(
                'text-xs font-medium px-2 py-1 rounded-full ',
                recipeData.public ? 'bg-orange-600 text-white' : 'bg-white text-slate-800',
              )}
            >
              {recipeData.public ? 'Publicada' : 'Não publicada'}
            </p>
          </div>
        </div>

        <div className='space-y-4 p-4 text-sm text-stone-500'>
          <h1 className='font-semibold text-lg mb-2 line-clamp-1 text-gray-800'>
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

// return (
//   <Link href='#'>
//     <div className='flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
//       <div className='relative aspect-square'>
//         <Image
//           src='/images/recipe-grilled-salmon.jpg'
//           alt='Put recipe title here'
//           fill
//           priority={true}
//           sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//           className='object-cover'
//         />
//         <div className='flex justify-end gap-1 relative top-2 right-2'>
//           {/* Approved = Green, Not approved = Red */}
//           <p className='text-xs font-medium text-white px-2 py-1 rounded-full bg-green-600'>
//             Aprovada
//           </p>
//           {/* Public = Orange, Not public = White */}
//           <p className='text-xs font-medium text-slate-800 px-2 py-1 rounded-full bg-white'>
//             Não publicada
//           </p>
//         </div>
//       </div>

//       <div className='space-y-4 p-4 text-sm text-stone-500'>
//         <h1 className='font-semibold text-lg mb-2 line-clamp-1 text-gray-800'>
//           Salmão Grelhado com Ervas
//         </h1>
//         <p className='line-clamp-2'>
//           Filé de salmão grelhado com temperos especiais, servido com legumes assados e apresentação
//           elegante, ideal para ocasiões especiais.
//         </p>

//         <div className='line-clamp-1'>
//           {/* <p>Status: Aprovada</p>
//             <p>Não publicada</p> */}
//           <p>Criada em: 14/06/2025</p>
//         </div>
//       </div>
//     </div>
//   </Link>
// );
