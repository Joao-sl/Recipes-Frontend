'use client';

import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import React, { useRef, useState } from 'react';
import { InputTextArea } from '../InputTextArea';
import { InputImageWithPreview } from '../InputImageWithPreview';
import {
  contentMaxSize,
  formTitleClasses,
  formWrapperClasses,
} from '@/utils/styles/privatePageStyles';
import { SelectInput } from '../SelectInput';
import { labelClasses } from '@/utils/styles/inputStyles';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import { handleRecipePayload } from '@/utils/handleRecipeData';
import { RecipeSchema } from '@/validations/recipe.schema';
import { z } from 'zod/v4';
import { FormErrors } from '@/validations/formErrorsType';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../Loading';
import { fetchErrorHandler } from '@/utils/fetchErrorsHandler';

type categoriesType = {
  categoriesData?: [
    {
      id: number;
      category_name: string;
      slug: string;
    },
  ];
};

export function NewRecipeForm({ categoriesData }: categoriesType) {
  const unitiesOptions = [
    { value: 'Porções', label: 'Porções' },
    { value: 'Unidades', label: 'Unidades' },
    { value: 'Pratos', label: 'Pratos' },
    { value: 'Pessoas', label: 'Pessoas' },
    { value: 'Copos', label: 'Copos' },
    { value: 'Fôrmas', label: 'Fôrmas' },
  ];

  const categoriesOptions = categoriesData
    ? categoriesData.map(category => ({
        value: category.id,
        label: category.category_name,
      }))
    : undefined;

  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors>();
  const [badRequestErrors, setBadRequestErrors] = useState<Record<string, string[]>>();
  const [ingredients, setIngredients] = useState([{ id: 0, name: '', quantity: '' }]);
  const [steps, setSteps] = useState([{ id: 1, step: '' }]);
  const ingredientId = useRef(1);
  const stepId = useRef(1);
  const [formKey, setFormKey] = useState(0);

  const addNewIngredient = () => {
    setIngredients(prev => [...prev, { id: ingredientId.current, name: '', quantity: '' }]);
    ingredientId.current += 1;
  };

  const addNewStep = () => {
    stepId.current += 1;
    setSteps(prev => [...prev, { id: stepId.current, step: '' }]);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 400) {
          const err = await response.json();
          setBadRequestErrors(err);
          scroll({ top: 0, behavior: 'smooth' });
        }
        toast.dismiss();
        return fetchErrorHandler(response.status);
      }

      setFormKey(k => k + 1);
      setIngredients([{ id: 0, name: '', quantity: '' }]);
      setSteps([{ id: 1, step: '' }]);
      toast.success('Receita criada com sucesso', { toastId: 'success' });
      scroll({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error('Erro interno do servidor, por favor tente novamente mais tarde', {
        toastId: 'error',
      });
    } finally {
      setIsPending(false);
    }
    return;
  }

  const errorClasses = 'text-red-500 text-sm';
  return (
    <div className={contentMaxSize}>
      <div className={formWrapperClasses}>
        <h1 className={formTitleClasses}>Nova Receita</h1>

        <form key={formKey} className='flex flex-col gap-6' onSubmit={handleSubmit}>
          {badRequestErrors && (
            <div>
              {Object.entries(badRequestErrors).map(([field, messages]) =>
                messages.map((msg, idx) => (
                  <p key={`${field}-${idx}`} className={errorClasses}>
                    {field}: {msg}
                  </p>
                )),
              )}
            </div>
          )}

          <div className='flex flex-col w-auto'>
            <label className={clsx(labelClasses, 'mb-3')} htmlFor='cover'>
              Capa da receita (Opcional)
            </label>

            <InputImageWithPreview
              id='cover'
              labelText='Envie uma capa para a receita'
              placeholderImageUrl='/images/placeholder-large.jpg'
              imageMaxSizeInMB={1}
              inputProps={{ disabled: isPending, name: 'cover' }}
            />
          </div>

          <div>
            <InputText
              id='title'
              name='title'
              labelText='Título'
              aria-describedby={errors?.fieldErrors?.title ? 'title-error' : undefined}
              disabled={isPending}
              aria-disabled={isPending}
            />
            {errors?.fieldErrors?.title &&
              errors?.fieldErrors?.title.map((value, index) => (
                <p id='title-error' key={index} className={errorClasses}>
                  {value}
                </p>
              ))}
          </div>

          <div>
            <InputText
              id='description'
              name='description'
              labelText='Descrição'
              required
              aria-describedby={errors?.fieldErrors?.title ? 'description-error' : undefined}
              disabled={isPending}
              aria-disabled={isPending}
            />
            {errors?.fieldErrors?.description &&
              errors?.fieldErrors?.description.map((value, index) => (
                <p id='description-error' key={index} className={errorClasses}>
                  {value}
                </p>
              ))}
          </div>

          <div className='flex flex-col'>
            <h3 className={labelClasses}>Tempo de preparo</h3>
            <div className='flex gap-2'>
              <InputText
                type='number'
                id='hours'
                name='hours'
                min={0}
                max={99}
                placeholder='Horas'
                aria-label='Horas referente ao tempo de preparo'
                aria-describedby={
                  errors?.fieldErrors?.preparation_time ? 'preparation_time-error' : undefined
                }
                disabled={isPending}
                aria-disabled={isPending}
              />

              <InputText
                type='number'
                id='minutes'
                name='minutes'
                min={1}
                max={99}
                placeholder='Min'
                aria-label='Minutos referente ao tempo de preparo'
                aria-describedby={
                  errors?.fieldErrors?.preparation_time ? 'preparation_time-error' : undefined
                }
                disabled={isPending}
                aria-disabled={isPending}
              />
            </div>
            {errors?.fieldErrors?.preparation_time &&
              errors?.fieldErrors?.preparation_time.map((value, index) => (
                <p id='preparation_time-error' key={index} className={errorClasses}>
                  {value}
                </p>
              ))}
          </div>

          <div className='flex flex-col'>
            <h3 className={labelClasses}>Rendimento</h3>
            <div className='flex gap-2'>
              <InputText
                type='number'
                id='servings'
                name='servings-qty'
                max={999}
                min={1}
                required
                placeholder='Quantidade'
                aria-label='Quantidade em números'
                aria-describedby={errors?.fieldErrors?.servings ? 'servings-error' : undefined}
                disabled={isPending}
                aria-disabled={isPending}
              />

              <SelectInput
                id='servings-unit'
                name='servings-unit'
                required
                options={unitiesOptions}
                placeholder='Selecione'
                isSearchable={false}
                aria-describedby={errors?.fieldErrors?.servings ? 'servings-error' : undefined}
                isDisabled={isPending}
                aria-disabled={isPending}
              />
            </div>
            {errors?.fieldErrors?.servings &&
              errors?.fieldErrors?.servings.map((value, index) => (
                <p id='servings-error' key={index} className={errorClasses}>
                  {value}
                </p>
              ))}
          </div>

          <div>
            <SelectInput
              labelText='Categorias'
              id='categories'
              name='categories'
              options={categoriesOptions}
              placeholder='Selecione'
              isMulti
              noOptionsMessage={() =>
                categoriesOptions
                  ? 'Nada Encontrado 🕸️'
                  : 'Não conseguimos carregar as categorias, mas não se preocupe pode continuar normalmente'
              }
              aria-describedby={errors?.fieldErrors?.categories ? 'categories-error' : undefined}
              isDisabled={isPending}
              aria-disabled={isPending}
            />
            {errors?.fieldErrors?.categories &&
              errors?.fieldErrors?.categories.map((value, index) => (
                <p id='categories-error' key={index} className={errorClasses}>
                  {value}
                </p>
              ))}
          </div>

          <div>
            <InputTextArea
              id='tips'
              name='tips'
              labelText='Dicas (Opcional)'
              placeholder={`- Use alimentos frescos \n- Use uma ...`}
              aria-describedby={errors?.fieldErrors?.tips ? 'tips-error' : undefined}
              disabled={isPending}
              aria-disabled={isPending}
            />
            {errors?.fieldErrors?.tips &&
              errors?.fieldErrors?.tips.map((value, index) => (
                <p id='tips-error' key={index} className={errorClasses}>
                  {value}
                </p>
              ))}
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium'>Ingredientes</h3>

            <div>
              {errors?.fieldErrors?.ingredients && (
                <p id='ingredients-error' className={errorClasses}>
                  {errors?.fieldErrors?.ingredients[0]}
                </p>
              )}
            </div>

            {ingredients.map(ingredient => (
              <div
                className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]'
                key={ingredient.id}
              >
                <InputText
                  id={`ingredient-name-${ingredient.id}`}
                  name='name'
                  labelText='Nome do ingrediente'
                  placeholder='Arroz'
                  autoComplete='false'
                  required
                  aria-describedby={errors?.fieldErrors?.tips ? 'ingredients-error' : undefined}
                  disabled={isPending}
                  aria-disabled={isPending}
                />
                <InputText
                  id={`ingredient-qty-${ingredient.id}`}
                  name={'quantity'}
                  labelText='Quantidade'
                  placeholder='500 Gramas'
                  required
                  aria-describedby={errors?.fieldErrors?.tips ? 'ingredients-error' : undefined}
                  disabled={isPending}
                  aria-disabled={isPending}
                />
                <div className='flex items-end'>
                  <Button
                    className='h-[38px]'
                    type='button'
                    size='sm'
                    variant='careful'
                    onClick={() => setIngredients(prev => prev.filter(i => i.id !== ingredient.id))}
                    disabled={ingredients.length === 1}
                    aria-disabled={isPending}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}

            <Button
              size='sm'
              variant='defaultDarker'
              type='button'
              onClick={addNewIngredient}
              title='Adicionar um novo ingrediente'
              aria-label='Adicionar mais um ingrediente'
              disabled={isPending}
              aria-disabled={isPending}
            >
              <PlusIcon strokeWidth={3} /> Adicionar ingrediente
            </Button>
          </div>

          <div className='space-y-4'>
            <h3 className='font-medium'>Modo de preparo</h3>

            <div>
              {errors?.fieldErrors?.preparation_steps && (
                <p id='preparation_steps-error' className={errorClasses}>
                  {errors?.fieldErrors?.preparation_steps[0]}
                </p>
              )}
            </div>

            {steps.map((step, index) => (
              <div className='flex flex-col gap-2' key={step.id}>
                <InputTextArea
                  key={step.id}
                  id={`step-${step.id}`}
                  name='step'
                  labelText={`Passo ${index + 1}`}
                  placeholder='Comece misturando tudo e ...'
                  required
                  aria-describedby={
                    errors?.fieldErrors?.preparation_steps ? 'preparation_steps-error' : undefined
                  }
                  disabled={isPending}
                  aria-disabled={isPending}
                />

                <div className='flex justify-end'>
                  <Button
                    type='button'
                    size='sm'
                    variant='careful'
                    onClick={() => setSteps(prev => prev.filter(s => s.id !== step.id))}
                    disabled={steps.length === 1 || isPending}
                    aria-disabled={isPending}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}

            <Button
              size='sm'
              variant='defaultDarker'
              type='button'
              onClick={addNewStep}
              title='Adicionar um novo passo'
              aria-label='Adicionar um novo passo'
              disabled={isPending}
              aria-disabled={isPending}
            >
              <PlusIcon strokeWidth={3} /> Adicionar passo
            </Button>
          </div>

          <div className='flex flex-col mt-4 w-full'>
            <div className='flex items-center gap-1 font-medium text-sm mb-1'>
              <input type='checkbox' name='terms' id='terms' />
              <p className='text-slate-800'>Eu li e concordo com os</p>
              <a className='text-orange-600 hover:underline' href='terms' target='_blank'>
                termos de uso
              </a>
            </div>
            <Button type='submit' variant='defaultDarker' disabled={isPending}>
              {isPending ? <LoadingSpinner color='orange' /> : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
