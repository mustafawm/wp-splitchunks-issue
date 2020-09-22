import { QuantityUnit } from 'shared/types';
import { TransferProps } from 'shared/schemas/Transfer';

export type ReviewProps = {
  qtyUnit?: QuantityUnit;
  values: Partial<TransferProps>;
  className?: string;
  onEdit(): void;
};
