/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, memo } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import Map, { Props as MapProps } from 'shared/components/Map';
import useUserLocation from 'shared/hooks/useUserLocation';
import FormField from '../Field';
import { SingleFieldProps } from '../types';

type Props = SingleFieldProps & MapProps;

const isLocationSet = (loc: [number, number]): boolean =>
  Boolean(Array.isArray(loc) && loc[0] && loc[0] !== 0);

const MapField = memo((props: MapProps) => <Map {...props} />);

export default function FormMapField(props: Props) {
  const { t } = useTranslation();
  const { name, label, wrapperClassName = 'w-full', ...mapProps } = props;
  const [field, , helpers] = useField(name);
  const defaultCoords = [t('app.location.lat'), t('app.location.lng')].map(
    Number,
  );
  const [userLat, userLng] = useUserLocation(defaultCoords);

  const [lat, lng] = isLocationSet(field.value)
    ? field.value
    : [userLat, userLng];

  const handleMarkerMove = useCallback((lat: number, lng: number): void => {
    helpers.setValue([lat, lng]);
  }, []);

  return (
    <FormField name={name} label={label} wrapperClassName={wrapperClassName}>
      <MapField
        lat={lat}
        lng={lng}
        onMarkerMove={handleMarkerMove}
        {...mapProps}
      />
    </FormField>
  );
}
