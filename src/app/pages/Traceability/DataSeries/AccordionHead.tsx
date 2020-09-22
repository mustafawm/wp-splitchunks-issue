import React from 'react';
import { useTranslation } from 'react-i18next';
import { TraceProduct } from 'shared/types';
import { getDatePart } from 'shared/utils/string';

export default function AccordionHead(props: { trace: TraceProduct }) {
  const { trace } = props;
  const { t } = useTranslation();

  return (
    <div className="relative flex items-center">
      <div className="relative w-full flex justify-between">
        <div className="font-semibold">
          {t(`trace.transactionType.${trace.transactionType}`)}
        </div>
        <div className="mr-10 text-gray-600">
          {getDatePart(trace.blockchainTimeStamp, '.')}
        </div>
      </div>
    </div>
  );
}
