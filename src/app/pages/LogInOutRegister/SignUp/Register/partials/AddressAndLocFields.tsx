import React from 'react';
import { useTranslation } from 'react-i18next';
import Map from 'shared/components/Form/Map';
import Select from 'shared/components/Form/Select';
import AddressField from 'shared/components/Form/partials/Address';
import { url } from 'shared/consts';
import { endsWithDot } from 'shared/utils/string';
import { Props } from './types';

export default function AddressAndLocFields(props: Props) {
  const { t } = useTranslation();
  let { schemaPrefix = '' } = props;
  if (schemaPrefix && !endsWithDot(schemaPrefix)) {
    schemaPrefix += '.';
  }

  return (
    <div className={props.className}>
      <h4>{t('form.address.groupTitle')}</h4>
      <AddressField schemaPrefix={schemaPrefix} />
      <Select
        aria-label="location ownership"
        name={`${schemaPrefix}locationType`}
        url={url.api.reference.locationType}
        label={t('form.address.locationType.label')}
        labelKey="name"
        valueKey="name"
        className="w-full md:w-1/2 md:pr-2"
      />
      <Map
        name={`${schemaPrefix}location`}
        label={t('form.address.map.label')}
      />
    </div>
  );
}
