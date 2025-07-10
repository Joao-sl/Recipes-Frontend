import clsx from 'clsx';

type InputDateProps = {
  id: string;
  labelText: React.ReactNode;
  type?: 'date' | 'datetime-local' | 'month' | 'time';
} & React.ComponentProps<'input'>;

export function InputDate({ id, labelText, type = 'date', ...props }: InputDateProps) {
  return (
    <div className='flex flex-col'>
      {labelText && (
        <label className='label-standard' htmlFor={id}>
          {labelText}
        </label>
      )}

      <input type={type} id={id} {...props} className={clsx('flex', 'input-standard')} />
    </div>
  );
}
