/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import useFetchOptions from 'shared/hooks/useFetchOptions';
import { Filters, FilterProps as Props } from './types';
import Group from './partials/Group';

const fetchOpts = {
  labelKey: 'name',
  valueKey: 'name',
  url: url.api.reference.businessType,
  translationKey: 'app.businessType',
};

export default function FacilityFilters(props: Props) {
  const { t } = useTranslation();
  const { options = [], isLoading, error } = useFetchOptions(fetchOpts);

  return (
    <Group
      options={options}
      isLoading={isLoading}
      error={error}
      label={t('common.facility')}
      type="checkbox"
      filterName={Filters.facility}
      data-testid="facility-filters"
      {...props}
    />
  );
}
