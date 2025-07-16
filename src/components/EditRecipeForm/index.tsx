'use client';

import { Category, RawRecipe } from '@/lib/recipes/models';
import { RecipeFormLayout } from '../RecipesFormLayout';
import { useState } from 'react';
import { handleRecipePayload } from '@/utils/handleRecipeData';
import { toast } from 'react-toastify';
import { RecipeSchema } from '@/validations/recipe.schema';
import { z } from 'zod/v4';
import { FormErrors } from '@/validations/formErrorsType';
import { useParams, useRouter } from 'next/navigation';
import { fetchErrorHandler } from '@/utils/fetchErrorsHandler';

type EditRecipeFormProps = {
  initialData: RawRecipe;
  categoriesData: Category[];
};

export function EditRecipeForm({ initialData, categoriesData }: EditRecipeFormProps) {
  const path = useParams();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>();
  const [badRequestErrors, setBadRequestErrors] = useState<Record<string, string[]>>();

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (initialData.admin_approved || initialData.public) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    if (!formData.get('terms'))
      return toast.warning('Aceite os termos para prosseguir', { toastId: 'terms' });

    const data = handleRecipePayload(formData);
    const validatedData = RecipeSchema.safeParse(data);

    if (!validatedData.success) {
      const errors = z.flattenError(validatedData.error);
      setErrors(errors);
      window.scroll({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsPending(true);
    setErrors(undefined);
    try {
      const { cover, ...dataWithoutCover } = validatedData.data;
      const data = new Blob([JSON.stringify(dataWithoutCover)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('data', data);
      if (cover) formData.append('cover', cover);

      const response = await fetch(`/api/recipe/${path.slug}`, {
        method: 'PATCH',
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
      toast.success('Receita atualizada com sucesso.');
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
        <h1 className='private-page-title'>Editar Receita</h1>
        <p className='private-page-subtitle'>
          Antes de ser postada, sua receita será avaliada por um administrador.
        </p>
        <RecipeFormLayout
          initialData={initialData}
          categoriesData={categoriesData}
          isPending={isPending}
          handleSubmit={handleUpdate}
          errors={errors}
          badRequestErrors={badRequestErrors}
        />
      </div>
    </div>
  );
}
