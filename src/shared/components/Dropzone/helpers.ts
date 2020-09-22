import { DZFile } from 'shared/schemas/DZFile';

/**
 * Filters out files that do not have the following props:
 * name, size, type, lastModified
 * @param files
 */
export function filterOutInvalidFiles(files: DZFile[]): DZFile[] {
  return files.filter(f => f.lastModified && f.name && f.size && f.type);
}

export function removeDuplicates(
  currentFiles: DZFile[],
  newFiles: DZFile[],
): DZFile[] {
  const uniqueFiles = [
    ...newFiles,
    ...currentFiles.filter(
      curFile => !newFiles.some(newFile => newFile.name === curFile.name),
    ),
  ];

  return filterOutInvalidFiles(uniqueFiles);
}
