import { RegisterForm } from '@/components/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crie sua conta',
  description: `Crie sua conta gratuitamente no ${process.env.NEXT_PUBLIC_SITE_NAME} e venha fazer parte do clube`,
};

export default function RegisterPage() {
  return <RegisterForm />;
}
