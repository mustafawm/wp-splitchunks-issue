import { InfoBoxProps } from '../SideBox/types';
import { InventoryPrdocut } from 'shared/types';

export type DetailsModalProps = Omit<
  InfoBoxProps,
  'fields' | 'additionalFields' | 'inventory'
> & {
  onClose?(): void;
  inventory?: InventoryPrdocut;
  inventoryGuid?: string;
  companyGuid?: string;
};
