import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import { Facility } from 'shared/types';
import { getAddressString } from 'shared/utils/ui';
import Map from 'shared/components/Map';
import BusinessType from 'shared/components/BusinessType';
import LoadingBox from './Loading';
import { useFetchFacilityDetails } from './useApi';

export default function FacilityDetails() {
  const { t } = useTranslation();
  const { state } = useLocation() as Location<{ facility: Facility }>;
  const { isLoading, data, error } = useFetchFacilityDetails(state?.facility);

  if (error) {
    return <div className="utl-error">{error?.message}</div>;
  }
  if (!data && isLoading) {
    return <LoadingBox />;
  }
  return (
    <div className="p-3 md:p-5 mr-0 sm:mr-3 shadow-md border-t border-gray-100">
      <span className="flex justify-between">
        <h2>{data.name}</h2>
      </span>
      <div className="my-2">
        <BusinessType type={data.businessType} />
      </div>
      <div className="text-gray-700">Address</div>
      <div>{getAddressString(data?.locations[0])}</div>
      <Map
        className="mt-2"
        lat={data.locations[0]?.latitude}
        lng={data.locations[0]?.longitude}
      />
      <div className="border-t border-gray-300 my-3" />
      <div>
        <h5 className="text-gray-700">
          {t('products.sendProduct.contactPerson')}
        </h5>
        <div className="flex justify-between text-lg">
          <span>{data.contactPersonDisplayName}</span>
          <a href={`tel:${data.contactPersonPhoneNumber}`}>
            {data.contactPersonPhoneNumber}
          </a>
        </div>
      </div>
    </div>
  );
}
