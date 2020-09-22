import React from 'react';
import { Facility } from 'shared/types';
import BusinessType from 'shared/components/BusinessType';

export default function Body(props: { facility: Facility }) {
  const { facility } = props;

  return (
    <span className="text-gray-600">
      <h3 className="text-gray-900 mb-2">{facility.name}</h3>
      <div>{facility?.locations[0]?.name}</div>
      <div className="text-xs my-2 sm:my-3">{facility.description}</div>
      <BusinessType type={facility.businessType} />
    </span>
  );
}
