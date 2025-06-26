import { inputCommonClasses, inputWrapper, labelClasses } from '@/utils/styles/inputStyles';
import clsx from 'clsx';

type InputTextAreaProps = {
  id: string;
  labelText?: React.ReactNode;
} & React.ComponentProps<'textarea'>;

export function InputTextArea({ id, labelText, ...props }: InputTextAreaProps) {
  return (
    <div className={inputWrapper}>
      {labelText && (
        <label className={labelClasses} htmlFor={id}>
          {labelText}
        </label>
      )}

      <textarea id={id} {...props} className={clsx(inputCommonClasses, 'min-h-27')}></textarea>
    </div>
  );
}
