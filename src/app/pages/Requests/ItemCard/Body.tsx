import React from 'react';
import { useTranslation } from 'react-i18next';
import { TransferProduct } from 'shared/types';
import { getDatePart } from 'shared/utils/string';
import TransferStatusBox from 'shared/components/TransferStatus';

type Props = { product: TransferProduct };

export default function Body(props: Props) {
  const { t } = useTranslation();
  const {
    product: { companyProduct, senderQuantity, quantityUnit, status },
  } = props;

  return (
    <>
      <span className="flex items-center flex-wrap justify-between">
        <h3 className="mr-1">{companyProduct.name}</h3>
        <TransferStatusBox status={status} />
      </span>
      <span className="text-green-600">
        {companyProduct.categories[0]?.name || 'N/A'}
      </span>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between text-gray-600">
          <span>{t('products.availableOn')}</span>
          <span>{t('products.publishedQty')}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold">
          <span>{getDatePart(companyProduct.availabilityDate)}</span>
          <span>
            {senderQuantity} {quantityUnit}
          </span>
        </div>
      </div>
    </>
  );
}
