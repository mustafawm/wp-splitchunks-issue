/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import { TransferStatus } from 'shared/types';
import useFetchOptions from 'shared/hooks/useFetchOptions';
import { Filters, FilterProps as Props } from './types';
import Group from './partials/Group';

const fetchOpts = {
  labelKey: 'name',
  valueKey: 'name',
  translationKey: 'app.transferStatus',
  url: url.api.reference.transferStatus,
};

const INCLUDED_STATUSES = [
  TransferStatus.PendingReceiver,
  TransferStatus.ReceiverAccepted,
  TransferStatus.Publish,
  TransferStatus.ReceiverRejected,
];

export default function TransferStatusFilters(props: Props) {
  const { t } = useTranslation();
  const { options = [], isLoading, error } = useFetchOptions(fetchOpts);

  const stasuses = options.filter(opt =>
    INCLUDED_STATUSES.includes(opt.value as TransferStatus),
  );

  return (
    <Group
      options={stasuses}
      isLoading={isLoading}
      error={error}
      label={t('common.status')}
      type="checkbox"
      filterName={Filters.status}
      data-testid="status-filters"
      {...props}
    />
  );
}
