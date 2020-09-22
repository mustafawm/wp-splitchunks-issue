import { InfoBoxProps } from './SideBox/types';

export type Props = Omit<InfoBoxProps, 'inventory' | 'isLoading' | 'error'> & {
  inventoryGuid?: string;
  companyGuid?: string;
  onClose?(): void;
  inventory?: InfoBoxProps['inventory'];
  isLoading?: InfoBoxProps['isLoading'];
  error?: InfoBoxProps['error'];
};
