import React from 'react';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { parseQueryStringParams } from 'shared/utils/url';
import { removeTrailingSlash } from 'shared/utils/string';
import StepsIndicator, { StepProps } from 'shared/components/StepsIndicator';

export default function TransferSteps() {
  const { t } = useTranslation();
  const { state } = useLocation() as Location<{ success: boolean }>;
  const { isReviewing } = parseQueryStringParams();
  const pathname = window.location.pathname;
  const isOnPickFacility = removeTrailingSlash(pathname).endsWith('facilities');
  const isOnDetails =
    pathname.includes('/facilities/') &&
    pathname.split('/').reverse()[0].length === 36;

  const steps: StepProps[] = [
    {
      id: 'facility',
      status: isOnPickFacility
        ? 'current'
        : isOnDetails || isReviewing
        ? 'complete'
        : 'not-started',
      isLastStep: false,
      description: (
        <span className="-ml-3">
          {t('products.sendProduct.steps.facility')}
        </span>
      ),
      url: `${removeTrailingSlash(pathname.split('facilities')[0])}/facilities`,
    },
    {
      id: 'details',
      status: isReviewing
        ? 'complete'
        : isOnDetails
        ? 'current'
        : 'not-started',
      isLastStep: false,
      description: (
        <span className="-ml-3">{t('products.sendProduct.steps.details')}</span>
      ),
      url: pathname,
    },
    {
      id: 'confirmation',
      status:
        isReviewing && !state?.success
          ? 'current'
          : isReviewing && state?.success
          ? 'complete'
          : 'not-started',
      isLastStep: true,
      description: (
        <span className="-ml-6">{t('products.sendProduct.steps.confirm')}</span>
      ),
      url: '',
    },
  ];

  return (
    <>
      {pathname.includes('facilities') && <StepsIndicator steps={steps} />}
      <Outlet />
    </>
  );
}
