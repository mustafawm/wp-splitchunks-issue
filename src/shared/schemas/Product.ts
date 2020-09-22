import * as Yup from 'yup';
import CompanyProduct, { CompanyProductProps } from './CompanyProduct';
import { isDecimal } from 'shared/utils/number';

const ProductSchema = Yup.object({
  companyInventoryGuid: Yup.string().nullable(),
  quantity: Yup.number()
    .required('validation.required')
    .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
    .typeError('validation.mustBeNumber')
    .moreThan(0, 'validation.mustBeMoreThan0'),
  quantityUnit: Yup.string().required('validation.required'),
  companyLocationGuid: Yup.string().required('validation.required'),
  companyProduct: CompanyProduct,
});

export default ProductSchema;
export const CombineProductSchema = ProductSchema.shape({
  materialInventories: Yup.array().of(
    Yup.object({
      guid: Yup.string().required('validation.required'),
      usedQuantity: Yup.number()
        .required('validation.required')
        .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
        .typeError('validation.mustBeNumber')
        .moreThan(0, 'validation.mustBeMoreThan0'),
      wasteQuantity: Yup.number()
        .required('validation.required')
        .test('is-decimal', 'validation.mustBeDecimal', isDecimal)
        .typeError('validation.mustBeNumber')
        .default('0'),
      comment: Yup.string().nullable(),
    }),
  ),
});
export type ProductProps = {
  companyInventoryGuid: string;
  quantity: string;
  quantityUnit: string;
  companyLocationGuid: string;
  companyProduct: CompanyProductProps;
  materialInventories: {
    guid: string;
    usedQuantity: string;
    wasteQuantity: string;
    comment?: string;
  }[];
};
