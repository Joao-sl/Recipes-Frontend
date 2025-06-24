'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { InputDate } from '../InputDate';
import { InputText } from '../InputText';
import { InputTextArea } from '../InputTextArea';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CloudUploadIcon } from 'lucide-react';
import { Loading } from '../Loading';
import { UserProfileSchema } from '@/validations/user.schema';
import { FormErrors } from '@/validations/formErrorsType';
import { z } from 'zod/v4';
import { fileSizeValidator } from '@/utils/fileSizeValidator';
import { isEqual } from 'lodash';
import { fetchErrorHandler } from '@/utils/fetchErrorsHandler';

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
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [profileFormErrors, setProfileFormErrors] = useState<FormErrors>();
  const [isPending, setIsPending] = useState(false);
  const [isPendingAvatar, setIsPendingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    profileData?.avatar ?? '/images/user-placeholder.png',
  );

  const router = useRouter();
  const errorClasses = clsx('text-sm text-red-600');

  useEffect(() => {
    if (!profileData) {
      toast.error('Desculpe não conseguimos recuperar os dados do seu perfil', {
        ariaLabel: 'Desculpe não conseguimos recuperar os dados do seu perfil',
        role: 'alert',
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
        body: JSON.stringify(dataParsed.data),
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
    const avatar = avatarFile;

    if (!avatar) {
      toast.dismiss();
      toast.error('Nenhuma imagem selecionada.');
      return;
    }

    const validatedFile = fileSizeValidator(avatar, 1);
    if (!validatedFile) {
      toast.error('O Tamanho máximo da imagem deve ser de 1MB');
      setAvatarFile(undefined);
      setAvatarPreview(profileData?.avatar ?? '/images/user-placeholder.png');
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

      toast.dismiss();
      toast.success('Avatar atualizado com sucesso');
    } catch {
      toast.error('Desculpe, erro interno do servidor, tente novamente mais tarde');
    } finally {
      setIsPendingAvatar(false);
    }
  }

  async function handleAvatarPreview(event: React.ChangeEvent<HTMLInputElement>) {
    const avatar = event.target.files?.[0];
    setAvatarFile(avatar);

    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(avatar);
    }
  }

  return (
    <div>
      <div
        className={clsx(
          'flex flex-col items-center px-6 py-2 rounded-lg max-w-md sm:min-w-lg',
          'border border-slate-200 bg-slate-50',
        )}
      >
        <h1 className='font-bold text-3xl text-slate-800 mt-4'>Avatar</h1>

        <form
          className='my-5 border border-slate-300 p-6 rounded-md w-full'
          onSubmit={handleAvatarSubmit}
        >
          <div className={clsx('flex flex-col items-center gap-4', 'sm:gap-6 sm:flex-row')}>
            <div className='h-24 w-24 min-w-24 min-h-24 relative'>
              <Image
                className='rounded-full object-cover z-0 shadow-md'
                src={avatarPreview}
                alt='Seu Avatar'
                priority={true}
                fill
                sizes='138px'
              />
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <p className='text-center'>Enviar um novo avatar (Max 1MB)</p>
              <label
                htmlFor='avatar'
                className={clsx(
                  'flex justify-center text-sm p-2 rounded-full transition',
                  'text-white shadow-md',
                  'sm:items-center sm:justify-center sm:gap-2',
                  isPendingAvatar
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-500 cursor-pointer',
                )}
              >
                <CloudUploadIcon className='hidden sm:block' />
                Enviar Imagem
              </label>
              <input
                type='file'
                accept='image/*'
                id='avatar'
                name='avatar'
                className='hidden'
                onChange={handleAvatarPreview}
                disabled={isPendingAvatar}
              />
            </div>
          </div>

          <div className={clsx('flex justify-center items-center', 'sm:justify-start')}>
            <Button
              variant='defaultDarker'
              type='submit'
              className='mt-6 w-[126px]'
              disabled={isPendingAvatar}
            >
              {!isPendingAvatar && 'Salvar Avatar'}
              {isPendingAvatar && <Loading />}
            </Button>
          </div>
        </form>

        <h1 className='font-bold text-3xl text-slate-800 mt-4'>Editar Perfil</h1>

        <form onSubmit={handleProfileSubmit} className='flex flex-col gap-3 my-4 w-full'>
          <div>
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
          </div>

          <div>
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

          <Button
            variant='defaultDarker'
            size='flex'
            type='submit'
            className='mt-6'
            disabled={isPending}
          >
            {!isPending && 'Salvar'}
            {isPending && <Loading />}
          </Button>
        </form>
      </div>
    </div>
  );
}
