'use client';

import React, { useState } from 'react';
import { handleRecipePayload } from '@/utils/handle-recipe-data';
import { RecipeSchema } from '@/validations/recipe-schema';
import { z } from 'zod/v4';
import { FormErrors } from '@/validations/form-errors-type';
import { toast } from 'react-toastify';
import { fetchErrorHandler } from '@/utils/fetch-errors-handler';
import { Category } from '@/lib/recipes/models';
import { RecipeFormLayout } from '../RecipesFormLayout';
import { useRouter } from 'next/navigation';

type NewRecipeFormProps = {
  categoriesData: Category[];
};

export function NewRecipeForm({ categoriesData }: NewRecipeFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>();
  const [badRequestErrors, setBadRequestErrors] = useState<Record<string, string[]>>();

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newForm = new FormData(event.currentTarget);
    const data = handleRecipePayload(newForm);

    if (!newForm.get('terms'))
      return toast.warning('Aceite os termos para prosseguir', { toastId: 'terms' });
    const validatedData = RecipeSchema.safeParse(data);

    if (!validatedData.success) {
      const errors = z.flattenError(validatedData.error);
      setErrors(errors);
      toast.warn('Há erros no formulário corrija antes de envia-lo', { toastId: 'form-errors' });
      return;
    }
    setBadRequestErrors(undefined);
    setErrors(undefined);
    setIsPending(true);

    try {
      const { cover, ...dataWithoutCover } = validatedData.data;
      const data = new Blob([JSON.stringify(dataWithoutCover)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('data', data);
      if (cover) formData.append('cover', cover);

      const response = await fetch('/api/recipes/user-recipes/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 400) {
          setBadRequestErrors(await response.json());
          scroll({ top: 0, behavior: 'smooth' });
        }
        toast.dismiss();
        return fetchErrorHandler(response.status);
      }

      toast.dismiss();
      toast.success('Receita criada com sucesso', { toastId: 'success' });
      router.push('/my-recipes');
    } catch {
      toast.error('Erro interno do servidor, por favor tente novamente mais tarde', {
        toastId: 'error',
      });
    } finally {
      setIsPending(false);
    }
    return;
  }
  return (
    <div className='content-max-size'>
      <div className='mb-6 space-y-2'>
        <h1 className='private-page-title'>Criar Receita</h1>
        <p className='private-page-subtitle'>
          Antes de ser postada, sua receita será avaliada por um administrador.
        </p>
        <RecipeFormLayout
          categoriesData={categoriesData}
          isPending={isPending}
          handleSubmit={handleCreate}
          errors={errors}
          badRequestErrors={badRequestErrors}
        />
      </div>
    </div>
  );
}
