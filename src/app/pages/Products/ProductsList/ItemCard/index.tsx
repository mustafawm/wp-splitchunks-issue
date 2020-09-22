import React from 'react';
import { InventoryPrdocut } from 'shared/types';
import Card from 'shared/components/Card';
import Body from './Body';
import DropDown from './Footer';

export default function ProductCard(props: {
  product: InventoryPrdocut;
  onDelete(p: InventoryPrdocut): void;
  province?: string;
}) {
  const { product, onDelete, province } = props;

  return (
    <Card
      name={product?.companyProduct?.name}
      Body={<Body product={product} province={province} />}
      images={product?.companyProduct.images}
      Footer={<DropDown product={product} onDelete={onDelete} />}
    />
  );
}
