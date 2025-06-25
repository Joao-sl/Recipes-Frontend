import { fileSizeValidator } from '@/utils/fileSizeValidator';
import clsx from 'clsx';
import { CloudUploadIcon } from 'lucide-react';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

type InputImageProps = {
  placeholderImageUrl: string;
  imageMaxSizeInMB: number;
  id: string;
  labelText?: string;
  onFileSelect?: (file: File | null) => void;
  inputProps?: React.ComponentProps<'input'>;
  imageProps?: ImageProps;
};

export function InputImageWithPreview({
  placeholderImageUrl,
  imageMaxSizeInMB,
  id,
  labelText,
  inputProps,
  imageProps,
  onFileSelect,
}: InputImageProps) {
  const [filePreview, setFilePreview] = useState(placeholderImageUrl);

  function handleFilePreview(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const validatedFile = fileSizeValidator(file, imageMaxSizeInMB);

    if (!validatedFile) {
      toast.error(`O Tamanho máximo da imagem deve ser de ${imageMaxSizeInMB}MB`, {
        toastId: 'file-size',
      });
      setFilePreview(placeholderImageUrl);
      event.target.value = '';
      onFileSelect?.(null);
      return;
    }

    if (filePreview && filePreview !== placeholderImageUrl) {
      URL.revokeObjectURL(filePreview);
    }

    setFilePreview(URL.createObjectURL(validatedFile));
    onFileSelect?.(validatedFile);
  }

  return (
    <div className={clsx('flex flex-col gap-4 items-center', 'sm:gap-6 sm:flex-row')}>
      <div className='min-w-24 min-h-24 relative'>
        <Image
          className='rounded-full object-cover z-0 shadow-md'
          src={filePreview}
          alt='Imagem enviada por você'
          priority={true}
          fill
          sizes='138px'
          {...imageProps}
        />
      </div>

      <div className='flex flex-col gap-1 w-full items-center sm:items-baseline'>
        {labelText && (
          <p>
            {labelText} (Max {imageMaxSizeInMB}MB)
          </p>
        )}

        <label
          htmlFor={id}
          className={clsx(
            'flex justify-center text-sm p-2 rounded-md transition w-40 h-9',
            'text-white shadow-md',
            'sm:items-center sm:justify-center sm:gap-2',
            inputProps?.disabled
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-500 cursor-pointer',
          )}
        >
          <CloudUploadIcon className='hidden sm:block' />
          Enviar Imagem
        </label>
        <input
          type='file'
          accept='image/*'
          id={id}
          className='hidden'
          onChange={handleFilePreview}
          {...inputProps}
        />
      </div>
    </div>
  );
}
