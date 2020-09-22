import React from 'react';
import ProductDetailsModal from './index';
import { Props } from '../types';
import { useProduct } from '../useApi';

export default function DetailsModalWrapper(props: Partial<Props>) {
  const { inventory, inventoryGuid = '', companyGuid = '', onClose } = props;

  const { data, isLoading, error } = useProduct(
    companyGuid,
    inventoryGuid,
    inventory,
  );

  return (
    <ProductDetailsModal
      inventory={data}
      onClose={onClose}
      error={error}
      isLoading={isLoading}
    />
  );
}
