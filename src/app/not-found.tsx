import { ErrorContainer } from '@/components/ErrorContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página não encontrada',
};

export default function NotFound() {
  return (
    <ErrorContainer
      errorNumber='404'
      message='Esta página não pôde ser encontrada.'
      link={{ props: { href: '/' }, linkMessage: 'Página Inicial' }}
    />
  );
}
