import type { Metadata } from 'next';
import './globals.css';

const site_name = process.env.NEXT_PUBLIC_SITE_NAME || 'change-me';

export const metadata: Metadata = {
  title: {
    template: `%s - ${site_name}`,
    default: site_name,
  },
  applicationName: site_name,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt_BR' className='light'>
      <body>{children}</body>
    </html>
  );
}
