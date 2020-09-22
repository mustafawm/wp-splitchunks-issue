import React, { useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'shared/components/Form';
import { useProfile } from 'shared/providers/auth';
import { useAlertFunction } from 'shared/providers/alert';
import Field from 'shared/components/Form/Field';
import Dropzone from 'shared/components/Form/Dropzone';
import usePageTitle from 'shared/hooks/usePageTitle';
import FarmerIdSchema, {
  FarmerIdProps,
} from 'shared/schemas/FarmerIdentification';
import { useSubmitIdentification } from './useApi';

export default function IdentificationForm() {
  usePageTitle('navigation.profile.sections.id.pageTitle');
  const { t } = useTranslation();
  const { userProfile } = useProfile();
  const toastIt = useAlertFunction();
  const [
    submitIt,
    { isSuccess, isError, error, reset },
  ] = useSubmitIdentification();

  const handleSubmit = useCallback(values => {
    toastIt('');
    submitIt(values);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toastIt(t('navigation.profile.sections.id.updateSuccessMsg'), 'green');
      // TODO -- update profile/storage
    } else if (isError) {
      toastIt(error?.message, 'red');
      reset();
    }
  }, [isSuccess, isError]);

  const initialValues: FarmerIdProps = useMemo(
    () => ({
      contactPersonGuid: userProfile?.guid || '',
      farmerId: userProfile?.farmerInfo?.farmerId || '',
      farmerPhotoUris: userProfile?.farmerInfo?.farmerPhotoUris || [],
    }),
    [],
  );

  return (
    <Form
      enableReinitialize
      useDefaultButtons
      title={t('navigation.profile.sections.id.formTitle')}
      initialValues={initialValues}
      validationSchema={FarmerIdSchema}
      onSubmit={handleSubmit}
      // persist={{ name: 'personal-identification'}}
    >
      <Field
        className="utl-input sm:w-3/5 md:w-2/5"
        name="farmerId"
        label={t('navigation.profile.sections.id.fields.nationalId.label')}
        placeholder={t(
          'navigation.profile.sections.id.fields.nationalId.placeholder',
        )}
      />
      <Dropzone
        name="farmerPhotoUris"
        uploadType="image"
        label={t('navigation.profile.sections.id.fields.photo.label')}
        placeholder={t(
          'navigation.profile.sections.id.fields.photo.placeholder',
        )}
      />
    </Form>
  );
}
