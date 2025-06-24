import {
  getInputBgClass,
  inputCommonClasses,
  inputWrapper,
  labelClasses,
} from '@/utils/styles/inputStyles';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

type InputTextProps = {
  id: string;
  labelText?: React.ReactNode;
  Icon?: LucideIcon | false;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', id, Icon = false, ...props }: InputTextProps) {
  const iconInputClasses = clsx(
    'border-2 border-slate-300 transition duration-500',
    getInputBgClass(props.disabled),
  );

  return (
    <div className={inputWrapper}>
      {labelText && (
        <label className={labelClasses} htmlFor={id}>
          {labelText}
        </label>
      )}

      {Icon ? (
        <div
          className={clsx(
            iconInputClasses,
            'flex items-center gap-1 pl-2 rounded-md',
            'focus-within:border-orange-500',
          )}
        >
          <label className='' htmlFor={id}>
            {<Icon size={18} color='#475569' />}
          </label>

          <input
            id={id}
            {...props}
            className={clsx(
              'outline-none py-1 w-full',
              'placeholder:text-sm',
              'disabled:cursor-not-allowed',
            )}
          />
        </div>
      ) : (
        <input
          className={clsx(inputCommonClasses, getInputBgClass(props.disabled))}
          {...props}
          id={id}
        />
      )}
    </div>
  );
}
