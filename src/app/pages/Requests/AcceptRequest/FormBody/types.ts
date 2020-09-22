import { QuantityUnit } from 'shared/types';
import { TransferAcceptProps } from 'shared/schemas/TransferAccept';

export type ReviewProps = {
  qtyUnit?: QuantityUnit;
  values: Partial<TransferAcceptProps>;
  className?: string;
  onEdit(): void;
};
