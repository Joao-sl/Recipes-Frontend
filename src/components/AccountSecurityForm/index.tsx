'use client';

import clsx from 'clsx';
import { Button } from '../Button';
import { InputText } from '../InputText';
import { EyeClosedIcon, EyeIcon, XIcon } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../Loading';
import { useRouter } from 'next/navigation';

export function AccountSecurityForm({ email }: { email?: string }) {
  useEffect(() => {
    if (!email) {
      toast.error('Desculpe não conseguimos recuperar os dados do seu perfil', {
        ariaLabel: 'Desculpe não conseguimos recuperar os dados do seu perfil',
        role: 'alert',
        toastId: 'profile-error',
      });
    }
  }, [email]);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    current_pass: false,
    new_pass: false,
    confirm_pass: false,
  });
  const [passwordFeedback, setPasswordFeedback] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>();
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleStrongPassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPasswordFeedback([]);

    if (password === '') return;
    if (password.length < 8) setPasswordFeedback(prev => [...prev, 'No mínimo 8 caracteres']);
    if (!/[A-Z]/.test(password)) setPasswordFeedback(prev => [...prev, 'Uma letra maiúscula']);
    if (!/[a-z]/.test(password)) setPasswordFeedback(prev => [...prev, 'Uma letra minúscula']);
    if (!/\d/.test(password)) setPasswordFeedback(prev => [...prev, 'Um número']);
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
      setPasswordFeedback(prev => [...prev, 'Um caractere especial !@#$%^&*()_+']);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwordFeedback.length > 0) return toast.error('Sigas as instruções para uma senha forte');
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (!data.password) {
      setFormErrors({
        passRequired: ['Você precisa digitar sua senha atual para fazer alterações'],
      });
      return;
    }
    if (data.new_password !== data.confirm_new_password) {
      setFormErrors({ passDoNotMatch: ['Senhas não coincidem'] });
      return;
    }
    if (data.password === data.new_password) {
      setFormErrors({ samePass: ['A nova senha não deve ser igual a senha atual'] });
      return;
    }

    setFormErrors(undefined);
    setIsPending(true);
    try {
      const payload = {
        ...(data.email && data.email != email && { email: data.email }),
        ...(data.password && { password: data.password }),
        ...(data.new_password && { new_password: data.new_password }),
      };

      const response = await fetch('api/me', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errors = await response.json();
        setFormErrors(errors);
        return;
      }

      toast.success('Dados atualizados com sucesso', { toastId: 'success' });
      formRef?.current?.reset();
      router.refresh();
    } catch {
    } finally {
      setIsPending(false);
    }
  }

  const showPasswordClasses = 'cursor-pointer absolute right-2 top-9.5 text-slate-500/80';
  return (
    <div className='max-w-2xl mx-auto'>
      <div className='form-wrapper'>
        <h1 className={clsx('form-title', 'flex items-center gap-2 text-lg sm:text-2xl')}>
          Configurações de Segurança
        </h1>
        <h3 className='-mt-5 mb-6 text-sm text-slate-500'>
          Mantenha seu email e senha atualizados para manter sua conta protegida
        </h3>

        <form className='flex flex-col space-y-6' ref={formRef} onSubmit={handleSubmit}>
          <InputText
            type='email'
            labelText='Email'
            id='email'
            name='email'
            placeholder='Seu email'
            autoComplete='on'
            disabled={isPending}
            aria-disabled={isPending}
            required
            defaultValue={email}
          />

          <div className='relative'>
            <InputText
              type={showPassword.current_pass ? 'text' : 'password'}
              labelText='Senha Atual'
              name='password'
              id='password'
              placeholder='Digite sua senha atual'
              className='pr-9'
              autoComplete='off'
              disabled={isPending}
              aria-disabled={isPending}
              required
            />

            <button
              type='button'
              className={showPasswordClasses}
              onClick={() =>
                setShowPassword(state => ({ ...state, current_pass: !state.current_pass }))
              }
              aria-label='Mostrar password'
            >
              {showPassword.current_pass ? <EyeIcon size={20} /> : <EyeClosedIcon size={20} />}
            </button>
          </div>

          <div className='relative'>
            <InputText
              type={showPassword.new_pass ? 'text' : 'password'}
              labelText='Nova Senha'
              id='new-password'
              name='new_password'
              onChange={handleStrongPassword}
              placeholder='Digite sua nova senha'
              className='pr-9'
              autoComplete='off'
              disabled={isPending}
              aria-disabled={isPending}
              onSubmit={e => (e.currentTarget.value = '')}
            />

            {passwordFeedback.length > 0 && (
              <ul className='space-y-1 text-xs text-slate-500 ml-1'>
                <p className='font-medium text-slate-600'>Sua senha deve conter:</p>
                {passwordFeedback.map((message, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <XIcon className='text-red-600' size={13} /> {message}
                  </li>
                ))}
              </ul>
            )}

            <button
              type='button'
              className={showPasswordClasses}
              onClick={() => setShowPassword(state => ({ ...state, new_pass: !state.new_pass }))}
              aria-label='Mostrar password'
            >
              {showPassword.new_pass ? <EyeIcon size={20} /> : <EyeClosedIcon size={20} />}
            </button>
          </div>

          <div className='relative'>
            <InputText
              type={showPassword.confirm_pass ? 'text' : 'password'}
              labelText='Confirme a Nova Senha'
              id='confirm-new-password'
              name='confirm_new_password'
              placeholder='Confirme sua nova senha'
              className='pr-9'
              autoComplete='off'
              disabled={isPending}
              aria-disabled={isPending}
            />

            {formErrors &&
              Object.entries(formErrors).map(([key, messages]) =>
                messages.map((message, idx) => (
                  <p className='text-xs text-red-600' key={`${key}-${idx}`}>
                    {message}
                  </p>
                )),
              )}

            <button
              type='button'
              className={showPasswordClasses}
              onClick={() =>
                setShowPassword(state => ({ ...state, confirm_pass: !state.confirm_pass }))
              }
              aria-label='Mostrar password'
            >
              {showPassword.confirm_pass ? <EyeIcon size={20} /> : <EyeClosedIcon size={20} />}
            </button>
          </div>

          <Button type='submit' disabled={isPending} aria-disabled={isPending}>
            {isPending && <LoadingSpinner color='orange' />}
            {isPending ? 'Enviando' : 'Enviar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
