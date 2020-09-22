import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Accordion from 'shared/components/Accordion';
import { TraceProduct } from 'shared/types';
import { BROWSER } from 'shared/consts';
import Button from 'shared/components/Button';
import Share from 'shared/svgs/Share.svg';
import LoadingTrace from './Loading';
import AccordionHead from './AccordionHead';
import AccordionBody from './AccordionBody';
import Timeline from './TimeLine';
import { shareProduct } from './helpers';
import { useTraceInventory } from '../useApi';

export default function InventoryTrace(props: { productName?: string }) {
  const { productName } = props;
  const { t } = useTranslation();
  const { isLoading, isError, data = [], error } = useTraceInventory();

  const shareBtnClass = classNames(
    'absolute top-0 right-0 mt-2 mr-2',
    'p-1 rounded-full z-10 text-black ',
    BROWSER.canShare ? '' : 'hidden',
  );

  if (isError) {
    const errMsg =
      error?.status === 404 ? t('trace.noTraceData') : error?.message;
    return <div className="utl-error">{errMsg}</div>;
  }
  if (isLoading) {
    return <LoadingTrace />;
  }
  return (
    <div>
      <div>
        <h1>{t('trace.traceability')}</h1>
        <Button
          color="white"
          onClick={() => shareProduct(productName)}
          title="share details"
          className={shareBtnClass}
        >
          <Share className="w-6 h-6" />
        </Button>
      </div>
      <ul className="mt-8 list-none">
        {(data || []).map((trace: TraceProduct, idx: number) => (
          <li
            key={trace.blockchainTransactionGuid}
            className="relative pb-4 flex flex-col"
          >
            <Timeline withTail={idx < data.length - 1} />
            <div className="-mt-6 ml-6 mb-2">
              <Accordion
                name={trace.blockchainTransactionGuid}
                title={<AccordionHead trace={trace} />}
              >
                <AccordionBody trace={trace} />
              </Accordion>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
