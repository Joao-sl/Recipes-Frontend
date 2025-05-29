import clsx from 'clsx';

type LoaderProps = {
  className?: string;
};

export function Loading({ className = '' }: LoaderProps) {
  const classes = clsx('flex', 'justify-center', 'items-center', className);
  const common = clsx('absolute', 'inset-0', 'border-4', 'rounded-full');

  return (
    <div className={classes}>
      <div className='relative w-7 h-7 rounded-full'>
        <div className={`${common} border-slate-300'`}></div>
        <div className={`${common} border-t-amber-500 border-transparent animate-spin`}></div>
      </div>
    </div>
  );
}
