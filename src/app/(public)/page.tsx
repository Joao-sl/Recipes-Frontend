import { Loading } from '@/components/Loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Home`,
  description:
    'Descubra novas receitas para todas as ocasiões. Inspire-se com dicas culinárias, compartilhe as suas receitas e dicas com o grupo.',
};

export default function HomePage() {
  return <Loading />;
}
