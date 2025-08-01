import { User } from '@/lib/auth/models';
import { MenuDropdown } from '../MenuDropdown';
import { Logo } from '@/components/Logo';
import { RefObject } from 'react';
import { LucideIcon, SearchIcon } from 'lucide-react';

import clsx from 'clsx';

type MenuProps = {
  user: User | null;
  onLogout: () => Promise<void>;
  dropdownLinks: { href: string; labelIcon: LucideIcon; label: string }[];
  dropdownRef: RefObject<HTMLDivElement | null>;
  dropdownBtnRef: RefObject<HTMLButtonElement | null>;
  dropdownIsOpen: boolean;
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DesktopMenu({
  user,
  onLogout,
  dropdownLinks,
  dropdownRef,
  dropdownBtnRef,
  dropdownIsOpen,
  setDropdownIsOpen,
}: MenuProps) {
  return (
    <nav className='flex justify-center items-center p-4 border-b border-root'>
      <div className='flex justify-between items-center gap-8 w-full max-w-[1160px]'>
        <Logo href='/' />

        <form className='flex items-center gap-2' action={'/search'}>
          <div
            className={clsx(
              'flex items-center gap-2 border py-1.5 px-6 group',
              'rounded-full border-muted-foreground/20',
              'hover:bg-muted-foreground/5',
            )}
          >
            <label htmlFor='search'>
              <SearchIcon size={18} />
            </label>

            <input
              className={clsx(
                'w-full outline-0 group-focus:border-primary transition',
                'placeholder:text-sm lg:w-74',
              )}
              type='text'
              id='search'
              name='q'
              placeholder='Busque por receitas ou categorias'
            />
          </div>

          <button
            className={clsx(
              'px-4 text-sm h-[35px] rounded-full',
              'text-inverse rounded-full font-semibold',
              'cursor-pointer transition hover:shadow',
              'bg-gradient-to-br from-primary to-primary/60 hover:bg-secondary',
            )}
            type='submit'
          >
            Buscar
          </button>
        </form>

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
