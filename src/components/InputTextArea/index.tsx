import clsx from 'clsx';

type InputTextAreaProps = {
  id: string;
  labelText?: React.ReactNode;
} & React.ComponentProps<'textarea'>;

export function InputTextArea({ id, labelText, ...props }: InputTextAreaProps) {
  return (
    <div className='input-wrapper'>
      {labelText && (
        <label className='label-standard' htmlFor={id}>
          {labelText}
        </label>
      )}

      <textarea id={id} {...props} className={clsx('input-standard', 'min-h-27')}></textarea>
    </div>
  );
}
