import { Option, ErrResp } from 'shared/types';
import { Props as ButtonsGroupProps } from 'shared/components/ButtonsGroup/types';
import { Filters } from '../types';

export { Filters };

export type FiltersGroupProps = Omit<ButtonsGroupProps, 'options'> & {
  onLabelClick(f: Filters): void;
  mobileActiveFilter: Filters | null;
  filterName: Filters;
  options: Option[];
  isLoading: boolean;
  isMobile: boolean;
  error: ErrResp | null;
  filterCount: Record<string, number>;
};

export type LabelProps = {
  isMobile: boolean;
  onClick(): void;
  text: string;
  // 👇mobile UI
  isOpen: boolean;
  containsSelected: boolean;
};
