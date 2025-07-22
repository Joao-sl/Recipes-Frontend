import clsx from 'clsx';
import { InputText } from '@/components/InputText';
import { Portal } from '@/components/Portal';
import { User } from '@/lib/auth/models';
import { ArrowLeftIcon, LucideIcon, SearchIcon } from 'lucide-react';
import { RefObject, useEffect, useRef, useState } from 'react';
import { MenuDropdown } from '../MenuDropdown';
import { Logo } from '@/components/Logo';

type MenuProps = {
  user: User | null;
  onLogout: () => Promise<void>;
  dropdownLinks: { href: string; labelIcon: LucideIcon; label: string }[];
  dropdownRef: RefObject<HTMLDivElement | null>;
  dropdownBtnRef: RefObject<HTMLButtonElement | null>;
  dropdownIsOpen: boolean;
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MobileMenu({
  user,
  onLogout,
  dropdownLinks,
  dropdownRef,
  dropdownBtnRef,
  dropdownIsOpen,
  setDropdownIsOpen,
}: MenuProps) {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchIsOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchIsOpen(false);
      }
    }
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, [searchIsOpen]);

  return (
    <nav className='bg-divider px-4 py-3 mb-5 shadow-xl/5 border-b border-root'>
      <div className='flex items-center justify-between relative'>
        <Portal>
          <div
            className={clsx(
              'absolute top-0 left-0 right-0 bg-divider px-4 py-3 shadow-xl/5',
              'transform transition duration-200 ease-out',
              searchIsOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4 pointer-events-none',
            )}
            ref={searchRef}
          >
            <div className='flex items-center gap-2'>
              <button
                className='mobile-menu-button'
                type='button'
                onClick={() => setSearchIsOpen(false)}
              >
                <ArrowLeftIcon />
              </button>

              <form className='flex items-center gap-2 w-full'>
                <InputText
                  type='text'
                  id='search'
                  name='search'
                  placeholder='Busque por receitas ou categorias'
                  Icon={SearchIcon}
                  className='h-10'
                />
                <button
                  className='mobile-menu-button bg-primary p-2.5 text-white hover:!bg-secondary'
                  type='submit'
                >
                  <SearchIcon size={22} />
                </button>
              </form>
            </div>
          </div>
        </Portal>

        <div className='flex items-center justify-center'>
          <button className='mobile-menu-button' onClick={() => setSearchIsOpen(state => !state)}>
            <SearchIcon size={18} />
          </button>
        </div>

        <Logo href='/' size='sm' />

        <MenuDropdown
          user={user}
          onLogout={onLogout}
          dropdownLinks={dropdownLinks}
          dropdownRef={dropdownRef}
          dropdownBtnRef={dropdownBtnRef}
          dropdownIsOpen={dropdownIsOpen}
          setDropdownIsOpen={setDropdownIsOpen}
        ></MenuDropdown>
      </div>
    </nav>
  );
}
