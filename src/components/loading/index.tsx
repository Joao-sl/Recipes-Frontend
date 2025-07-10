import clsx from 'clsx';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'orange' | 'gray';
};

const spinnerSizeMap = {
  sm: clsx('spinner-base w-5 h-5 [--spinner-width:4px]'),
  md: clsx('spinner-base w-8 h-8 [--spinner-width:6px]'),
  lg: clsx('spinner-base w-11 h-11 [--spinner-width:8px]'),
};

const spinnerColorMap = {
  white: 'text-inverse',
  orange: 'text-primary',
  gray: 'text-slate-500',
};

export function LoadingSpinner({ size = 'sm', color = 'white' }: LoaderProps) {
  return (
    <div
      className={clsx(
        spinnerSizeMap[size],
        spinnerColorMap[color],
        'flex rounded-full animate-spin',
      )}
    />
  );
}
