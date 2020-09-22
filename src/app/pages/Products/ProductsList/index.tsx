import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { url, queryKeys } from 'shared/consts';
import { InventoryPrdocut, UserRole } from 'shared/types';
import usePageTitle from 'shared/hooks/usePageTitle';
import { useUserCompanyGuid, useUserRoleIs } from 'shared/providers/auth';
import { Filters } from 'shared/components/FiltersPane/types';
import Button from 'shared/components/Button';
import ItemsGrid from 'shared/components/ItemsGrid';
import useMobileScreen from 'shared/hooks/useMobileScreen';
import {
  filterProducts,
  productsFiltersCount,
} from 'shared/utils/filter/products';
import ItemCard from './ItemCard';
import { useDeleteInventory, useFetchProvinces } from './useApi';

export default function MyProducts() {
  usePageTitle('navigation.products.title');
  const { t } = useTranslation();
  const isFarmer = useUserRoleIs([UserRole.Farmer]);
  const { isMobile, isPortrait } = useMobileScreen();
  const provinces = useFetchProvinces();
  const companyGuid = useUserCompanyGuid();
  const [deleteIt, delResult] = useDeleteInventory(companyGuid);
  const fetchUrl = useMemo(
    () => `${url.api.company.inventory(companyGuid)}?min=1`,
    [companyGuid],
  );

  const addBtnText = !isMobile ? t('products.addProduct') : '+';
  const addBtnClass = classNames(
    'z-10 fixed bottom-0 right-0 mr-2 rounded-full',
    isPortrait ? 'mb-16' : 'mb-16 sm:mb-5',
    'md:relative md:mb-0 md:w-full md:rounded-sm md:flex md:justify-start',
  );
  const addProductUrl = `${url.web.products}/${
    isFarmer ? 'add' : 'creationtype'
  }`;

  return (
    <div>
      <span className={addBtnClass}>
        <Button
          color="orange"
          text={addBtnText}
          href={{ to: addProductUrl }}
          className="uppercase px-5 md:px-2 py-4 md:py-2 md:w-1/5 shadow-md text-lg md:text-sm rounded-full md:rounded-sm md:mb-1"
          dataTestid="add-prod"
        />
      </span>
      <ItemsGrid<InventoryPrdocut>
        fetchUrl={fetchUrl}
        delResult={delResult}
        filterItems={filterProducts}
        countFilters={productsFiltersCount}
        queryKey={queryKeys.inventories(companyGuid)}
        filterNames={[Filters.product, Filters.category, Filters.quality]}
      >
        {(products = []) =>
          products.map(product => (
            <ItemCard
              key={product?.companyInventoryGuid}
              product={product}
              onDelete={deleteIt}
              province={
                provinces.find(p => p.value == product?.companyLocation?.area)
                  ?.label
              }
            />
          ))
        }
      </ItemsGrid>
    </div>
  );
}
