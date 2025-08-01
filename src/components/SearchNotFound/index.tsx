import clsx from 'clsx';
import { ArrowLeftIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';

type SearchNotFoundProps = {
  searchedTerm: string;
};

export function SearchNotFound({ searchedTerm }: SearchNotFoundProps) {
  return (
    <div className='flex justify-center items-center mt-12'>
      <div className='flex flex-col items-center'>
        <div
          className={clsx(
            'flex justify-center items-center rounded-full mb-6 ',
            'bg-primary/10 h-24 w-24 text-orange-800',
          )}
        >
          <SearchIcon size={48} />
        </div>

        <h1 className='text-3xl font-bold mb-4'>Nenhuma receita encontrada</h1>
        <p className='text-muted-foreground text-lg max-w-2xl text-center'>
          Desculpe não encontramos nenhuma receita para&nbsp;
          <span className='font-bold'>&quot;{searchedTerm}&quot;</span>. Tente refinar sua busca ou
          explore nossas receitas.
        </p>

        <div className='flex gap-6 mt-6'>
          <Link
            className={clsx(
              'flex items-center justify-center gap-2 text-sm h-9 sm:w-45',
              'rounded-lg text-inverse font-medium bg-primary',
              'transition hover:bg-secondary',
            )}
            href={'/'}
          >
            <ArrowLeftIcon size={16} />
            Volte para a Home
          </Link>

          <Link
            className={clsx(
              'flex items-center justify-center gap-2 text-sm h-9 sm:w-45',
              'rounded-lg font-medium border border-muted-foreground/20',
              'transition hover:bg-muted-foreground/10',
            )}
            href={'/recipes'}
          >
            Explorar Receitas
          </Link>
        </div>
      </div>
    </div>
  );
}
