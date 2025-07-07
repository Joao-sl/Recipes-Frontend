import clsx from 'clsx';

export const inputWrapper = clsx('flex flex-col');
export const labelClasses = clsx('text-sm text-gray-700 font-medium');
export const inputCommonClasses = clsx(
  'text-sm py-2 px-3 mt-2 border border-slate-200 rounded-md outline-none transition duration-500',
  'placeholder:text-sm focus:border-orange-400 hover:border-slate-300 disabled:bg-slate-200',
);
export const selectInputClasses = clsx('text-sm py-2 px-3 mt-2 border rounded-md outline-none');
