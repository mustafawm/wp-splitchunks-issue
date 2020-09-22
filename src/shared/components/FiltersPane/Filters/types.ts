import { Filters } from '../types';

export { Filters };

export type ContainerProps = {
  className?: string;
  selected: string[];
  onChange(s: string | null): void;
  filterNames: Filters[];
  filtersCount: Record<string, Record<string, number>>;
};

export type FilterProps = {
  isMobile: boolean;
  filterCount: Record<string, number>;
  onLabelClick(f: Filters): void;
  mobileActiveFilter: Filters;
  selected: string[];
  onChange(s: string): void;
};
