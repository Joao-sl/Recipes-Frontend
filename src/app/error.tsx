'use client';

import { ErrorContainer } from '@/components/ErrorContainer';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {
  useEffect(() => {
    // Save errors somewhere
  }, [error]);

  useEffect(() => {
    document.title = 'Erro interno do servidor';
  }, []);

  return (
    <ErrorContainer
      errorNumber='500'
      message='Desculpe, erro interno do servidor tente novamente mais tarde'
      link={{ props: { href: '/' }, linkMessage: 'Página Inicial' }}
    />
  );
}
