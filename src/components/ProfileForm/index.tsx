'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { InputDate } from '../InputDate';
import { InputText } from '../InputText';
import { InputTextArea } from '../InputTextArea';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '../Loading';
import { UserProfileSchema } from '@/validations/user.schema';
import { FormErrors } from '@/validations/formErrorsType';
import { z } from 'zod/v4';
import { fileSizeValidator } from '@/utils/fileSizeValidator';
import { isEqual } from 'lodash';
import { fetchErrorHandler } from '@/utils/fetchErrorsHandler';
import { InputImageWithPreview } from '../InputImageWithPreview';

type ProfileData = {
  initialData?: {
    avatar: string | '';
    first_name: string | '';
    last_name: string | '';
    description: string | '';
    birth_date: string | '';
    favorite_recipe: string | '';
  };
};

export function ProfileForm({ initialData }: ProfileData) {
  const [profileData, setProfileData] = useState(initialData);
  const [maxDate, setMaxDate] = useState<string | number>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [profileFormErrors, setProfileFormErrors] = useState<FormErrors>();
  const [isPending, setIsPending] = useState(false);
  const [isPendingAvatar, setIsPendingAvatar] = useState(false);

  const router = useRouter();
  const errorClasses = clsx('text-sm text-red-600');

  useEffect(() => {
    if (!profileData) {
      toast.error('Desculpe não conseguimos recuperar os dados do seu perfil', {
        ariaLabel: 'Desculpe não conseguimos recuperar os dados do seu perfil',
        role: 'alert',
        toastId: 'profile-error',
      });
    }
    setProfileData(initialData);
  }, [profileData, initialData]);

  useEffect(() => {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 6);
    const isoDate = now.toISOString().split('T')[0];
    setMaxDate(isoDate);
  }, []);

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const dataParsed = UserProfileSchema.safeParse(data);

    const initial = { ...initialData };
    delete initial.avatar;
    if (isEqual(initial, data)) {
      return;
    }

    if (!dataParsed.success) {
      const errors = z.flattenError(dataParsed.error);
      setProfileFormErrors(errors);
      return;
    }

    setIsPending(true);
    setProfileFormErrors(undefined);
    try {
      const response = await fetch('/api/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: dataParsed.data }),
      });

      if (!response.ok) {
        toast.dismiss();
        return fetchErrorHandler(response.status);
      }

      toast.dismiss();
      toast.success('Dados atualizados com sucesso');
      router.refresh();
    } catch {
      toast.error('Desculpe, erro interno do servidor, tente novamente mais tarde');
    } finally {
      setIsPending(false);
    }
  }

  async function handleAvatarSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!avatarFile) {
      toast.dismiss();
      toast.error('Nenhuma imagem selecionada.');
      return;
    }

    const validatedFile = fileSizeValidator(avatarFile, 1);
    if (!validatedFile) {
      toast.error('O Tamanho máximo da imagem deve ser de 1MB');
      setAvatarFile(null);
      return;
    }

    setIsPendingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('avatar', validatedFile);

      const response = await fetch('/api/me/avatar', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        toast.dismiss();
        return fetchErrorHandler(response.status);
      }

      setAvatarFile(null);
      toast.dismiss();
      toast.success('Avatar atualizado com sucesso');
    } catch {
      toast.error('Desculpe, erro interno do servidor, tente novamente mais tarde');
    } finally {
      setIsPendingAvatar(false);
    }
  }

  return (
    <div className='content-max-size'>
      <div className='mb-6 space-y-2'>
        <h1 className='private-page-title'>Configurações do Perfil</h1>
        <p className='private-page-subtitle'>
          Gerencie suas informações pessoais e suas preferencias
        </p>
      </div>

      <div className='form-wrapper'>
        <h1 className='form-title'>Avatar</h1>

        <form className='flex flex-col gap-7 sm:flex-row sm:gap-0' onSubmit={handleAvatarSubmit}>
          <InputImageWithPreview
            id='avatar'
            labelText='Escolha seu avatar'
            placeholderImageUrl={profileData?.avatar ?? '/images/user-placeholder.png'}
            imageMaxSizeInMB={1}
            onFileSelect={setAvatarFile}
            inputProps={{ name: 'avatar' }}
          />

          <div className='flex sm:justify-end sm:items-baseline-last sm:-ml-2'>
            <Button
              type='submit'
              disabled={isPendingAvatar}
              className='w-full sm:w-auto mt-2 sm:mt-0'
            >
              {!isPendingAvatar && 'Salvar Avatar'}
              {isPendingAvatar && <LoadingSpinner />}
            </Button>
          </div>
        </form>
      </div>

      <div className='form-wrapper'>
        <h1 className='form-title'>Editar Perfil</h1>

        <form onSubmit={handleProfileSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-7'>
            <InputText
              id='first_name'
              name='first_name'
              labelText='Nome'
              autoComplete='true'
              maxLength={20}
              defaultValue={profileData?.first_name}
              aria-describedby={
                profileFormErrors?.fieldErrors?.first_name ? 'first_name-error' : undefined
              }
            />

            {profileFormErrors?.fieldErrors?.first_name &&
              profileFormErrors.fieldErrors.first_name.map((val, index) => (
                <p id='first_name-error' className={errorClasses} key={index}>
                  {val}
                </p>
              ))}

            <InputText
              id='last_name'
              name='last_name'
              labelText='Sobrenome'
              maxLength={60}
              defaultValue={profileData?.last_name}
              aria-describedby={
                profileFormErrors?.fieldErrors?.last_name ? 'last_name-error' : undefined
              }
            />

            {profileFormErrors?.fieldErrors?.last_name &&
              profileFormErrors.fieldErrors.last_name.map((val, index) => (
                <p id='last_name-error' className={errorClasses} key={index}>
                  {val}
                </p>
              ))}
          </div>

          <div>
            <InputTextArea
              id='description'
              name='description'
              labelText='Bio'
              placeholder='Conte um pouco sobre você'
              maxLength={400}
              defaultValue={profileData?.description}
              aria-describedby={
                profileFormErrors?.fieldErrors?.description ? 'description-error' : undefined
              }
            />
            {profileFormErrors?.fieldErrors?.description &&
              profileFormErrors.fieldErrors.description.map((val, index) => (
                <p id='description-error' className={errorClasses} key={index}>
                  {val}
                </p>
              ))}
          </div>

          <div>
            <InputText
              id='favorite_recipe'
              name='favorite_recipe'
              labelText='Comida Favorita'
              maxLength={50}
              defaultValue={profileData?.favorite_recipe}
              aria-describedby={
                profileFormErrors?.fieldErrors?.favorite_recipe
                  ? 'favorite_recipe-error'
                  : undefined
              }
            />
            {profileFormErrors?.fieldErrors?.favorite_recipe &&
              profileFormErrors.fieldErrors.favorite_recipe.map((val, index) => (
                <p id='description-error' className={errorClasses} key={index}>
                  {val}
                </p>
              ))}
          </div>

          <InputDate
            id='birth_date'
            name='birth_date'
            labelText='Data de Aniversário'
            min='1920-01-01'
            max={maxDate}
            defaultValue={profileData?.birth_date}
          />

          <Button type='submit' disabled={isPending}>
            {!isPending && 'Salvar'}
            {isPending && <LoadingSpinner />}
          </Button>
        </form>
      </div>
    </div>
  );
}
