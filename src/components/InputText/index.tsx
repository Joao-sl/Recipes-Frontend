import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

type InputTextProps = {
  id: string;
  labelText?: string;
  Icon?: LucideIcon | false;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', id, Icon = false, ...props }: InputTextProps) {
  const commonClassesInput = 'border-2 border-slate-300 bg-slate-200 transition duration-500';

  return (
    <div className='flex flex-col gap-1'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}

      {(Icon && (
        <div
          className={clsx(
            commonClassesInput,
            'flex items-center gap-1 pl-2 rounded-md',
            'focus-within:border-orange-400',
            'bg-orange-400',
          )}
        >
          <label htmlFor={id}>{<Icon size={18} color='#475569' />}</label>

          <input
            id={id}
            {...props}
            className={clsx('outline-none py-1 w-full', 'placeholder:text-sm')}
          />
        </div>
      )) || (
        <input
          className={clsx(
            commonClassesInput,
            'outline-none py-1 px-2 w-full rounded-md',
            'placeholder:text-sm',
            'focus:border-orange-400',
          )}
          {...props}
          id={id}
        />
      )}
    </div>
  );
}
