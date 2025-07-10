import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

type InputTextProps = {
  id: string;
  labelText?: React.ReactNode;
  Icon?: LucideIcon | false;
  className?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText, id, Icon = false, className, ...props }: InputTextProps) {
  return (
    <div className='input-wrapper'>
      {labelText && (
        <label className='label-standard' htmlFor={id}>
          {labelText}
        </label>
      )}

      {Icon ? (
        <div
          className={clsx(
            'input-standard',
            'flex items-center gap-3',
            'focus-within:border-primary',
            'focus-within:hover:border-primary',
            props.disabled ? 'bg-disabled' : '',
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
        <input className={clsx('input-standard', className)} {...props} id={id} />
      )}
    </div>
  );
}
