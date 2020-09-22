import React from 'react';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { initialValues } from 'app/pages/Products/components/ProductForm/consts';
import ProductForm from 'app/pages/Products/components/ProductForm';

export default function EditProduct() {
  const { state } = useLocation() as Location<{
    product: typeof initialValues;
  }>;
  const { t } = useTranslation();

  return (
    <ProductForm
      enableReinitialize
      initialValues={state?.product}
      title={t('products.editProduct')}
    />
  );
}
