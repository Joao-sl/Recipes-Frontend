type FetchErrorPros = {
  message?: string;
  statusCode?: number;
};

export function FetchError({ message, statusCode }: FetchErrorPros) {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <p className='border-r-1 border-r-slate-600  mr-4 px-6 text-2xl/[49px] font-bold'>
        {statusCode || '503'}
      </p>
      <p className='text-sm font-normal/[49px] m-0 max-w-97'>
        {message ||
          'Desculpe não conseguimos carregar a página por um erro interno, tente novamente mais tarde.'}
      </p>
    </div>
  );
}
