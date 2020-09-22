import { FormikValues } from 'formik';
import { FarmProps } from 'shared/schemas/Farm';

export type LocationForm = {
  farmLoc?: FarmProps;
  onSubmit(data: FormikValues): void;
  onDelete?(guid?: string): void;
  isDeleting?: boolean;
  onCancel?(): void;
};

export type LocationList = {
  locs: FarmProps[];
  isDeleting: boolean;
  onDelete(guid: string): void;
  onSubmit(data: FarmProps): void;
};

export type DeleteLocProps = {
  isDeleting: boolean;
  onDelete(): void;
};
