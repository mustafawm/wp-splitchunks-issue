import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import { endsWithDot } from 'shared/utils/string';
import Field from 'shared/components/Form/Field';
import Select from 'shared/components/Form/Select';
import { Props } from '../types';

export default function AddressField(props: Props) {
  const { t } = useTranslation();
  let { schemaPrefix = '' } = props;
  if (schemaPrefix && !endsWithDot(schemaPrefix)) {
    schemaPrefix += '.';
  }

  return (
    <>
      <div className="utl-two-fields">
        <Field
          // type="number"
          inputMode="numeric"
          name={`${schemaPrefix}zipCode`}
          className="utl-input"
          label={t('form.address.zipCode.label')}
          placeholder={t('form.address.zipCode.placeholder')}
        />
        <Select
          aria-label="province"
          name={`${schemaPrefix}area`}
          labelKey="name"
          valueKey="value"
          label={t('form.address.province.label')}
          url={url.api.reference.locationAreas}
        />
      </div>
      <Field
        name={`${schemaPrefix}address1`}
        className="utl-input"
        wrapperClassName="w-full"
        label={t('form.address.line1.label')}
        placeholder={t('form.address.line1.placeholder')}
      />
    </>
  );
}
