import { ProductProps } from 'shared/schemas/Product';

export const initialValues: Omit<ProductProps, 'companyInventoryGuid'> & {
  companyInventoryGuid: string | null;
} = {
  companyInventoryGuid: null,
  quantity: '',
  quantityUnit: '',
  companyLocationGuid: '',
  companyProduct: {
    name: '',
    description: '',
    produceDate: '',
    availabilityDate: '',
    qualityCode: '',
    commonProductGuid: '',
    images: [],
    categories: [],
  },
  materialInventories: [
    {
      guid: '',
      usedQuantity: '',
      wasteQuantity: '0',
      comment: '',
    },
  ],
};
