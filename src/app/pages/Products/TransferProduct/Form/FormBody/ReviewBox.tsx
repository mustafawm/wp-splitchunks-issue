import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { ReviewProps as Props } from './types';

export default function ReviewBox(props: Props) {
  const { qtyUnit, values, onEdit } = props;
  const { t } = useTranslation();

  return (
    <div className="p-3 md:p-5 mr-0 sm:mr-3 shadow-md border-t border-gray-100">
      <div className="flex justify-between text-gray-700 pb-3 border-b">
        <span>{t('products.sendProduct.qtyToSend')}</span>
        <span className="text-black">
          <span className="mr-2">{values?.senderQuantity}</span>
          <span>{qtyUnit}</span>
        </span>
      </div>
      <div className="flex flex-col text-gray-700 mt-4">
        <span className="text-black mb-4">
          {t('products.sendProduct.comment')}
        </span>
        <span className="font-thin">{values?.senderComment}</span>
      </div>
      <Button
        color="white"
        className="block text-green-600 border mt-4 w-full"
        text={t('common.edit')}
        onClick={onEdit}
        dataTestid="edit-btn"
      />
    </div>
  );
}
