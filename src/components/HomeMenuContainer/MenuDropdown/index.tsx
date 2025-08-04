import { User } from '@/lib/auth/models';
import clsx from 'clsx';
import { LogOutIcon, LucideIcon, UserRoundIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject } from 'react';

type MenuDropdownProps = {
  user: User | null;
  onLogout: () => Promise<void>;
  dropdownLinks: { href: string; labelIcon: LucideIcon; label: string }[];
  dropdownRef: RefObject<HTMLDivElement | null>;
  dropdownBtnRef: RefObject<HTMLButtonElement | null>;
  dropdownIsOpen: boolean;
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MenuDropdown({
  user,
  onLogout,
  dropdownLinks,
  dropdownRef,
  dropdownBtnRef,
  dropdownIsOpen,
  setDropdownIsOpen,
}: MenuDropdownProps) {
  return (
    <>
      {user ? (
        <div className='relative flex rounded-full'>
          <button
            className='flex relative rounded-full w-10 h-10 cursor-pointer'
            onClick={() => setDropdownIsOpen(state => !state)}
            ref={dropdownBtnRef}
          >
            <Image
              className='rounded-full object-cover'
              src={user.profile?.avatar || '/images/user-placeholder.png'}
              alt='Se enviada sua imagem de perfil se não uma imagem qualquer'
              height={40}
              width={40}
              sizes='40px'
              quality={100}
            ></Image>
          </button>

          <div
            className={clsx(
              'border border-root shadow-lg bg-white min-w-max',
              'absolute top-full mt-2 right-0 z-50 p-4 rounded-lg',
              'transition duration-500',
              dropdownIsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
            ref={dropdownRef}
          >
            <div className='flex flex-col text-foreground'>
              <div className='flex items-center gap-2 pb-3 mb-3 border-b border-root'>
                <div className='flex relative rounded-full w-13 h-13'>
                  <Image
                    className='rounded-full object-cover'
                    src={user.profile?.avatar || '/images/user-placeholder.png'}
                    alt='Se enviada sua imagem de perfil se não uma imagem qualquer'
                    height={52}
                    width={52}
                    sizes='52px'
                    quality={100}
                  ></Image>
                </div>
                <p className='font-semibold'>{user.profile?.first_name || user.username}</p>
              </div>

              <div className='space-y-0.5'>
                {dropdownLinks.map((value, index) => (
                  <Link className='dropdown-classes' key={index} href={value.href}>
                    {<value.labelIcon />}
                    {value.label}
                  </Link>
                ))}
              </div>

              <div className='border-t border-root pt-2 mt-2'>
                <button className='dropdown-classes w-full cursor-pointer' onClick={onLogout}>
                  <LogOutIcon size={18} />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='md:hidden flex items-center justify-center'>
            <Link
              title='Login'
              href={'/login'}
              className='mobile-menu-button'
              aria-label='Ir para a página de login'
            >
              <UserRoundIcon size={18} />
            </Link>
          </div>
          <div
            className={clsx(
              'hidden md:flex items-center gap-4',
              'text-foreground text-sm font-medium',
            )}
          >
            <Link
              className={clsx(
                'flex justify-center items-center w-20 h-[35px]',
                'border border-muted-foreground/20 rounded-full',
                'transition hover:bg-muted-foreground/10 hover:border-transparent',
              )}
              href={'/login'}
            >
              Entrar
            </Link>

            <Link
              className={clsx(
                'flex justify-center items-center w-38 h-[35px]',
                'text-inverse bg-gradient-to-br from-primary to-primary/60',
                'rounded-full hover:scale-105 hover:shadow transition',
              )}
              href={'/register'}
            >
              Criar uma conta
            </Link>
          </div>
        </>
      )}
    </>
  );
}
