import { SITE_NAME } from '@/lib/config';
import clsx from 'clsx';
import { ChefHatIcon } from 'lucide-react';
import Link from 'next/link';

type LogoProps = {
  href?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function Logo({ href, size = 'md' }: LogoProps) {
  const logoSize = {
    sm: 17,
    md: 21,
    lg: 25,
  };
  const siteNameSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  return (
    <>
      <div>
        <Link
          href={href ? href : ''}
          className={clsx(
            'flex items-center gap-2',
            href ? 'cursor-pointer' : 'pointer-events-none cursor-default',
          )}
        >
          <div
            className={clsx(
              'text-inverse p-2 rounded-md',
              'bg-gradient-to-br from-orange-500 to-orange-300',
            )}
          >
            <ChefHatIcon size={logoSize[size]} />
          </div>
          <h1
            className={clsx(
              'font-bold bg-clip-text text-transparent',
              'bg-gradient-to-br from-orange-500 to-orange-300 ',
              siteNameSize[size],
            )}
          >
            {SITE_NAME.toUpperCase()}
          </h1>
        </Link>
      </div>
    </>
  );
}
