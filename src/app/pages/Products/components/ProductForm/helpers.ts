import { initialValues } from './consts';

export function extractFormRelatedFields(
  obj: typeof initialValues,
): typeof initialValues {
  if (!obj) {
    return obj;
  }
  return {
    ...initialValues,
    companyInventoryGuid: obj.companyInventoryGuid || null,
    quantity: String(obj.quantity),
    quantityUnit: obj.quantityUnit,
    companyLocationGuid: obj.companyLocationGuid || obj?.companyLocation?.guid,
    companyProduct: {
      name: obj.companyProduct.name,
      description: obj.companyProduct.description,
      produceDate: obj.companyProduct.produceDate,
      availabilityDate: obj.companyProduct.availabilityDate,
      qualityCode: obj.companyProduct.qualityCode,
      commonProductGuid:
        obj?.companyProduct?.commonProductGuid ||
        obj?.companyProduct?.commonProduct?.guid,
      images: obj.companyProduct.images,
      categories: obj.companyProduct.categories.map(cat => cat.guid),
    },
  };
}
