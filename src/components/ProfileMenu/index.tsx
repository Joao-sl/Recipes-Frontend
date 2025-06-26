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

  const activeClasses = 'bg-orange-600 text-white hover:bg-orange-600 cursor-default';
  const linkClasses = clsx(
    'flex items-center gap-3 text-sm text-gray-800 px-3 py-2 rounded-lg',
    'hover:bg-gray-200 [&_svg]:w-[18px] [&_svg]:h-[18px]',
  );
  const subTitleMenuClasses = 'text-sm text-gray-500 font-medium mb-3';

  const profileLinks = [
    { href: '/profile', labelIcon: UserRoundIcon, label: 'Perfil' },
    { href: '/new-recipe', labelIcon: PlusIcon, label: 'Enviar nova receita' },
    { href: '/my-recipes', labelIcon: BookOpenIcon, label: 'Minhas Receitas' },
    { href: '/security', labelIcon: ShieldIcon, label: 'Segurança da Conta' },
  ];

  const siteLinks = [
    { href: '/', labelIcon: HomeIcon, label: 'Home' },
    { href: '/recipes', labelIcon: CookingPotIcon, label: 'Receitas' },
  ];

  return (
    <>
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
          'flex max-w-64 min-w-64 p-6 h-screen border-r border-gray-200 z-50 transition duration-500',
          'md:sticky md:translate-x-0 md:opacity-100',
          isOpen
            ? 'translate-x-0 absolute opacity-100 bg-gray-50 h-screen min-h-[500px] rounded-lg'
            : '-translate-x-[107%] absolute opacity-0',
        )}
        role='navigation'
        aria-label='Menu de navegação do usuário'
      >
        <div className={clsx('w-screen relative')}>
          <button
            className='md:hidden absolute left-[91%] top-[-7px] cursor-pointer transition hover:text-red-700'
            onClick={() => setIsOpen(state => !state)}
          >
            <XIcon size={20} />
          </button>

          <h1 className='text-xl text-gray-800 font-bold mb-8'>{SITE_NAME.toUpperCase()}</h1>
          <h2 className={subTitleMenuClasses}>Configurações</h2>
          <div className='space-y-1'>
            {profileLinks.map(({ href, labelIcon: Icon, label }) => {
              const isActive = path === href;
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

          <div className='absolute bottom-1' onClick={handleLogout}>
            <button className={linkClasses}>
              <LogOutIcon size={18} /> Sair
            </button>
          </div>
        </div>

        <div aria-live='polite' className='sr-only' id='logout-feedback'>
          {ariaErrorMessage}
        </div>
      </nav>
    </>
  );
}
