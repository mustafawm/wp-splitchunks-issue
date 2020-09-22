import React from 'react';
import { useTranslation } from 'react-i18next';
import Field from 'shared/components/Form/Field';
import DatePicker from 'shared/components/Form/DatePicker';
import { endsWithDot } from 'shared/utils/string';
import { Props } from '../types';

export default function PersonalDetailsFields(props: Props) {
  const { t } = useTranslation();
  let { schemaPrefix = '' } = props;
  if (schemaPrefix && !endsWithDot(schemaPrefix)) {
    schemaPrefix += '.';
  }

  return (
    <>
      <div className="utl-two-fields">
        <Field
          name={`${schemaPrefix}firstName`}
          className="utl-input"
          wrapperClassName="w-full mr-2"
          label={t('form.personal.firstName.label')}
          placeholder={t('form.personal.firstName.placeholder')}
        />
        <Field
          name={`${schemaPrefix}lastName`}
          className="utl-input"
          wrapperClassName="w-full"
          label={t('form.personal.lastName.label')}
          placeholder={t('form.personal.lastName.placeholder')}
        />
      </div>
      <div className="utl-two-fields">
        <Field
          name={`${schemaPrefix}email`}
          className="utl-input"
          inputMode="email"
          wrapperClassName="w-full mr-2"
          label={t('form.personal.email.label')}
          placeholder={t('form.personal.email.placeholder')}
        />
        <Field
          name={`${schemaPrefix}phoneNumber`}
          className="utl-input"
          wrapperClassName="w-full"
          type="tel"
          label={t('form.personal.mobile.label')}
          placeholder={t('form.personal.mobile.placeholder')}
        />
      </div>
      <DatePicker
        name={`${schemaPrefix}dateOfBirth`}
        label={t('form.personal.dob.label')}
        placeholder={t('form.personal.dob.placeholder')}
        wrapperClassName="w-full md:w-1/2 md:pr-2"
      />
    </>
  );
}
