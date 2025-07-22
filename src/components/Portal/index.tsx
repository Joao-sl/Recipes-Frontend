'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

export function Portal({ children }: PortalProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById('portal-root'));
  }, []);

  if (!root) return null;
  return createPortal(children, root);
}
