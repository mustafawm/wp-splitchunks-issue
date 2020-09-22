import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { url } from 'shared/consts';
import { objLen } from 'shared/utils/object';
import { roundedUp } from 'shared/utils/number';
import { getDatePart } from 'shared/utils/string';
import TransferFormTemplate from 'shared/components/TransferFormTemplate';
import { TransferAcceptProps } from 'shared/schemas/TransferAccept';
import { parseQueryStringParams } from 'shared/utils/url';
import Fields from './Fields';
import Review from './Review';
import { useFetchCurrentTransfer } from './useApi';

export default function ProcessTransferRequest(props: { senderQty: string }) {
  const [senderQty, setSenderQty] = useState(props?.senderQty);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { values, isValid, setFieldValue, validateForm } = useFormikContext<
    TransferAcceptProps
  >();
  const { isReviewing } = parseQueryStringParams();
  const { data, error } = useFetchCurrentTransfer();

  let wastedQty = 0;
  if (data?.senderQuantity && values.acceptQuantity) {
    wastedQty = roundedUp(
      Number(data.senderQuantity) - Number(values.acceptQuantity),
    );
  }

  const changePage = (withReview = false): void => {
    navigate(`?isReviewing=${withReview}`);
  };

  useEffect(() => {
    if (props?.senderQty) {
      setSenderQty(props.senderQty);
    }
  }, [props?.senderQty]);
  useEffect(() => {
    if (isReviewing && !isValid) {
      changePage(false);
    }
  }, []);

  const onConfirm = useCallback(
    async e => {
      if (!isReviewing) {
        e.preventDefault();
        const formErrors = await validateForm();
        if (!objLen(formErrors)) {
          setFieldValue('wasteQuantity', wastedQty);
          changePage(true);
        }
      }
    },
    [isReviewing, wastedQty],
  );

  const content = error ? (
    <span className="utl-error">{error.message}</span>
  ) : isReviewing ? (
    <Review
      values={values}
      qtyUnit={data?.quantityUnit}
      onEdit={(): void => changePage(false)}
    />
  ) : (
    <Fields transfer={data} />
  );

  return (
    <TransferFormTemplate
      title={t('requests.processReq.formTitle')}
      buttonType={isReviewing ? 'submit' : 'button'}
      isReviewing={isReviewing}
      onConfirm={onConfirm}
      onCancel={(): void => navigate(url.web.products)}
      productInfoProps={{
        companyGuid: data?.senderCompanyGuid,
        inventoryGuid: data?.companyInventoryGuid,
        fields: ['quality', 'produceDate'],
        additionalFields: [
          {
            name: t('requests.processReq.receivedQty'),
            value: `${senderQty} ${data?.quantityUnit}`,
          },
          {
            name: t('requests.processReq.dispatchDate'),
            value: getDatePart(data?.updatedDateTimeOffset),
          },
          {
            name: t('requests.processReq.sender'),
            value: data?.senderCompanyName,
          },
        ],
      }}
      ProductInfoBottom={
        isReviewing ? (
          <div className="p-3 md:p-5 shadow-md border-t border-gray-100 font-bold">
            <span className="text-black mr-2">
              {t('requests.processReq.ttlWasteQty')}:
            </span>
            <span className="text-red-600">
              <span className="mr-1" data-testid="wasted-qty">
                {wastedQty}
              </span>
              <span>{data?.quantityUnit}</span>
            </span>
          </div>
        ) : (
          <p />
        )
      }
    >
      {content}
    </TransferFormTemplate>
  );
}
