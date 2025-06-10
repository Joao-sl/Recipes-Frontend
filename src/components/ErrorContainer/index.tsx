'use client';

import type { LinkProps } from 'next/link';
import Link from 'next/link';

type ErrorContainerProps = {
  errorNumber: string;
  message: string;
  link?: { props: LinkProps; linkMessage: React.ReactNode };
};

export function ErrorContainer({ errorNumber, message, link }: ErrorContainerProps) {
  return (
    <div className={'flex flex-col items-center justify-center gap-2 h-screen bg-slate-100'}>
      <div className='flex items-center'>
        <h1 className='border-r-1 border-r-slate-600  mr-4 px-6 text-2xl/[49px] font-bold'>
          {errorNumber}
        </h1>
        <h2 className='text-sm font-normal/[49px] m-0'>{message}</h2>
      </div>

      {link?.props && (
        <div className='flex gap-6 text-sm'>
          <Link {...link?.props} className='text-orange-700 hover:underline'>
            {link?.linkMessage}
          </Link>
        </div>
      )}
    </div>
  );
}
