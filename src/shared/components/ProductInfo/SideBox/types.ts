import { ReactElement } from 'react';
import { InventoryPrdocut, ErrResp } from 'shared/types';

export type InfoBoxProps = {
  inventory?: InventoryPrdocut;
  isLoading: boolean;
  error: ErrResp;
  additionalFields?: {
    name: string;
    value: string | ReactElement;
  }[];
  fields: (
    | 'quality'
    | 'quantity'
    | 'remainingQuantity'
    | 'produceDate'
    | 'availableDate'
  )[];
};
