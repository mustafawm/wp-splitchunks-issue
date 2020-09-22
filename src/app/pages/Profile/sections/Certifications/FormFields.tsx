import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import Field from 'shared/components/Form/Field';
import Select from 'shared/components/Form/Select';
import Dropzone from 'shared/components/Form/Dropzone';
import DateTimePicker from 'shared/components/Form/DatePicker';

export default function CertificateFields() {
  const { t } = useTranslation();

  return (
    <>
      <Field
        name="name"
        className="utl-input"
        wrapperClassName="w-full md:w-1/2 md:pr-2"
        label={t('navigation.profile.sections.cert.fields.name.label')}
        placeholder={t(
          'navigation.profile.sections.cert.fields.name.placeholder',
        )}
      />
      <div className="utl-two-fields">
        <Select
          name="type"
          aria-label="certificate type"
          labelKey="name"
          valueKey="name"
          url={url.api.reference.certificationTypes}
          label={t('navigation.profile.sections.cert.fields.type.label')}
        />
        <Select
          name="certificationBodyGuid"
          aria-label="certifying body"
          labelKey="name"
          valueKey="guid"
          url={url.api.reference.certificationBodys}
          label={t('navigation.profile.sections.cert.fields.body.label')}
        />
      </div>
      <Field
        component="textarea"
        name="description"
        label={t('common.description')}
        className="utl-textarea"
      />
      <div className="utl-two-fields">
        <DateTimePicker
          name="issuedDate"
          label={t('common.startDate')}
          wrapperClassName="w-full md:w-1/2 md:pr-2"
        />
        <DateTimePicker
          name="expiredDate"
          wrapperClassName="w-full md:w-1/2 md:pr-2"
          label={t('common.endDate')}
        />
      </div>
      <Dropzone
        uploadType="file"
        name="certificateFiles"
        label={t('navigation.profile.sections.cert.fields.files.label')}
        placeholder={t(
          'navigation.profile.sections.cert.fields.files.placeholder',
        )}
      />
    </>
  );
}
