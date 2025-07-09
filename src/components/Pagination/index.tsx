import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type PaginationProps = {
  props: {
    current: number;
    count: number;
    pageSize: number;
    next: string | null;
    previous: string | null;
  };
};

function handlePaginationSize(current: number, lastPage: number) {
  const ELLIPSIS_L = -1;
  const ELLIPSIS_R = -2;

  if (lastPage < 7) {
    return Array.from({ length: lastPage }).map((_, i) => i + 1);
  }

  if (current < 3) {
    return [1, 2, 3, ELLIPSIS_R, lastPage - 1, lastPage];
  }

  if (current === 3) {
    return [1, 2, 3, 4, ELLIPSIS_R, lastPage - 1, lastPage];
  }

  if (current > lastPage - 2) {
    return [1, 2, ELLIPSIS_L, lastPage - 2, lastPage - 1, lastPage];
  }

  if (current === lastPage - 2) {
    return [1, 2, ELLIPSIS_L, current - 1, lastPage - 2, lastPage - 1, lastPage];
  }

  return [1, ELLIPSIS_L, current - 1, current, current + 1, ELLIPSIS_R, lastPage];
}

export function Pagination({ props }: PaginationProps) {
  const lastPage = Math.ceil(props.count / props.pageSize);
  const pagesArray = handlePaginationSize(props.current, lastPage);

  const commonClasses = 'flex items-center justify-center h-8 min-w-8 text-sm';
  const linkCommonClasses =
    'text-gray-600 hover:bg-orange-500/20 hover:border-orange-500/40 border border-slate-300 rounded-md';

  return (
    <nav className='flex items-center gap-1 overflow-hidden'>
      {props.current > 1 && (
        <Link
          href={`?page=${props.current - 1}`}
          className={clsx(commonClasses, linkCommonClasses, 'hidden sm:flex')}
        >
          <ChevronLeftIcon size={16} />
        </Link>
      )}
      {pagesArray.map(page =>
        page < 0 ? (
          <p key={page} className={clsx(commonClasses, 'text-slate-600 cursor-default')}>
            ...
          </p>
        ) : (
          <Link
            key={page}
            href={`?page=${page}`}
            className={clsx(
              page === props.current
                ? 'bg-orange-600 border-0 text-white cursor-default'
                : linkCommonClasses,
              commonClasses,
              'border border-slate-300 rounded-md font-medium',
            )}
          >
            {page}
          </Link>
        ),
      )}
      {props.current < lastPage && (
        <Link
          href={`?page=${props.current + 1}`}
          className={clsx(commonClasses, linkCommonClasses, 'hidden sm:flex')}
        >
          <ChevronRightIcon size={16} />
        </Link>
      )}
    </nav>
  );
}
