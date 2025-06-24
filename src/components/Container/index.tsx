type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className='px-4 my-6'>
      <div className='max-w-[1380px] mx-auto rounded'>{children}</div>
    </div>
  );
}
