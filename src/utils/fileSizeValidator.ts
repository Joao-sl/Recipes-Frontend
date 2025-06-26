export function fileSizeValidator(file: File | null | undefined, maxSize: number): File | null {
  const maxSizeInKB = maxSize * 1024;

  if (!file) return null;

  const fileInKB = Math.floor(file.size / 1024);

  if (fileInKB > maxSizeInKB) {
    return null;
  }
  return file;
}
