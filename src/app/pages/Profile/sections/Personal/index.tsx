import React, { useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'shared/components/Form';
import usePageTitle from 'shared/hooks/usePageTitle';
import { useProfile } from 'shared/providers/auth';
import { useAlertFunction } from 'shared/providers/alert';
import UserSchema, { UserProps } from 'shared/schemas/User';
import PersonalDetailsFields from 'shared/components/Form/partials/Personal';
import { useSubmitProfile } from './useApi';

export default function PersonalDetailsForm() {
  usePageTitle('navigation.profile.sections.personal.pageTitle');
  const { t } = useTranslation();
  const { userProfile } = useProfile();
  const toastIt = useAlertFunction();
  const [submitIt, { isSuccess, isError, error }] = useSubmitProfile();

  const handleSubmit = useCallback(values => {
    toastIt('');
    submitIt(values);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toastIt(
        t('navigation.profile.sections.personal.updateSuccessMsg'),
        'green',
      );
    } else if (isError) {
      toastIt(error?.message, 'red');
    }
  }, [isSuccess, isError]);

  const initialValues: UserProps = useMemo(
    () => ({
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      email: userProfile?.email || '',
      phoneNumber: userProfile?.phoneNumber || '',
      dateOfBirth: userProfile?.dateOfBirth || '',
      role: userProfile?.role || 'Farmer',
    }),
    [JSON.stringify(userProfile)],
  );

  return (
    <Form
      useDefaultButtons
      enableReinitialize
      title={t('navigation.profile.sections.personal.formTitle')}
      persist={{ name: 'personal-details' }}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={UserSchema}
    >
      <PersonalDetailsFields />
    </Form>
  );
}
