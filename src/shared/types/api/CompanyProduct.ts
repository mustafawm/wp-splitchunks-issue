import { CompanyProductProps } from 'shared/schemas/CompanyProduct';
import { CommonProduct } from './CommonProduct';

export type CompanyProduct = Omit<
  CompanyProductProps,
  'commonProductGuid' | 'categories'
> & {
  commonProduct: CommonProduct;
  categories: { name: string; guid: string }[];
  guid: string;
};
