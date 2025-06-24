import { Container } from '@/components/Container';
import { ProfileMenu } from '@/components/ProfileMenu';
import clsx from 'clsx';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <Container>
      <div className={clsx('flex flex-col', 'md:grid md:grid-cols-[auto_1fr] md:gap-6')}>
        <ProfileMenu />
        {children}
      </div>
    </Container>
  );
}
