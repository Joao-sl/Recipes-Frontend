'use client';

import { KeyRoundIcon, MailIcon, User2Icon } from 'lucide-react';
import { AuthFormLayout } from '../AuthFormLayout';
import { InputText } from '../InputText';

export function RegisterForm() {
  async function handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();
    alert('ToDo');
  }

  return (
    <AuthFormLayout
      onSubmit={handleSubmit}
      title='Crie sua conta'
      description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas vero magnam ad doloremque consequuntur quas maiores? Dolor, fugiat magni dignissimos, sit vitae sunt ipsa atque, repellat provident dolores eveniet. Accusantium?'
      imageProps={{
        src: '/images/pizza.jpg',
        alt: '',
        'aria-hidden': true,
        fill: true,
        priority: true,
      }}
      linkProps={{ href: '/login/' }}
      RegisterOrLoginMsg='Já tem uma conta?'
      linkText='Entre aqui'
    >
      <InputText
        Icon={User2Icon}
        labelText='Login'
        id='username'
        placeholder='Seu login'
        autoComplete='off'
        required
      ></InputText>

      <InputText
        Icon={KeyRoundIcon}
        labelText='Senha'
        id='password'
        type='password'
        placeholder='Sua senha'
        required
      ></InputText>

      <ul className='flex flex-col text-sm mt-[-15px] text-slate-500'>
        <p>A sua senha deve conter</p>
        <li>• 8 caracteres no mínimo</li>
        <li>• 1 carácter especial (!@#$%¨&*())</li>
        <li>• 1 Letra maiúscula</li>
        <li>• 1 número</li>
      </ul>

      <InputText
        Icon={KeyRoundIcon}
        labelText='Confirme a Senha'
        id='confirm_password'
        type='password'
        placeholder='Confirme sua senha'
        required
      ></InputText>

      <InputText
        Icon={MailIcon}
        labelText='Email'
        id='email'
        type='email'
        placeholder='Seu e-mail'
        autoComplete='on'
        required
      ></InputText>
    </AuthFormLayout>
  );
}
