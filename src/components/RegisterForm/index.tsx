'use client';

import { KeyRoundIcon, MailIcon, User2Icon } from 'lucide-react';
import { AuthFormLayout } from '../AuthFormLayout';
import { InputText } from '../InputText';
import { RegisterUserSchema } from '@/validations/user-schema';
import { z } from 'zod/v4';
import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '../Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '../Loading';
import type { FormErrors } from '@/validations/form-errors-type';
import { fetchErrorHandler } from '@/utils/fetch-errors-handler';

export function RegisterForm() {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<FormErrors>();
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const dataParsed = RegisterUserSchema.safeParse(data);

    if (!dataParsed.success) {
      const errors = z.flattenError(dataParsed.error);
      setFormErrors(errors);
      return;
    }

    setFormErrors(undefined);
    setIsPending(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          password_confirm: data.password_confirm,
          email: data.email,
        }),
      });

      if (!response.ok) {
        toast.dismiss();
        if (response.status === 400) {
          const errors = await response.json();
          setFormErrors(errors);
        }
        fetchErrorHandler(response.status);
      }
    } catch {
      toast.error('Desculpe algo deu errado, tente novamente mais tarde.');
    } finally {
      setIsPending(false);
    }

    setFormErrors(undefined);
    router.push('/login?created=success');
  }

  const errorClasses = clsx('text-sm text-red-600');

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
      {formErrors?.formErrors && (
        <div role='alert' aria-live='assertive'>
          {formErrors?.formErrors.map((val, index) => (
            <p className={errorClasses} key={index}>
              {val}
            </p>
          ))}
        </div>
      )}

      <div>
        <InputText
          Icon={User2Icon}
          labelText='Login'
          id='username'
          name='username'
          placeholder='Seu login'
          autoComplete='off'
          required
          disabled={isPending}
          aria-describedby={formErrors?.fieldErrors?.username ? 'username-error' : undefined}
        ></InputText>

        {formErrors?.fieldErrors?.username &&
          formErrors.fieldErrors.username.map((val, index) => (
            <p id='username-error' className={errorClasses} key={index}>
              {val}
            </p>
          ))}
      </div>

      <div>
        <InputText
          Icon={KeyRoundIcon}
          labelText='Senha'
          id='password'
          name='password'
          type='password'
          placeholder='Sua senha'
          required
          disabled={isPending}
          aria-describedby={formErrors?.fieldErrors?.password ? 'password-error' : undefined}
        ></InputText>

        {formErrors?.fieldErrors?.password &&
          formErrors?.fieldErrors?.password.map((val, index) => (
            <p id='password-error' className={errorClasses} key={index}>
              {val}
            </p>
          ))}

        <ul className='flex flex-col text-sm  text-slate-500'>
          <p>A sua senha deve conter</p>
          <li>• 8 caracteres no mínimo</li>
          <li>• 1 carácter especial, !@#$%¨&*()_+</li>
          <li>• 1 Letra maiúscula</li>
          <li>• 1 número</li>
        </ul>
      </div>

      <div>
        <InputText
          Icon={KeyRoundIcon}
          labelText='Confirme a Senha'
          id='password_confirm'
          name='password_confirm'
          type='password'
          placeholder='Confirme sua senha'
          required
          disabled={isPending}
          aria-describedby={
            formErrors?.fieldErrors?.password_confirm ? 'password-confirm-error' : undefined
          }
        ></InputText>

        {formErrors?.fieldErrors?.password_confirm &&
          formErrors?.fieldErrors?.password_confirm.map((val, index) => (
            <p id='password-confirm-error' className={errorClasses} key={index}>
              {val}
            </p>
          ))}
      </div>

      <div>
        <InputText
          Icon={MailIcon}
          labelText='Email'
          id='email'
          name='email'
          type='email'
          placeholder='Seu e-mail'
          autoComplete='on'
          required
          disabled={isPending}
          aria-describedby={formErrors?.fieldErrors?.password_confirm ? 'email-error' : undefined}
        ></InputText>

        {formErrors?.fieldErrors?.email &&
          formErrors?.fieldErrors?.email.map((val, index) => (
            <p id='email-error' className={errorClasses} key={index}>
              {val}
            </p>
          ))}
      </div>

      <Button type='submit' disabled={isPending} aria-busy={isPending} aria-disabled={isPending}>
        Cadastrar {isPending && <LoadingSpinner />}
      </Button>
    </AuthFormLayout>
  );
}
