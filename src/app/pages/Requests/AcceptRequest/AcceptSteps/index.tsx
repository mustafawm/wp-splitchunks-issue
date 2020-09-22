import React from 'react';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { parseQueryStringParams } from 'shared/utils/url';
import StepsIndicator, { StepProps } from 'shared/components/StepsIndicator';
import { removeTrailingSlash } from 'shared/utils/string';

export default function AcceptTransferSteps() {
  const { t } = useTranslation();
  const { state } = useLocation() as Location<{ success: boolean }>;
  const { isReviewing } = parseQueryStringParams();
  const pathname = window.location.pathname;
  const isOnDetails =
    removeTrailingSlash(pathname).split('/').reverse()[0].length === 36;

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
      description: <div className="-ml-3">{t('requests.steps.details')}</div>,
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
      description: <div className="-ml-8">{t('requests.steps.confirm')}</div>,
      url: '',
    },
  ];

  return (
    <>
      {isOnDetails && <StepsIndicator steps={steps} />}
      <Outlet />
    </>
  );
}
