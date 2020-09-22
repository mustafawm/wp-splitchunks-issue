/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { Option } from 'shared/types';
import { ProductProps } from 'shared/schemas/Product';
import Button from 'shared/components/Button';
import SourceProduct from './SourceProduct';
import { initialValues } from '../consts';
import { useFetchSourceProducts } from './useApi';

export default function SourceProductFieldsContainer(props: {
  companyGuid: string;
}) {
  const { companyGuid } = props;
  const { t } = useTranslation();
  const { values } = useFormikContext<ProductProps>();
  const { options, data, isLoading, error } = useFetchSourceProducts(
    companyGuid,
  );

  const getAvailableSources = useCallback(
    (sourceIndex = 0): Option[] => {
      if (sourceIndex === 0) {
        return options;
      }
      const selectedGuids = values.materialInventories
        .map(item => item.guid)
        .splice(0, sourceIndex);

      return options.filter(opt => !selectedGuids.includes(opt.value));
    },
    [values.materialInventories.length, options.length],
  );

  const getProductDetails = useCallback(
    guid => {
      return data.find(product => product.companyInventoryGuid === guid);
    },
    [data.length, isLoading],
  );

  const lastSource =
    values.materialInventories[values.materialInventories.length - 1];
  const disableRemove = values.materialInventories.length === 1;
  const showAddBtn = ![1, values.materialInventories.length].includes(
    options.length,
  );

  if (error) {
    return <div className="utl-error">{error.message}</div>;
  }
  return (
    <FieldArray
      name="materialInventories"
      render={arrayHelpers => (
        <div className="">
          {values.materialInventories.map((prod, idx) => (
            <div key={prod.guid} className="flex w-full">
              <SourceProduct
                key={`${prod.guid}-${idx}`}
                idx={idx}
                inventory={getProductDetails(prod.guid)}
                onRemove={() => arrayHelpers.remove(idx)}
                sourcesList={getAvailableSources(idx)}
                isLoadingList={isLoading}
                disableRemove={disableRemove}
              />
            </div>
          ))}
          {showAddBtn && (
            <Button
              color="white"
              onClick={() =>
                arrayHelpers.push(initialValues.materialInventories[0])
              }
              disabled={!(lastSource?.guid && lastSource.usedQuantity)}
              text={`+ ${t('products.addSourceProduct')}`}
              className="text-green-600 border border-green-600 my-2"
              data-testid="add-src-prod"
            />
          )}
        </div>
      )}
    />
  );
}
