import React from 'react';
import SideBox from './SideBox';
import { Props } from './types';
import { useProduct } from './useApi';

export default function ProductInfo(props: Props) {
  const {
    fields = [],
    additionalFields = [],
    inventory,
    inventoryGuid = '',
    companyGuid = '',
  } = props;
  const { data, isLoading, error } = useProduct(
    companyGuid,
    inventoryGuid,
    inventory,
  );

  return (
    <SideBox
      fields={fields}
      inventory={data}
      isLoading={isLoading}
      error={error}
      additionalFields={additionalFields}
    />
  );
}
