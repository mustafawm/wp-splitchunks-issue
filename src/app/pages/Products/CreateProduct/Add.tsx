import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductForm from 'app/pages/Products/components/ProductForm';

export default function AddProduct() {
  const { t } = useTranslation();

  return <ProductForm title={t('products.newProduct')} />;
}
