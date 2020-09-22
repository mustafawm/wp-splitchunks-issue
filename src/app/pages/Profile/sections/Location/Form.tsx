import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'shared/components/Form';
import Map from 'shared/components/Form/Map';
import Select from 'shared/components/Form/Select';
import Field from 'shared/components/Form/Field';
import AddressField from 'shared/components/Form/partials/Address';
import FarmSchema, { FarmProps } from 'shared/schemas/Farm';
import { url } from 'shared/consts';
import DeleteLoc from './Delete';
import { setInitialVals } from './helpers';
import { LocationForm as Props } from './types';

export default function LocationForm(props: Props) {
  const { t } = useTranslation();
  const {
    farmLoc,
    onSubmit,
    onDelete = (): void => undefined,
    isDeleting = false,
    onCancel,
  } = props;

  const handleSubmit = useCallback(onSubmit, []);
  const handleDelete = useCallback(() => {
    if (farmLoc?.guid) {
      onDelete(farmLoc.guid);
    }
  }, [farmLoc?.guid]);

  const countryCode = t('app.country.code');
  const initVals = setInitialVals(farmLoc as FarmProps, countryCode);

  return (
    <div
      className="relative mb-4"
      data-testid={farmLoc?.guid ? `${farmLoc?.name}` : 'new-loc'}
    >
      {farmLoc?.guid ? (
        <DeleteLoc isDeleting={isDeleting} onDelete={handleDelete} />
      ) : null}
      <Form
        enableReinitialize
        useDefaultButtons
        title={t('navigation.profile.sections.location.formTitle')}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        validationSchema={FarmSchema}
        initialValues={initVals}
      >
        <div className="utl-two-fields">
          <Field
            name="name"
            data-testid="locname"
            className="utl-input"
            label={t('form.business.company.name.label')}
            placeholder={t('form.business.company.name.placeholder')}
          />
          <Select
            name="locationType"
            className="utl-single-field"
            labelKey="name"
            valueKey="name"
            url={url.api.reference.locationType}
            label={t('form.address.locationType.label')}
            aria-label="location ownership"
          />
        </div>
        <AddressField />
        <Map name="location" label={t('form.address.map.label')} />
      </Form>
    </div>
  );
}
