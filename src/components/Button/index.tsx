import clsx from 'clsx';

type ButtonVariants = 'default' | 'careful' | 'ghost';
type ButtonSizes = 'flex' | 'sm' | 'md' | 'lg';

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
    'flex gap-1 items-center cursor-pointer rounded-md text-white transition duration-600';

  const buttonClasses = {
    default: clsx('bg-orange-400', 'hover:bg-orange-400/80', common),
    careful: clsx('bg-red-500', 'hover:bg-red-700', common),
    ghost: clsx('bg-slate-400', 'hover:bg-slate-500', common),
  };

  const sizeClasses = {
    flex: clsx('w-full justify-center py-2 [&_svg]:w-5 [&_svg]:h-5'),
    sm: clsx('p-1.5 text-sm [&_svg]:w-4 [&_svg]:h-4'),
    md: clsx('px-4 py-1.5 [&_svg]:w-5 [&_svg]:h-5'),
    lg: clsx('px-5 py-2 text-lg [&_svg]:w-6 [&_svg]:h-6'),
  };

  return (
    <button {...props} className={`${buttonClasses[variant]} ${sizeClasses[size]} ${className} `} />
  );
}
