import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { url } from 'shared/consts';
import { objLen } from 'shared/utils/object';
import TransferFormTemplate from 'shared/components/TransferFormTemplate';
import { PublishProps } from 'shared/schemas/Publish';
import { parseQueryStringParams } from 'shared/utils/url';
import { useFetchInventory } from 'shared/hooks/useFetchInventory';
import Fields from './Fields';
import Review from './Review';

export default function PublishToMarketFormBody() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { values, isValid, validateForm } = useFormikContext<PublishProps>();
  const { isReviewing } = parseQueryStringParams();
  const { data } = useFetchInventory();

  const changePage = (withReview = false): void => {
    navigate(`?isReviewing=${withReview}`);
  };

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
          changePage(true);
        }
      }
    },
    [isReviewing],
  );

  const content = isReviewing ? (
    <Review
      values={values}
      qtyUnit={data?.quantityUnit}
      onEdit={(): void => changePage(false)}
    />
  ) : (
    <Fields inventory={data} />
  );

  const title = isReviewing
    ? t('common.review')
    : t('products.publishProduct.form.detailsTitle');

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
