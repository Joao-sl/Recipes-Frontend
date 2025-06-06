'use client';

import { KeyRoundIcon, User2Icon } from 'lucide-react';
import { AuthFormLayout } from '../AuthFormLayout';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  useEffect(() => {
    const queryParams = window.location.search;
    if (queryParams.includes('created=success')) {
      toast.dismiss();
      toast.success('Conta criada com sucesso');

      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [router]);

  function HandleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();
    toast.info('TODO');
  }

  return (
    <AuthFormLayout
      onSubmit={HandleSubmit}
      title='Bem-vindo'
      description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas vero magnam ad doloremque consequuntur quas maiores? Dolor, fugiat magni dignissimos, sit vitae sunt ipsa atque, repellat provident dolores eveniet. Accusantium?'
      imageProps={{
        src: '/images/roast_beef.png',
        alt: '',
        fill: true,
        priority: true,
        'aria-hidden': true,
      }}
      linkProps={{ href: '/register' }}
      RegisterOrLoginMsg='Ainda não tem uma conta?'
      linkText='Crie aqui'
      loginPage={true}
    >
      <InputText
        Icon={User2Icon}
        labelText='Login'
        id='login'
        type='text'
        placeholder='Seu usuário'
        autoComplete='on'
        required
      />
      <InputText
        Icon={KeyRoundIcon}
        labelText='Senha'
        id='senha'
        type='password'
        placeholder='Sua senha'
        required
      />
      <Button size='flex' type='submit'>
        Entrar
      </Button>
    </AuthFormLayout>
  );
}
