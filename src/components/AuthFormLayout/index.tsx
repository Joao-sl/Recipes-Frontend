import clsx from 'clsx';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import type { LinkProps } from 'next/link';
import Link from 'next/link';

type AuthFormProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  imageProps: ImageProps;
  RegisterOrLoginMsg: string;
  linkProps: LinkProps;
  linkText: string;
  loginPage?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export function AuthFormLayout({
  title,
  description,
  children,
  imageProps,
  linkProps,
  RegisterOrLoginMsg,
  linkText,
  loginPage = false,
  onSubmit,
}: AuthFormProps) {
  const linkClasses = 'font-bold transition text-primary hover:underline';

  return (
    <div
      className={clsx(
        'lg:grid lg:grid-cols-2',
        'bg-[linear-gradient(360deg,_hsla(24,100%,40%,1)_0%,_hsla(29,100%,48%,1)_50%,_hsla(36,100%,50%,1)_100%)]',
      )}
    >
      <div className={clsx('flex justify-center items-center', 'py-4 mx-4 min-h-screen')}>
        <div
          className={clsx(
            'flex flex-col items-center justify-center',
            'py-8 px-8 md:px-15',
            'shadow-lg shadow-black/25',
            'rounded-2xl bg-slate-100',
          )}
        >
          <div className='relative w-26 h-26 rounded-full mb-4 shadow-lg'>
            <Image
              src='/images/ingredients.jpg'
              alt=''
              fill
              sizes='104px'
              priority
              className='object-cover object-center rounded-full ring-3 ring-primary'
              aria-hidden='true'
            />
          </div>

          <form
            onSubmit={onSubmit}
            className={clsx(
              'flex flex-col gap-6',
              'max-w-[350px] lg:min-w-[260px] lg:min-h-[340px] lg:w-[350px]',
            )}
          >
            <h2 className='text-center text-4xl font-bold text-base'>{title}</h2>
            <p className=' text-center'>{description}</p>

            {children}

            {loginPage && (
              <div className='flex justify-between gap-2 text-sm'>
                <div className='flex gap-1'>
                  <input id='stay-logged-in' type='checkbox' />
                  <label htmlFor='stay-logged-in'>Manter conectado</label>
                </div>
                <a className={linkClasses} href='#'>
                  Esqueci a senha
                </a>
              </div>
            )}

            <div className='text-sm flex flex-col gap-4 items-center justify-center'>
              <p>
                {RegisterOrLoginMsg}{' '}
                <Link {...linkProps} className={linkClasses}>
                  {linkText}
                </Link>
              </p>

              <Link className={linkClasses} href={'/'}>
                Voltar para a página inicial
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className='hidden lg:block relative min-h-screen'>
        <div className='absolute inset-0 bg-slate-100 clip-right-shape' />
        <div className='absolute inset-0 clip-right-shape-inner'>
          <Image
            {...imageProps}
            alt={imageProps.alt || ''}
            sizes='50vw'
            className='object-cover object-center'
          />
        </div>
      </div>
    </div>
  );
}
