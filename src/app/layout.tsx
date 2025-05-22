import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Receitolas",
  description: "Recipe site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>Menu</header>

        {children}

        <footer>Footer</footer>
      </body>
    </html>
  );
}
