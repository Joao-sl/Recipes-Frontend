import clsx from 'clsx';

export const inputWrapper = clsx('flex flex-col');
export const labelClasses = clsx('text-sm text-gray-700 font-medium');
export const inputCommonClasses = clsx(
  'text-sm py-2 px-3 mt-3 border border-slate-200 rounded-md outline-none transition duration-500',
  'focus:border-orange-400 disabled:bg-slate-200 placeholder:text-sm',
);
