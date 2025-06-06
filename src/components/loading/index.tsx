import clsx from 'clsx';

type LoaderProps = {
  className?: string;
};

export function Loading({ className = '' }: LoaderProps) {
  const classes = clsx('flex', 'justify-center', 'items-center');
  const common = clsx('absolute', 'inset-0', 'border-4', 'rounded-full');

  return (
    <div className={classes}>
      <div className={clsx('relative min-h-5 min-w-5 rounded-full', className)}>
        <div className={`${common} border-slate-300'`}></div>
        <div className={`${common} border-t-orange-500 border-transparent animate-spin`}></div>
      </div>
    </div>
  );
}
