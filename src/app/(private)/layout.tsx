type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    // TODO: Container Component
    <div>
      <nav>TODO: MENU</nav>
      {children}
      <footer>TODO: FOOTER</footer>
    </div>
  );
}
