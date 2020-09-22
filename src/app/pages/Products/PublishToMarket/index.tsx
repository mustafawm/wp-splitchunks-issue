import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { url } from 'shared/consts';
import usePageTitle from 'shared/hooks/usePageTitle';
import { InventoryPrdocut } from 'shared/types';
import { useAlertFunction } from 'shared/providers/alert';
import Form from 'shared/components/Form';
import SpinnerBox from 'shared/components/Spinner/Box';
import PublishSchema from 'shared/schemas/Publish';
import SubmitSuccessBox from 'shared/components/SubmitSuccessBox';
import FormBody from './FormBody';
import { usePublishProduct } from './useApi';
import { initialValues } from './consts';

export default function PublishToMarket() {
  usePageTitle('products.publishProduct.pageTitle');
  const { state } = useLocation() as Location<{ success: boolean }>;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toastIt = useAlertFunction();
  const [
    sendIt,
    { isLoading, isSuccess, isError, error, reset },
  ] = usePublishProduct();
  const { productGuid: companyInventoryGuid } = useParams();

  useEffect(() => {
    if (isSuccess) {
      navigate('?isReviewing=true', {
        replace: true,
        state: { success: true },
      });
    } else if (isError) {
      toastIt(error?.message, 'red');
      reset();
    }
  }, [isSuccess, isError]);

  const handleSubmit = useCallback(
    async (values): Promise<Partial<InventoryPrdocut>> => {
      const data = { ...values, companyInventoryGuid };
      toastIt('');
      return sendIt(data);
    },
    [companyInventoryGuid],
  );

  return (
    <>
      {state?.success && (
        <SubmitSuccessBox
          message={
            <>
              <p>{t('products.sendProduct.successMsg_1')}</p>
              <p>{t('products.sendProduct.successMsg_2')}</p>
            </>
          }
          primaryBtnText={t('navigation.published.display')}
          primaryHref={{ to: url.web.published }}
          secondaryBtnText={t('navigation.products.display')}
          secondaryHref={{ to: url.web.products }}
        />
      )}
      <Form
        title={t('products.publishProduct.formTitle')}
        validateOnBlur={false}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={PublishSchema}
      >
        <>
          {isLoading && <SpinnerBox />}
          <FormBody />
        </>
      </Form>
    </>
  );
}
