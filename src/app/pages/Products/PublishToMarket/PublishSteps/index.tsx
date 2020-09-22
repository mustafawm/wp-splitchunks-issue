import React from 'react';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { removeTrailingSlash } from 'shared/utils/string';
import { parseQueryStringParams } from 'shared/utils/url';
import StepsIndicator, { StepProps } from 'shared/components/StepsIndicator';

export default function PublishSteps() {
  const { t } = useTranslation();
  const { state } = useLocation() as Location<{ success: boolean }>;
  const { isReviewing } = parseQueryStringParams();
  const pathname = window.location.pathname;
  const isOnDetails = removeTrailingSlash(pathname).endsWith('publish');

  const steps: StepProps[] = [
    {
      id: 'details',
      status:
        isOnDetails && !isReviewing
          ? 'current'
          : isReviewing
          ? 'complete'
          : 'not-started', // unreachable
      isLastStep: false,
      description: (
        <div className="-ml-3">
          {t('products.publishProduct.steps.details')}
        </div>
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
        <div className="-ml-6">
          {t('products.publishProduct.steps.confirm')}
        </div>
      ),
      url: '',
    },
  ];

  return (
    <>
      <StepsIndicator steps={steps} />
      <Outlet />
    </>
  );
}
