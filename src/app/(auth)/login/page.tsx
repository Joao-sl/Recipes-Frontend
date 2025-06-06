import { LoginForm } from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
  description: `Entre na sua conta no ${process.env.NEXT_PUBLIC_SITE_NAME} e aproveite os benefícios`,
};

export default function LoginPage() {
  return <LoginForm />;
}
