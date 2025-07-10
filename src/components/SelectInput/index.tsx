import Select from 'react-select';
import type { Props } from 'react-select';
import { useId } from 'react';
import clsx from 'clsx';

type SelectInputProps = {
  id: string;
  labelText?: string;
} & Props;

export function SelectInput({ labelText, id, ...props }: SelectInputProps) {
  return (
    <div className='input-wrapper'>
      {labelText && (
        <label className='label-standard' htmlFor={id}>
          {labelText}
        </label>
      )}
      <Select
        inputId={id}
        instanceId={useId()}
        {...props}
        unstyled
        classNames={{
          control: state =>
            clsx(
              'select-input-standard',
              state.isFocused ? 'border-primary' : 'border-root hover:border-slate-300',
              state.isDisabled ? 'bg-disabled' : '',
            ),
          placeholder: () => 'text-gray-500',
          indicatorsContainer: () => clsx('[&_svg]:hover:text-slate-300 text-slate-200'),
          indicatorSeparator: () => clsx('bg-slate-200 mx-2'),
          menu: () => clsx('mt-1 overflow-y-hidden border-standard bg-white rounded-md'),
          menuList: () => 'max-h-60  text-sm text-base',
          option: state =>
            clsx('py-2 px-3', state.isSelected ? 'bg-primary text-inverse' : 'hover:bg-primary/20'),
          multiValue: () =>
            clsx(
              'flex gap-1 items-center justify-center pl-2 bg-slate-200 overflow-hidden rounded-xs',
            ),
          multiValueRemove: () => clsx('py-1.5 px-1 rounded-xs hover:bg-red-400 hover:text-white'),
          valueContainer: () => 'flex gap-1 ',
        }}
        styles={{
          control: base => ({
            ...base,
            transition: 'border-color 0.5s ease-in-out',
          }),
        }}
      />
    </div>
  );
}
