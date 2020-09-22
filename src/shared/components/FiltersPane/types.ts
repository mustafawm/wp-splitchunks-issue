export enum Filters {
  status = 'status',
  facility = 'facility',
  product = 'product',
  category = 'category',
  quality = 'quality',
}

export type FiltersPaneProps = {
  selected: string[];
  onChange(s: string | null): void;
  className?: string;
  filterNames: Filters[];
  filtersCount: Record<string, Record<string, number>>;
};
