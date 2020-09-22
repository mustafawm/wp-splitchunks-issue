import React from 'react';
import Card from 'shared/components/Card';
import Body from './Body';
import Footer from './Footer';
import { Props } from './types';

export default function PublishedCard(props: Props) {
  const { transfer, onCancel } = props;

  return (
    <Card
      name={transfer?.companyProduct?.name}
      images={transfer?.companyProduct?.images}
      Body={<Body product={transfer} />}
      Footer={<Footer transfer={transfer} onCancel={onCancel} />}
    />
  );
}
