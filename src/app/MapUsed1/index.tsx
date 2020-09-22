import React from 'react';
import { lazyLoad } from 'shared/utils/ui';
const LocationForm = lazyLoad(() => import('shared/components/Form/Map'));

export default function MapUsed1() {
  return <LocationForm />;
}
