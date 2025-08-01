import './globals.css';
import type { Metadata } from 'next';
import { ToastifyContainer } from '@/components/ToastifyContainer';
import { SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: {
    template: `%s - ${SITE_NAME}`,
    default: SITE_NAME,
  },
  applicationName: SITE_NAME,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt_BR' className='light'>
      <body>
        {children}
        <ToastifyContainer />
        <div id='portal-root'></div>
      </body>
    </html>
  );
}
