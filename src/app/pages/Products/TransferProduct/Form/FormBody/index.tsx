import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { url } from 'shared/consts';
import { objLen } from 'shared/utils/object';
import { parseQueryStringParams } from 'shared/utils/url';
import { TransferProps } from 'shared/schemas/Transfer';
import { useFetchInventory } from 'shared/hooks/useFetchInventory';
import TransferFormTemplate from 'shared/components/TransferFormTemplate';
import ReviewBox from './ReviewBox';
import FacilityDetails from '../FacilityDetails';
import TransactionDetailsForm from '../TransactionInfo';

export default function SendToFacilityFormBody() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useFetchInventory();
  const { values, validateForm } = useFormikContext<TransferProps>();
  const { transferGuid, isReviewing } = parseQueryStringParams();
  const changePage = (withReview = false): void => {
    const qs = `?isReviewing=${withReview}`;
    navigate(transferGuid ? `${qs}&transferGuid=${transferGuid}` : qs);
  };

  useEffect(() => {
    if (isReviewing && !values?.senderQuantity) {
      changePage(false);
    }
  }, []);

  const onConfirm = useCallback(
    async e => {
      if (!isReviewing) {
        e.preventDefault();
        const formErrors = await validateForm();
        if (!objLen(formErrors)) {
          changePage(true);
        }
      }
    },
    [isReviewing, transferGuid],
  );

  const content = isReviewing ? (
    <ReviewBox
      values={values}
      qtyUnit={data?.quantityUnit}
      onEdit={(): void => changePage(false)}
    />
  ) : (
    <>
      <FacilityDetails />
      <TransactionDetailsForm inventory={data} className="mt-4" />
    </>
  );

  const title = isReviewing
    ? t('common.review')
    : t('products.sendProduct.facilityDetails');

  return (
    <TransferFormTemplate
      title={title}
      buttonType={isReviewing ? 'submit' : 'button'}
      isReviewing={isReviewing}
      onConfirm={onConfirm}
      onCancel={(): void => navigate(url.web.products)}
      productInfoProps={{
        fields: [
          'quality',
          'availableDate',
          'produceDate',
          'quantity',
          'remainingQuantity',
        ],
        inventory: data,
      }}
    >
      {content}
    </TransferFormTemplate>
  );
}
