import { TransferProduct } from 'shared/types';

export type Props = {
  transfer: TransferProduct;
  onCancel(t: TransferProduct): void;
};
