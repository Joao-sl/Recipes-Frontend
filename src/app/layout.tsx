import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Recipe site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <header className='text-9xl text-amber-300'>Menu</header>

        {children}

        <footer>Footer</footer>
      </body>
    </html>
  );
}
