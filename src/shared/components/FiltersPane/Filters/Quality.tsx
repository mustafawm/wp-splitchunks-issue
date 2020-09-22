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
  translationKey: 'products.qualities',
  url: url.api.reference.qualityCode,
};

export default function QualityFilters(props: Props) {
  const { t } = useTranslation();
  const { options = [], isLoading, error } = useFetchOptions(fetchOpts);

  return (
    <Group
      options={options}
      isLoading={isLoading}
      error={error}
      label={t('products.quality')}
      type="checkbox"
      filterName={Filters.quality}
      data-testid="quality-filters"
      {...props}
    />
  );
}
