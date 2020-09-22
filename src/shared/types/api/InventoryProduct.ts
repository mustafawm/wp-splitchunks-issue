import { CompanyProduct } from './CompanyProduct';
import { CompanyLocation } from './CompanyLocation';
import { QuantityUnit } from './QuantityUnit.enum';

export type InventoryPrdocut = {
  originalQuantity: string;
  quantity: string;
  isLocked: boolean;
  companyInventoryGuid: string;
  createdDateTimeOffset: string;
  updatedDateTimeOffset: string;
  quantityUnit: QuantityUnit;
  companyLocation: CompanyLocation;
  companyProduct: CompanyProduct;
};
