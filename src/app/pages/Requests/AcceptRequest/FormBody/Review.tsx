import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { ReviewProps as Props } from './types';
import { useGetLocationName } from './useApi';

const rowClass = 'flex justify-between text-gray-700 border-b py-4';

export default function Review(props: Props) {
  const { qtyUnit, values, onEdit } = props;
  const { t } = useTranslation();
  const locationName = useGetLocationName(
    values.receiverCompanyLocationGuid as string,
  );

  return (
    <div className="p-3 md:p-5 mr-0 sm:mr-3 shadow-md border-t border-gray-100">
      <div className={rowClass}>
        <span>{t('requests.processReq.acceptQty')}</span>
        <span className="text-black">
          <span className="mr-2">{values.acceptQuantity}</span>
          <span>{qtyUnit}</span>
        </span>
      </div>
      <div className={rowClass}>
        <span>{t('requests.processReq.location')}</span>
        <span className="text-black mr-2">{locationName}</span>
      </div>
      <div className={`${rowClass} border-none flex-col`}>
        <div className="text-black mb-4">
          {t('products.sendProduct.comment')}
        </div>
        <span className="font-thin">{values.receiverComment}</span>
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
