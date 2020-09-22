import React from 'react';
import { Facility } from 'shared/types';
import usePageTitle from 'shared/hooks/usePageTitle';
import LoadingCard from 'shared/components/Card/Loading';
import FacilityCard from './components/FacilityCard';
import { useFetchFacilities } from './useApi';

export default function PickFacility() {
  usePageTitle('pickFacility.pageTitle');
  const { isLoading, data, error } = useFetchFacilities();

  const facilities: Facility[] = data || [];

  if (error) {
    return <div className="utl-error">{error?.message}</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        <LoadingCard amount={3} />
      ) : (
        facilities.map(facility => (
          <FacilityCard key={facility.guid} facility={facility} />
        ))
      )}
    </div>
  );
}
