'use client';

import {
  ChefHatIcon,
  CookingPotIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  ShieldUserIcon,
  UserRoundIcon,
  XIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

  const activeClasses = 'bg-orange-600 text-white font-bold cursor-default';
  const linkClasses = clsx(
    'flex items-center justify-start gap-1 text-sm h-9 px-4 rounded transition',
    'hover:bg-orange-600 hover:text-white [&_svg]:w-[20px] [&_svg]:h-[20px]',
  );

  const profileLinks = [
    { href: '/profile', labelIcon: UserRoundIcon, label: 'Perfil' },
    { href: '/add-recipe', labelIcon: PlusIcon, label: 'Enviar nova receita' },
    { href: '/my-recipes', labelIcon: ChefHatIcon, label: 'Minhas Receitas' },
    { href: '/security', labelIcon: ShieldUserIcon, label: 'Segurança da Conta' },
  ];

  const siteLinks = [
    { href: '/', labelIcon: HomeIcon, label: 'Home' },
    { href: '/recipes', labelIcon: CookingPotIcon, label: 'Receitas' },
  ];

  return (
    <>
      <div className='md:hidden flex justify-center py-1 mb-4 rounded-md bg-slate-200'>
        <button
          className={clsx('md:hidden ', linkClasses)}
          onClick={() => setIsOpen(state => !state)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
          {isOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {isOpen && (
        <div
          className={clsx('fixed inset-0 z-10 backdrop-filter backdrop-brightness-40', 'md:hidden')}
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      <nav
        className={clsx(
          'flex overflow-hidden max-w-57 min-w-57 py-4 px-2 top-20 z-20',
          'border border-slate-200 text-slate-700 bg-slate-100',
          'rounded-md transition duration-600',
          'md:translate-x-0 md:opacity-100 md:sticky md:min-h-screen',
          isOpen ? 'translate-x-0 absolute opacity-100' : '-translate-x-[107%] absolute opacity-0',
        )}
        role='navigation'
        aria-label='Menu de navegação do usuário'
      >
        <div className={clsx('flex flex-col gap-0.5 w-screen relative')}>
          <button
            className='md:hidden absolute left-[91%] top-[-7px] cursor-pointer transition hover:text-red-700'
            onClick={() => setIsOpen(state => !state)}
          >
            <XIcon size={20} />
          </button>

          <div className='flex flex-col gap-0.5'>
            <h1 className='text-center font-bold pb-4'>{SITE_NAME.toUpperCase()}</h1>
            <h2 className='text-sm text-slate-600 pb-1'>Configurações</h2>

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

          <div className='flex flex-col gap-0.5 pt-8'>
            <h2 className='text-sm text-slate-600 pb-1'>Navegação</h2>
            {siteLinks.map(({ href, labelIcon: Icon, label }) => {
              return (
                <Link key={href} href={href} className={`${linkClasses}`}>
                  <Icon />
                  {label}
                </Link>
              );
            })}
          </div>

          <div className='flex items-end h-full mt-10' onClick={handleLogout}>
            <button className={linkClasses}>
              <LogOutIcon size={20} /> Sair
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
