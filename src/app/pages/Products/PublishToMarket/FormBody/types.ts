import { QuantityUnit } from 'shared/types';
import { PublishProps } from 'shared/schemas/Publish';

export type ReviewProps = {
  qtyUnit?: QuantityUnit;
  values: Partial<PublishProps>;
  className?: string;
  onEdit(): void;
};
