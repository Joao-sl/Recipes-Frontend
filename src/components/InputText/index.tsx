import clsx from 'clsx';
import { inputCommonClasses, inputWrapper, labelClasses } from '@/utils/styles/inputStyles';
import type { LucideIcon } from 'lucide-react';

type InputTextProps = {
  id: string;
  labelText?: React.ReactNode;
  Icon?: LucideIcon | false;
  className?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText, id, Icon = false, className, ...props }: InputTextProps) {
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
            inputCommonClasses,
            'flex items-center gap-3',
            'focus-within:border-orange-500',
            props.disabled ? 'bg-slate-200' : '',
          )}
        >
          <label className='' htmlFor={id}>
            {<Icon size={18} color='#475569' />}
          </label>

          <input
            id={id}
            {...props}
            className={clsx('outline-none w-full', 'disabled:cursor-not-allowed')}
          />
        </div>
      ) : (
        <input className={clsx(inputCommonClasses, className)} {...props} id={id} />
      )}
    </div>
  );
}
