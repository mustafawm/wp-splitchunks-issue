import { DZFile } from 'shared/schemas/DZFile';

export function fileExistsAlready(
  currentFiles: DZFile[],
  newFiles: DZFile[],
): boolean {
  return currentFiles.some(curFile =>
    newFiles.some(newFile => newFile.name === curFile.name),
  );
}

/**
 * returns an object with essential keys (name, fileUri)
 * for DropZone component to display thumbnail
 * @param fileUri url string returned from backend
 */
export function generateDZFile(fileUri: string): object {
  if (typeof fileUri !== 'string') {
    return fileUri;
  }
  return {
    name: fileUri,
    fileUri,
  };
}
