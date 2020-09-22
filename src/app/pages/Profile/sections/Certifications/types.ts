import { CertificateProps } from 'shared/schemas/Certificate';
import { FormProps as MainFormProps } from 'shared/components/Form/types';

export type FormProps = Omit<MainFormProps, 'children' | 'initialValues'> & {
  data?: CertificateProps;
  isDeleting?: boolean;
  onDelete?(guid: string): void;
};

export type DeleteFormProps = {
  isDeleting: boolean;
  onDelete(): void;
};
