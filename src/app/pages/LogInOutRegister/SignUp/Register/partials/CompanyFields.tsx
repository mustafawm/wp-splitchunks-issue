import React from 'react';
import { useTranslation } from 'react-i18next';
import { Business } from 'shared/types';
import Field from 'shared/components/Form/Field';
import { endsWithDot } from 'shared/utils/string';
import DateTimePicker from 'shared/components/Form/DatePicker';
import { Props } from './types';

export default function CompanyFields(props: Props) {
  const { t } = useTranslation();
  // eslint-disable-next-line prefer-const
  let { schemaPrefix = '', businessType } = props;

  const title = t(`app.businessType.${businessType}`);
  const nameField = {
    label: t('form.business.company.name.label'),
    placeholder: t('form.business.company.name.placeholder'),
  };

  if (businessType !== Business.Farm) {
    nameField.label = t('form.business.company.name.label');
    nameField.placeholder = t('form.business.company.name.placeholder');
  }
  if (schemaPrefix && !endsWithDot(schemaPrefix)) {
    schemaPrefix += '.';
  }

  return (
    <div className={props.className}>
      <h4>{title}</h4>
      <div className="utl-two-fields">
        <Field
          className="utl-input"
          wrapperClassName="w-full mr-2"
          name={`${schemaPrefix}name`}
          label={nameField.label}
          placeholder={nameField.placeholder}
        />
        <Field
          className="utl-input"
          wrapperClassName="w-full"
          name={`${schemaPrefix}vatNumber`}
          label={t('form.business.company.vat.label')}
          placeholder={t('form.business.company.vat.placeholder')}
        />
      </div>
      <DateTimePicker
        name={`${schemaPrefix}registrationDate`}
        wrapperClassName="w-full md:w-1/2 md:pr-2"
        label={t('form.business.company.registration.label')}
      />
    </div>
  );
}
