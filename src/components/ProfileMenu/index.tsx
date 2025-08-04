'use client';

import {
  BookOpenIcon,
  CookingPotIcon,
  HomeIcon,
  LogOutIcon,
  PlusIcon,
  ShieldIcon,
  SidebarIcon,
  UserRoundIcon,
  XIcon,
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Logo } from '../Logo';

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
    <nav className='md:w-64 text-foreground'>
      <div className='flex md:hidden'>
        <button
          className={clsx('flex gap-1 p-3 w-full transition shadow')}
          onClick={() => setIsOpen(state => !state)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <div className='p-2 rounded-lg hover:bg-primary hover:text-inverse'>
            {isOpen ? <XIcon /> : <SidebarIcon size={18} />}
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 z-10 backdrop-brightness-40 md:hidden'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      <div
        className={clsx(
          'flex  w-64 h-screen border-r border-root z-50 transition duration-500',
          'md:fixed md:translate-x-0 md:opacity-100',
          isOpen
            ? 'translate-x-0 fixed top-0 opacity-100 bg-divider h-screen '
            : '-translate-x-[107%] absolute top-0 opacity-0',
        )}
        role='navigation'
        aria-label='Menu de navegação do usuário'
      >
        <div className='flex flex-col h-full w-full overflow-y-auto'>
          <button
            className={clsx(
              'absolute top-3 right-3 cursor-pointer',
              'transition md:hidden hover:text-red-600',
            )}
            onClick={() => setIsOpen(state => !state)}
          >
            <XIcon size={20} />
          </button>

          <div className='flex items-center gap-4 px-6 py-4 border-b border-root'>
            <Logo size='sm' />
          </div>

          <div className='p-6'>
            <h2 className='profile-menu-subtitle'>Configurações</h2>
            <div className='space-y-1'>
              {profileLinks.map(({ href, labelIcon: Icon, label }) => {
                const isActive = path === href || path.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`profile-menu-link ${isActive ? 'profile-menu-active' : null}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon />
                    {label}
                  </Link>
                );
              })}
            </div>

            <div className='mt-6'>
              <h2 className='profile-menu-subtitle'>Navegação</h2>
              <div className='space-y-1'>
                {siteLinks.map(({ href, labelIcon: Icon, label }) => {
                  return (
                    <Link key={href} href={href} className='profile-menu-link'>
                      <Icon />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='flex mb-2 border-t border-root mt-auto' onClick={handleLogout}>
            <div className='px-6 h-full mt-2 w-full'>
              <button className='profile-menu-link w-full cursor-pointer'>
                <LogOutIcon size={18} /> Sair
              </button>
            </div>
          </div>
        </div>

        <div aria-live='polite' className='sr-only' id='logout-feedback'>
          {ariaErrorMessage}
        </div>
      </div>
    </nav>
  );
}
