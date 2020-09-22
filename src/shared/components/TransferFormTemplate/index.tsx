/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import ProductInfo from 'shared/components/ProductInfo';
import { Props } from './types';

export default function TransferFormTemplate({
  title,
  buttonType,
  buttonDisabled = false,
  isReviewing,
  onConfirm,
  onCancel,
  children,
  productInfoProps,
  ProductInfoBottom,
}: Props) {
  const { t } = useTranslation();
  const buttonText = isReviewing ? t('common.submit') : t('common.confirm');

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
      <div className="flex flex-col w-full md:w-2/3 mb-2">
        <div className="text-green-600 mb-2">{title}</div>
        {children}
      </div>
      <div className="w-full md:w-1/3">
        <div className="text-green-600 mb-2">{t('products.details')}</div>
        <ProductInfo {...productInfoProps} />
        {ProductInfoBottom}
        <Button
          color="green"
          type={buttonType}
          text={buttonText}
          onClick={onConfirm}
          disabled={buttonDisabled}
          className="w-full mt-4 shadow-md md:py-3"
          data-testid="confirm-btn"
        />
        {!isReviewing && (
          <Button
            color="white"
            text={t('common.cancel')}
            className="w-full mt-2 border border-gray-300 md:py-3"
            onClick={onCancel}
            dataTestid="cancel-btn"
          />
        )}
      </div>
    </div>
  );
}
