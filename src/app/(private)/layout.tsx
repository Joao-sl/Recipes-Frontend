import { ProfileMenu } from '@/components/ProfileMenu';
import clsx from 'clsx';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className={clsx('flex flex-col', 'md:grid md:grid-cols-[auto_1fr]')}>
      <ProfileMenu />
      {children}
    </div>
  );
}
