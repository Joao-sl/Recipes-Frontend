export function fileSizeValidator(file: File, maxSize: number): File | null {
  const maxSizeInKB = maxSize * 1024;
  const fileInKB = Math.floor(file.size / 1024);

  if (fileInKB > maxSizeInKB) {
    return null;
  }
  return file;
}
