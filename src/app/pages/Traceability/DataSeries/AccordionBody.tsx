import React from 'react';
import { useTranslation } from 'react-i18next';
import { TraceProduct } from 'shared/types';

export default function AccordionBody(props: { trace: TraceProduct }) {
  const { trace } = props;
  const { t } = useTranslation();

  return (
    <div className="-ml-1">
      <div className="font-semibold text-green-600 mb-4">
        {trace.senderCompanyName}
      </div>
      <div className="text-gray-600 font-thin">
        <p>{trace.senderCompanyContactDetail}</p>
        <p>{trace?.senderCompanyComment}</p>
      </div>
      <div className="font-semibold text-green-600 my-4">
        {trace?.receiverCompanyName}
      </div>
      <div className="text-gray-600 font-thin">
        <p>{trace?.receiverCompanyContactDetail}</p>
        <p>{trace?.receiverCompanyComment}</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between max-w-xs">
          <span className="text-gray-600">{t('trace.qtyForSale')}:</span>
          <span className="text-black">
            {trace.actualQuantity} {trace.quantityUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
