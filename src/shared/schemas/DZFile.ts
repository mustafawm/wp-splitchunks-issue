import * as Yup from 'yup';
import { ErrResp } from 'shared/types';

const DZFileSchema = Yup.object({
  lastModified: Yup.string(),
  name: Yup.string(),
  path: Yup.string(),
  size: Yup.string(),
  type: Yup.string(),
});

export default DZFileSchema;
export type DZFile = {
  lastModified: string;
  name: string;
  path: string;
  size: string;
  type: string;
  fileUri: string;
  error: ErrResp;
  preview: string;
  uploadProgress: number;
};
