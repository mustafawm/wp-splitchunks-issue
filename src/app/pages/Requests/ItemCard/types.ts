import { TransferProduct } from 'shared/types';

export type Props = {
  transfer: TransferProduct;
  onDiscard(t: TransferProduct): void;
};

export type CurrentModal = 'reject' | 'details' | '';
