import { DropzoneOptions } from 'react-dropzone';
import { DZFile } from 'shared/schemas/DZFile';

export type DropzoneProps = DropzoneOptions & {
  placeholder: string;
  onFilesDrop(f: DZFile[]): void;
  onFileRemove(f: DZFile): void;
  acceptedFiletypes: string[];
  files?: DZFile[];
  className?: string;
};
