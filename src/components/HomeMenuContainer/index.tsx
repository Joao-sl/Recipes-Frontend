'use client';

import { User } from '@/lib/auth/models';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { BookOpenIcon, PlusIcon, ShieldIcon, UserRoundIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';

type MenuProps = {
  user: User | null;
};

export function HomeMenuContainer({ user }: MenuProps) {
  const router = useRouter();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownBtnRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useBreakpoint('(width >= 768px)');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        !(dropdownBtnRef.current && dropdownBtnRef.current.contains(e.target as Node)) &&
        dropdownIsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownIsOpen(false);
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, [dropdownIsOpen]);

  async function handleLogout() {
    try {
      await fetch('api/logout');
      router.refresh();
    } catch {
      toast.error('Desculpe não conseguimos encerrar sua sessão', {
        ariaLabel: 'Desculpe não conseguimos encerrar sua sessão',
      });
    }
  }

  const dropdownLinks = [
    { href: '/profile', labelIcon: UserRoundIcon, label: 'Perfil' },
    { href: '/new-recipe', labelIcon: PlusIcon, label: 'Nova Receita' },
    { href: '/my-recipes', labelIcon: BookOpenIcon, label: 'Minhas Receitas' },
    { href: '/security', labelIcon: ShieldIcon, label: 'Segurança da Conta' },
  ];

  if (isDesktop === null) {
    return <div className='flex justify-center items-center w-full h-[71px] shadow-sm'></div>;
  }

  return (
    <>
      {isDesktop ? (
        <div>
          <DesktopMenu
            user={user}
            onLogout={handleLogout}
            dropdownLinks={dropdownLinks}
            dropdownRef={dropdownRef}
            dropdownBtnRef={dropdownBtnRef}
            dropdownIsOpen={dropdownIsOpen}
            setDropdownIsOpen={setDropdownIsOpen}
          />
        </div>
      ) : (
        <div>
          <MobileMenu
            user={user}
            onLogout={handleLogout}
            dropdownLinks={dropdownLinks}
            dropdownRef={dropdownRef}
            dropdownBtnRef={dropdownBtnRef}
            dropdownIsOpen={dropdownIsOpen}
            setDropdownIsOpen={setDropdownIsOpen}
          />
        </div>
      )}
    </>
  );
}
