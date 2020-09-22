import { InventoryPrdocut } from 'shared/types';
import { Filters } from 'shared/components/FiltersPane/types';

export function filterProducts(
  products: InventoryPrdocut[],
  filters: string[],
): InventoryPrdocut[] {
  if (!filters.length) {
    return products;
  }
  return products.filter(
    p =>
      filters.includes(p?.companyProduct?.qualityCode) ||
      filters.includes(p?.companyProduct?.commonProduct.guid) ||
      p?.companyProduct?.categories.some(cat => filters.includes(cat.guid)),
  );
}

export function productsFiltersCount(
  products: InventoryPrdocut[] = [],
): Record<
  Exclude<Filters, Filters.status | Filters.facility>,
  Record<string, number>
> {
  const initResult: Record<
    Filters.product | Filters.category | Filters.quality,
    Record<string, number>
  > = {
    [Filters.product]: {},
    [Filters.category]: {},
    [Filters.quality]: {},
  };

  return products.reduce((acc, cur: InventoryPrdocut) => {
    const pProduct = cur?.companyProduct?.commonProduct?.guid;
    const pCategories = cur?.companyProduct?.categories.map(cat => cat.guid);
    const pQuality = cur?.companyProduct?.qualityCode;

    acc.product[pProduct] =
      pProduct in acc.product ? acc.product[pProduct] + 1 : 1;
    acc.quality[pQuality] =
      pQuality in acc.quality ? acc.quality[pQuality] + 1 : 1;
    pCategories.forEach((tCat: string) => {
      acc.category[tCat] = tCat in acc.category ? acc.category[tCat] + 1 : 1;
    });

    return acc;
  }, initResult);
}
