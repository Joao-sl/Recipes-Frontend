'use client';

import { KeyRoundIcon, User2Icon } from 'lucide-react';
import { AuthFormLayout } from '../AuthFormLayout';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginUserSchema } from '@/validations/user.schema';
import { LoadingSpinner } from '../Loading';

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

  const [error, setErrors] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(form.entries());
    const parsedData = LoginUserSchema.safeParse(data);

    if (parsedData.error) {
      setErrors('Usuário ou senha inválidos');
      setPasswordValue('');
      return;
    }

    setErrors('');
    setIsPending(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: parsedData.data?.username,
          password: parsedData.data?.password,
        }),
      });

      if (response.status === 401) {
        setErrors('Usuário ou senha inválidos');
        setPasswordValue('');
        return;
      }

      if (!response.ok) {
        toast.dismiss();
        toast.error('Desculpe algo deu errado, tente novamente mais tarde.');
        setPasswordValue('');
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const next = params.get('next') || '/';

      if (next && next.startsWith('/')) {
        router.push(next);
      } else {
        router.push('/');
      }
    } catch {
      toast.dismiss();
      toast.error('Desculpe algo deu errado, tente novamente mais tarde.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AuthFormLayout
      onSubmit={handleSubmit}
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
      RegisterOrLoginMsg={`Ainda não tem uma conta?${' '}`}
      linkText='Crie aqui'
      loginPage={true}
    >
      <InputText
        Icon={User2Icon}
        labelText='Login'
        id='login'
        name='username'
        type='text'
        placeholder='Seu usuário'
        autoComplete='on'
        required
        disabled={isPending}
        aria-describedby={error ? 'Usuário ou senha inválidos' : undefined}
      />

      <div>
        <InputText
          Icon={KeyRoundIcon}
          labelText='Senha'
          id='password'
          name='password'
          type='password'
          placeholder='Sua senha'
          required
          value={passwordValue}
          onChange={event => setPasswordValue(event.target.value)}
          disabled={isPending}
          aria-describedby={error ? 'Usuário ou senha inválidos' : undefined}
        />
        {error && <p className='text-sm text-red-600 pt-0.5'>{error}</p>}
      </div>

      <Button type='submit' disabled={isPending} aria-busy={isPending}>
        Entrar {isPending && <LoadingSpinner />}
      </Button>
    </AuthFormLayout>
  );
}
