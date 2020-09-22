import React from 'react';
import { useTranslation } from 'react-i18next';
import { InventoryPrdocut } from 'shared/types';
import { getDatePart } from 'shared/utils/string';

const infoClass = 'w-full sm:w-1/3 flex mt-1';
const infoKey = 'text-gray-700 mr-1';

export default function Details(props: { product?: InventoryPrdocut }) {
  const { product } = props;
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('products.productInfo')}</h3>
      <div className="flex flex-wrap">
        <div className={infoClass}>
          <span className={infoKey}>{`${t('products.category')} - `}</span>
          <span>{product?.companyProduct?.categories[0]?.name || ''}</span>
        </div>
        <div className={infoClass}>
          <span className={infoKey}>{`${t('products.availableOn')} - `}</span>
          <span>{getDatePart(product?.companyProduct?.availabilityDate)}</span>
        </div>
        {/* <div className={infoClass}>
          <span className={infoKey}>{`${t('products.quantity')} - `}</span>
          <span>
            {product?.quantity} {product?.quantityUnit}
          </span>
        </div> */}
        <div className={infoClass}>
          <span className={infoKey}>{`${t('products.quality')}`}</span>
          <span>{product?.companyProduct?.qualityCode}</span>
        </div>
        <div className={infoClass}>
          <span className={infoKey}>{`${t('products.harvestedOn')} - `}</span>
          <span>{getDatePart(product?.companyProduct?.produceDate)}</span>
        </div>
      </div>
    </>
  );
}
