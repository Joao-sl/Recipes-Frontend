'use client';

import { FormErrors } from '@/validations/form-errors-type';
import React, { useState, useRef } from 'react';
import { InputImageWithPreview } from '../InputImageWithPreview';
import { InputText } from '../InputText';
import { SelectInput } from '../SelectInput';
import { InputTextArea } from '../InputTextArea';
import { Button } from '../Button';
import { PlusIcon } from 'lucide-react';
import { LoadingSpinner } from '../Loading';
import { Category, Difficulty, RawRecipe } from '@/lib/recipes/models';

type RecipesFormLayoutProps = {
  initialData?: RawRecipe;
  categoriesData: Category[];
  isPending: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  errors?: FormErrors;
  badRequestErrors?: Record<string, string[]>;
};

export function RecipeFormLayout({
  initialData,
  categoriesData,
  isPending,
  handleSubmit,
  errors,
  badRequestErrors,
}: RecipesFormLayoutProps) {
  const unitiesOptions = [
    { value: 'Porções', label: 'Porções' },
    { value: 'Unidades', label: 'Unidades' },
    { value: 'Pratos', label: 'Pratos' },
    { value: 'Pessoas', label: 'Pessoas' },
    { value: 'Copos', label: 'Copos' },
    { value: 'Fôrmas', label: 'Fôrmas' },
  ];

  const difficultyOptions = [
    { value: 'E', label: 'Fácil' },
    { value: 'M', label: 'Médio' },
    { value: 'H', label: 'Difícil' },
  ];

  const difficultyMap = {
    Fácil: 'E',
    Médio: 'M',
    Difícil: 'H',
  };

  const categoriesOptions = (categoriesData ?? []).map(({ id, category_name }) => ({
    value: id,
    label: category_name,
  }));

  const [ingredients, setIngredients] = useState(
    initialData?.ingredients && initialData?.ingredients?.length > 0
      ? initialData?.ingredients.map((v, i) => ({ id: i, name: v.name, quantity: v.quantity }))
      : [{ id: 0, name: '', quantity: '' }],
  );
  const [steps, setSteps] = useState(
    initialData?.preparation_steps && initialData?.preparation_steps.length > 0
      ? initialData.preparation_steps.map((v, i) => ({ id: i, step: v.step }))
      : [{ id: 1, step: '' }],
  );
  const ingredientId = useRef(99);
  const stepId = useRef(99);

  function addNewIngredient() {
    setIngredients(prev => [...prev, { id: ingredientId.current, name: '', quantity: '' }]);
    ingredientId.current += 1;
  }

  function addNewStep() {
    stepId.current += 1;
    setSteps(prev => [...prev, { id: stepId.current, step: '' }]);
  }

  const errorClasses = 'text-red-500 text-sm';
  return (
    <div className='form-wrapper'>
      {(initialData?.admin_approved || initialData?.public) && (
        <p className='text-secondary font-semibold mb-4'>
          Parabéns e obrigado, sua receita foi aprovada, você não poderá mais a alterar, confira se
          ela já está disponível&nbsp;
          <a href={`/${initialData.slug}`} target='_blank' className='text-base-color'>
            aqui
          </a>
        </p>
      )}
      <h1 className='form-title'>Receita</h1>

      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        {errors && (
          <p className={errorClasses}>
            Há erros no formulário por favor corrija antes de envia-lo.
          </p>
        )}
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
          <label className='label-standard mb-3' htmlFor='cover'>
            Capa da receita (Opcional)
          </label>

          <InputImageWithPreview
            id='cover'
            placeholderImageUrl={initialData?.cover ?? '/images/placeholder-large.jpg'}
            labelText='Envie uma capa para a receita'
            imageMaxSizeInMB={1}
            inputProps={{
              disabled: isPending || initialData?.admin_approved || initialData?.public,
              name: 'cover',
              'aria-disabled': isPending || initialData?.admin_approved || initialData?.public,
            }}
          />
        </div>

        <div>
          <InputText
            id='title'
            name='title'
            labelText='Título'
            aria-describedby={errors?.fieldErrors?.title ? 'title-error' : undefined}
            disabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
            defaultValue={initialData?.title}
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
            disabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
            defaultValue={initialData?.description}
          />
          {errors?.fieldErrors?.description &&
            errors?.fieldErrors?.description.map((value, index) => (
              <p id='description-error' key={index} className={errorClasses}>
                {value}
              </p>
            ))}
        </div>

        <div className='flex flex-col'>
          <h3 className='label-standard'>Dificuldade</h3>
          <SelectInput
            id='difficulty'
            name='difficulty'
            required
            options={difficultyOptions}
            placeholder='Selecione'
            isSearchable={false}
            aria-describedby={errors?.fieldErrors?.difficulty ? 'difficulty-error' : undefined}
            isDisabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
            defaultValue={
              initialData?.difficulty
                ? {
                    value: difficultyMap[initialData.difficulty as Difficulty],
                    label: initialData.difficulty,
                  }
                : ''
            }
          />
          {errors?.fieldErrors?.difficulty &&
            errors?.fieldErrors?.difficulty.map((value, index) => (
              <p id='difficulty-error' key={index} className={errorClasses}>
                {value}
              </p>
            ))}
        </div>

        <div className='flex flex-col'>
          <h3 className='label-standard'>Tempo de preparo</h3>
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
              disabled={isPending || initialData?.admin_approved || initialData?.public}
              aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
              defaultValue={initialData?.preparation_time.split(':')[0]}
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
              disabled={isPending || initialData?.admin_approved || initialData?.public}
              aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
              defaultValue={initialData?.preparation_time.split(':')[1]}
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
          <h3 className='label-standard'>Rendimento</h3>
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
              disabled={isPending || initialData?.admin_approved || initialData?.public}
              aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
              defaultValue={initialData?.servings.split(' ')[0]}
            />

            <SelectInput
              id='servings-unit'
              name='servings-unit'
              required
              options={unitiesOptions}
              placeholder='Selecione'
              isSearchable={false}
              aria-describedby={errors?.fieldErrors?.servings ? 'servings-error' : undefined}
              isDisabled={isPending || initialData?.admin_approved || initialData?.public}
              aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
              defaultValue={
                initialData?.servings
                  ? {
                      value: initialData?.servings.split(' ')[1],
                      label: initialData?.servings.split(' ')[1],
                    }
                  : ''
              }
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
            isDisabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
            defaultValue={initialData?.categories.map(({ id, category_name }) => ({
              value: id,
              label: category_name,
            }))}
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
            disabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
            defaultValue={initialData?.tips}
          />
          {errors?.fieldErrors?.tips &&
            errors?.fieldErrors?.tips.map((value, index) => (
              <p id='tips-error' key={index} className={errorClasses}>
                {value}
              </p>
            ))}
        </div>

        <div className='space-y-4'>
          <h3 className='font-medium text-base-color'>Ingredientes</h3>

          <div>
            {errors?.fieldErrors?.ingredients && (
              <p id='ingredients-error' className={errorClasses}>
                {errors?.fieldErrors?.ingredients[0]}
              </p>
            )}
          </div>

          {ingredients.map(ingredient => (
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]' key={ingredient.id}>
              <InputText
                id={`ingredient-name-${ingredient.id}`}
                name='name'
                labelText='Nome do ingrediente'
                placeholder='Arroz'
                autoComplete='off'
                required
                aria-describedby={errors?.fieldErrors?.tips ? 'ingredients-error' : undefined}
                disabled={isPending || initialData?.admin_approved || initialData?.public}
                aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
                defaultValue={ingredient.name ?? 'Arroz'}
              />
              <InputText
                id={`ingredient-qty-${ingredient.id}`}
                name={'quantity'}
                labelText='Quantidade'
                placeholder='500 Gramas'
                required
                aria-describedby={errors?.fieldErrors?.tips ? 'ingredients-error' : undefined}
                disabled={isPending || initialData?.admin_approved || initialData?.public}
                aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
                defaultValue={ingredient.quantity ?? '500 Gramas'}
              />

              <div className='flex items-end'>
                <Button
                  className='h-[38px]'
                  type='button'
                  size='sm'
                  variant='careful'
                  onClick={() => setIngredients(prev => prev.filter(i => i.id !== ingredient.id))}
                  disabled={
                    ingredients.length === 1 || initialData?.admin_approved || initialData?.public
                  }
                  aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}

          <Button
            size='sm'
            type='button'
            onClick={addNewIngredient}
            title='Adicionar um novo ingrediente'
            aria-label='Adicionar mais um ingrediente'
            disabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
          >
            <PlusIcon strokeWidth={3} /> Adicionar ingrediente
          </Button>
        </div>

        <div className='space-y-4'>
          <h3 className='font-medium text-base-color'>Modo de preparo</h3>

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
                disabled={isPending || initialData?.admin_approved || initialData?.public}
                aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
                defaultValue={step.step}
              />

              <div className='flex justify-end'>
                <Button
                  type='button'
                  size='sm'
                  variant='careful'
                  onClick={() => setSteps(prev => prev.filter(s => s.id !== step.id))}
                  disabled={
                    steps.length === 1 ||
                    isPending ||
                    initialData?.admin_approved ||
                    initialData?.public
                  }
                  aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}

          <Button
            size='sm'
            type='button'
            onClick={addNewStep}
            title='Adicionar um novo passo'
            aria-label='Adicionar um novo passo'
            disabled={isPending || initialData?.admin_approved || initialData?.public}
            aria-disabled={isPending || initialData?.admin_approved || initialData?.public}
          >
            <PlusIcon strokeWidth={3} /> Adicionar passo
          </Button>
        </div>

        <div className='flex flex-col mt-4 w-full'>
          <div className='flex items-center gap-1 text-sm mb-2'>
            <input
              type='checkbox'
              name='terms'
              id='terms'
              disabled={isPending || initialData?.admin_approved || initialData?.public}
            />
            <label className='text-base-color' htmlFor='terms'>
              Confirmo que li e concordo com os&nbsp;
              <a
                aria-label='Link para os termos de uso'
                className='text-primary font-medium hover:underline'
                href='/terms'
                target='_blank'
              >
                termos de uso
              </a>
            </label>
          </div>
          <Button
            type='submit'
            disabled={isPending || initialData?.admin_approved || initialData?.public}
          >
            {isPending ? 'Enviando' : 'Enviar'}
            {isPending ?? <LoadingSpinner color='orange' />}
          </Button>
        </div>
      </form>
    </div>
  );
}
