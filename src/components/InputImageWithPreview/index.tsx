'use client';

import { fileSizeValidator } from '@/utils/file-size-validator';
import clsx from 'clsx';
import { UploadIcon } from 'lucide-react';
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
    <div className='flex '>
      <div className='min-w-20 min-h-20 max-w-20 max-h-20 relative'>
        <Image
          className='rounded-full object-cover z-0 shadow-md'
          src={filePreview}
          alt='Seu avatar'
          priority={true}
          fill
          sizes='228px'
          {...imageProps}
        />
      </div>

      <div className='flex flex-col ml-6 mt-0.5'>
        {labelText && (
          <p className='text-sm text-muted'>
            {labelText} (Máx. {imageMaxSizeInMB}MB)
          </p>
        )}

        <div className={labelText ? 'flex h-full items-baseline-last' : 'flex h-full items-center'}>
          <label
            htmlFor={id}
            className={clsx(
              'flex gap-4 items-center text-inverse text-sm font-medium px-4 h-10 mt-1 sm:mt-0 rounded-md transition',
              inputProps?.disabled
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/85 cursor-pointer',
            )}
          >
            <UploadIcon size={16} strokeWidth={3} />
            Enviar Imagem
          </label>
        </div>

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
