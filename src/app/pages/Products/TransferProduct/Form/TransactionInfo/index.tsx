import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { Location } from 'history';
import Field from 'shared/components/Form/Field';
import { readQueryParam } from 'shared/utils/url';
import { TransferProduct, InventoryPrdocut } from 'shared/types';
import { TransferProps } from 'shared/schemas/Transfer';
import LoadingBox from './Loading';
import { useFetchTransferDetails } from './useApi';

type Props = { inventory?: InventoryPrdocut; className?: string };

export default function TransactionDetails(props: Props) {
  const { inventory, className = '' } = props;
  const urlTransferGuid = readQueryParam('transferGuid');
  const { t } = useTranslation();
  const { state } = useLocation() as Location<{ transfer: TransferProduct }>;
  const { values, setFieldValue } = useFormikContext<TransferProps>();
  const { isFetching, data } = useFetchTransferDetails(urlTransferGuid);
  const transfer: TransferProduct = data || state?.transfer;
  const inventoryQty = Number(inventory?.quantity);
  const placeholder = t('validation.maxIs', { limit: inventory?.quantity });

  useEffect(() => {
    const qty = values?.senderQuantity || transfer?.senderQuantity;
    const comment = values?.senderComment || transfer?.senderComment;
    if (qty) {
      setFieldValue('senderQuantity', qty);
      setFieldValue('senderComment', comment);
    }
  }, [transfer?.senderQuantity, transfer?.senderComment]);

  const validateValue = (value: number) => {
    let error = undefined;
    if (value < 1) {
      error = t('validation.cannotBeLess', { limit: 1 });
    } else if (urlTransferGuid) {
      // updating an existing transfer
      const maxQty = Number(transfer.senderQuantity) + inventoryQty;
      if (value > maxQty) {
        error = t('validation.cannotBeMore', { limit: maxQty });
      }
    } else if (value > inventoryQty) {
      error = t('validation.cannotBeMore', { limit: inventoryQty });
    }
    return error;
  };

  if (isFetching) {
    return <LoadingBox />;
  }
  return (
    <div
      className={`p-3 md:p-5 mr-0 sm:mr-3 mb-3 shadow-md border-t border-gray-100 ${className}`}
    >
      <span className="flex items-center">
        <Field
          name="senderQuantity"
          type="number"
          inputMode="decimal"
          validate={validateValue}
          label={t('products.quantity')}
          placeholder={placeholder}
          className="utl-input"
          wrapperClassName="mr-3 w-2/3 md:w-1/3 "
        />
        <span className="mt-4 uppercase text-gray-800">
          {inventory?.quantityUnit}
        </span>
      </span>
      <Field
        name="senderComment"
        component="textarea"
        label={t('products.sendProduct.comment')}
        className="utl-textarea"
      />
    </div>
  );
}
