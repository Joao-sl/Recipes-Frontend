import clsx from 'clsx';

export const inputWrapper = clsx('flex flex-col gap-0.5');

export const labelClasses = clsx('text-sm');

export const getInputBgClass = (disabled: boolean | undefined) =>
  clsx(disabled ? 'bg-slate-300' : 'bg-slate-200');

export const inputCommonClasses = clsx(
  'border-2 border-slate-300 outline-none py-1 px-2 w-full rounded-md',
  'placeholder:text-sm',
  'transition duration-500 focus:border-orange-500',
  'disabled:cursor-not-allowed',
);
