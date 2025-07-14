'use client';

import {
  BookOpenIcon,
  CookingPotIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  ShieldIcon,
  UserRoundIcon,
  UtensilsIcon,
  XIcon,
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_NAME } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from '../Button';

export function ProfileMenu() {
  const router = useRouter();
  const [ariaErrorMessage, setAriaMessage] = useState('');

  async function handleLogout() {
    try {
      await fetch('api/logout');
      router.push('/');
    } catch {
      toast.error('Desculpe não conseguimos encerrar sua sessão', {
        ariaLabel: 'Desculpe não conseguimos encerrar sua sessão',
      });
      setAriaMessage('Desculpe não conseguimos encerrar sua sessão');
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  const activeClasses = 'bg-primary text-inverse hover:bg-primary cursor-default';
  const linkClasses = clsx(
    'flex items-center gap-3 text-sm text-base-color px-3 py-2 rounded-lg',
    'hover:bg-gray-200 [&_svg]:w-[18px] [&_svg]:h-[18px]',
  );
  const subTitleMenuClasses = 'text-sm text-muted font-medium mb-3';

  const profileLinks = [
    { href: '/profile', labelIcon: UserRoundIcon, label: 'Perfil' },
    { href: '/new-recipe', labelIcon: PlusIcon, label: 'Nova Receita' },
    { href: '/my-recipes', labelIcon: BookOpenIcon, label: 'Minhas Receitas' },
    { href: '/security', labelIcon: ShieldIcon, label: 'Segurança da Conta' },
  ];

  const siteLinks = [
    { href: '/', labelIcon: HomeIcon, label: 'Home' },
    { href: '/recipes', labelIcon: CookingPotIcon, label: 'Receitas' },
  ];

  return (
    <div className='md:w-64'>
      <div className='flex md:hidden'>
        <Button
          className={'w-full rounded-none'}
          onClick={() => setIsOpen(state => !state)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <XIcon /> : <MenuIcon size={22} absoluteStrokeWidth />}
          {isOpen ? 'Fechar' : 'Menu'}
        </Button>
      </div>

      {isOpen && (
        <div
          className={clsx('fixed inset-0 z-10 backdrop-filter backdrop-brightness-40 md:hidden')}
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      <nav
        className={clsx(
          'flex  w-64 h-screen border-r border-root z-50 transition duration-500',
          'md:fixed md:translate-x-0 md:opacity-100',
          isOpen
            ? 'translate-x-0 fixed top-0 opacity-100 bg-divider h-screen rounded-lg'
            : '-translate-x-[107%] absolute top-0 opacity-0',
        )}
        role='navigation'
        aria-label='Menu de navegação do usuário'
      >
        <div className='flex flex-col h-full w-full overflow-y-auto'>
          <button
            className='absolute top-3 right-3 cursor-pointer transition md:hidden hover:text-red-600'
            onClick={() => setIsOpen(state => !state)}
          >
            <XIcon size={20} />
          </button>

          <div className='flex items-center gap-4 p-6 border-b border-root'>
            <div className='p-2 bg-primary rounded-lg'>
              <UtensilsIcon size={25} className='text-white' />
            </div>
            <h1 className='text-xl text-base-color font-bold'>{SITE_NAME.toUpperCase()}</h1>
          </div>

          <div className='p-6'>
            <h2 className={subTitleMenuClasses}>Configurações</h2>
            <div className='space-y-1'>
              {profileLinks.map(({ href, labelIcon: Icon, label }) => {
                const isActive = path === href || path.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkClasses} ${isActive ? activeClasses : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon />
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className='space-y-1 mt-6'>
              <h2 className={subTitleMenuClasses}>Navegação</h2>
              {siteLinks.map(({ href, labelIcon: Icon, label }) => {
                return (
                  <Link key={href} href={href} className={`${linkClasses}`}>
                    <Icon />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className='flex mb-2 border-t border-root mt-auto' onClick={handleLogout}>
            <div className='px-6 h-full mt-2 w-full'>
              <button className={clsx(linkClasses, 'w-full cursor-pointer')}>
                <LogOutIcon size={18} /> Sair
              </button>
            </div>
          </div>
        </div>

        <div aria-live='polite' className='sr-only' id='logout-feedback'>
          {ariaErrorMessage}
        </div>
      </nav>
    </div>
  );
}
