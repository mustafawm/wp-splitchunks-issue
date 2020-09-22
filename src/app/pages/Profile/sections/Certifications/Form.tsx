import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'shared/components/Form';
import CertificateSchema from 'shared/schemas/Certificate';
import FormFields from './FormFields';
import DeleteSection from './DeleteForm';
import { initVals } from './consts';
import { FormProps as Props } from './types';

export default function CertificationForm(props: Props) {
  const { data, onSubmit, onCancel, onDelete, isDeleting = false } = props;
  const { t } = useTranslation();

  const values = useMemo(() => ({ ...initVals, ...data }), [data?.guid]);
  const handleDelete = useCallback(() => {
    onDelete && data?.guid && onDelete(data?.guid);
  }, [data?.guid]);

  return (
    <div className="relative w-full mb-4">
      {values?.guid && (
        <DeleteSection isDeleting={isDeleting} onDelete={handleDelete} />
      )}
      <Form
        useDefaultButtons
        enableReinitialize
        initialValues={values}
        onSubmit={onSubmit}
        onCancel={onCancel}
        validationSchema={CertificateSchema}
        title={t('navigation.profile.sections.cert.formTitle')}
        // persist={{ name: 'new-certification', ignoreFields: ['files'] }}
      >
        <FormFields />
      </Form>
    </div>
  );
}
