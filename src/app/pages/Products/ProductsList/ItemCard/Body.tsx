import React from 'react';
import { useTranslation } from 'react-i18next';
import { InventoryPrdocut } from 'shared/types';
import { getDatePart } from 'shared/utils/string';

export default function CardBody(props: {
  product: InventoryPrdocut;
  province?: string;
}) {
  const { t } = useTranslation();
  const {
    product: {
      quantity,
      originalQuantity,
      quantityUnit,
      companyProduct: { name, categories, qualityCode, produceDate },
    },
    province,
  } = props;

  return (
    <>
      <h3 className="font-extrabold text-black">{name}</h3>
      <div className="flex items-center justify-between my-1">
        <span className="text-green-600">{categories[0]?.name || 'N/A'}</span>
        <span>•</span>
        <span>{t(`products.qualities.${qualityCode}`)}</span>
        <span />
        <span>•</span>
        <span>{province}</span>
      </div>
      <div className="flex w-full justify-between">
        <span className="w-1/2 flex flex-col">
          <span>{t('products.harvestedOn')}</span>
          <time dateTime={produceDate}>{getDatePart(produceDate)}</time>
        </span>
        <span className="w-1/2 flex flex-col sm:items-start">
          <span>
            {t('products.available')} / {t('products.total')}
          </span>
          <span>{`${quantity}/${originalQuantity} ${quantityUnit}`}</span>
        </span>
      </div>
    </>
  );
}
