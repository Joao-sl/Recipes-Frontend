import { User } from '@/lib/auth/models';
import { MenuDropdown } from '../MenuDropdown';
import { Logo } from '@/components/Logo';
import { RefObject } from 'react';
import { LucideIcon, SearchIcon } from 'lucide-react';
import { InputText } from '@/components/InputText';

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
    <nav className='flex justify-center items-center py-4 border-b border-root shadow-sm'>
      <div className='flex justify-between items-center mx-4 gap-8 w-full max-w-[1160px]'>
        <Logo href='/' />

        <form className='flex items-center gap-2 w-full'>
          <InputText
            type='text'
            id='search'
            name='search'
            placeholder='Busque por receitas ou categorias'
            Icon={SearchIcon}
          />
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
