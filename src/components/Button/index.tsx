import clsx from 'clsx';

type ButtonVariants = 'default' | 'defaultDarker' | 'careful' | 'ghost';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  className?: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const common =
    'flex items-center justify-center text-inverse font-medium cursor-pointer rounded-md transition disabled:bg-disabled disabled:text-base disabled:cursor-default';

  const buttonClasses = {
    default: clsx('bg-primary', 'hover:bg-primary/80', common),
    defaultDarker: clsx('bg-secondary', 'hover:bg-secondary/80', common),
    careful: clsx('bg-red-500', 'hover:bg-red-700', common),
    ghost: clsx('bg-slate-400', 'hover:bg-slate-500', common),
  };

  const sizeClasses = {
    sm: clsx('gap-1 text-sm px-3 h-8 [&_svg]:w-4 [&_svg]:h-4'),
    md: clsx('gap-4 text-sm px-4 h-10 [&_svg]:w-5 [&_svg]:h-5'),
    lg: clsx('gap-4 text-md px-5 h-12 [&_svg]:w-6 [&_svg]:h-6'),
  };

  return (
    <button {...props} className={`${buttonClasses[variant]} ${sizeClasses[size]} ${className} `} />
  );
}
