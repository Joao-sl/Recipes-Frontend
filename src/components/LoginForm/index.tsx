'use client';

import { KeyRoundIcon, User2Icon } from 'lucide-react';
import { AuthFormLayout } from '../AuthFormLayout';
import { InputText } from '../InputText';

export function LoginForm() {
  function HandleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();
    alert('ToDo');
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
    </AuthFormLayout>
  );
}
