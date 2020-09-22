import React from 'react';
import Card from 'shared/components/Card';
import { Facility } from 'shared/types';
import Body from './Body';
import Footer from './Footer';

export default function FacilityCard(props: { facility: Facility }) {
  const { facility } = props;

  return (
    <Card
      name={facility.name}
      images={facility.images}
      Body={<Body facility={facility} />}
      Footer={<Footer facility={facility} />}
    />
  );
}
