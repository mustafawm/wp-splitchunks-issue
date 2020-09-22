import React, { useCallback, useEffect } from 'react';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { url } from 'shared/consts';
import { TransferProduct } from 'shared/types';
import usePageTitle from 'shared/hooks/usePageTitle';
import { useAlertFunction } from 'shared/providers/alert';
import Form from 'shared/components/Form';
import SpinnerBox from 'shared/components/Spinner/Box';
import TransferAcceptSchema from 'shared/schemas/TransferAccept';
import SuccessBox from 'shared/components/SubmitSuccessBox';
import FormBody from './FormBody';
import { useAcceptTransfer } from './useApi';
import { initialValues } from './consts';

type LocationState = { success: boolean; transfer: TransferProduct };

export default function AcceptTransferRequest() {
  usePageTitle('requests.processReq.pageTitle');
  const { state } = useLocation() as Location<LocationState>;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toastIt = useAlertFunction();
  const [
    acceptIt,
    { isLoading, isSuccess, isError, error },
  ] = useAcceptTransfer();

  useEffect(() => {
    if (isSuccess) {
      navigate('?isReviewing=true', {
        replace: true,
        state: { success: true },
      });
    } else if (isError) {
      toastIt(String(error?.message), 'red');
    }
  }, [isSuccess, isError]);

  const handleSubmit = useCallback(values => {
    toastIt('');
    acceptIt(values);
  }, []);

  return (
    <>
      {state?.success && (
        <SuccessBox
          message={
            <>
              <p>{t('requests.processReq.successMsg_1')}</p>
              <p>{t('requests.processReq.successMsg_2')}</p>
            </>
          }
          primaryBtnText={t('navigation.requests.display')}
          primaryHref={{ to: url.web.requests }}
          secondaryBtnText={t('navigation.products.display')}
          secondaryHref={{ to: url.web.products }}
        />
      )}
      <Form
        title={t('requests.processReq.title')}
        validateOnBlur={false}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={TransferAcceptSchema}
      >
        <>
          {isLoading && <SpinnerBox />}
          <FormBody senderQty={state?.transfer?.senderQuantity} />
        </>
      </Form>
    </>
  );
}
