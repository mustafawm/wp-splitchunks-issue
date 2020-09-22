import { ReactElement } from 'react';

export type Props = {
  onClose?(): void;
  showCloseBtn?: boolean;
  children: ReactElement | ReactElement[];
  wrapperClass?: string;
  childClass?: string;
};
