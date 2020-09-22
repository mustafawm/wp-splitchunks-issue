import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserRole } from 'shared/types';
import { useUserMustBe } from 'shared/providers/auth';
import ProductForm from 'app/pages/Products/components/ProductForm';

export default function CombineProducts() {
  useUserMustBe([UserRole.PackhouseUnit, UserRole.ProcessingUnit]);
  const { t } = useTranslation();

  return <ProductForm title={t('products.newProduct')} />;
}
