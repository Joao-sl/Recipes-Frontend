import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type PaginationProps = {
  current: number;
  count: number;
  pageSize: number;
  next: string | null;
  previous: string | null;
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

export function Pagination({ current, count, pageSize, next, previous }: PaginationProps) {
  const lastPage = Math.ceil(count / pageSize);
  const pagesArray = handlePaginationSize(current, lastPage);

  return (
    <nav className='flex items-center gap-1 overflow-hidden'>
      {previous && (
        <Link
          href={`?page=${current - 1}`}
          className={clsx('pagination-container pagination-links hidden sm:flex')}
        >
          <ChevronLeftIcon size={16} />
        </Link>
      )}

      {pagesArray.map(page =>
        page < 0 ? (
          <p key={page} className={clsx('pagination-container text-slate-600 cursor-default')}>
            ...
          </p>
        ) : (
          <Link
            key={page}
            href={`?page=${page}`}
            className={clsx(
              'pagination-container rounded-md font-medium',
              page === current
                ? 'bg-primary border-0 text-inverse cursor-default pointer-events-none'
                : 'pagination-links',
            )}
          >
            {page}
          </Link>
        ),
      )}

      {next && (
        <Link
          href={`?page=${current + 1}`}
          className={clsx('pagination-container pagination-links hidden sm:flex')}
        >
          <ChevronRightIcon size={16} />
        </Link>
      )}
    </nav>
  );
}
