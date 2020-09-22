import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import useFetchOptions from 'shared/hooks/useFetchOptions';
import Options from './Options';

const fetchOptsProps = {
  url: url.api.reference.businessType,
  labelKey: 'name',
  valueKey: 'name',
};

export default function OnBoard() {
  const { t } = useTranslation();
  const { options, isLoading, error } = useFetchOptions(fetchOptsProps);

  if (error) {
    return <p className="utl-error">{error.message}</p>;
  }
  return (
    <div className="flex flex-col items-center mt-4 sm:mt-24">
      <h1>{t('login.getStarted')}</h1>
      <h4>{t('login.selectUserRole')}</h4>
      <div className="flex flex-col md:flex-row justify-center items-center flex-wrap mt-6 md:mt-16">
        <Options options={options} isLoading={isLoading} />
      </div>
    </div>
  );
}
