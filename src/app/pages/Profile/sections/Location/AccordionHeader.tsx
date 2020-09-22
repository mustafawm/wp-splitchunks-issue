import React from 'react';
import { FarmProps } from 'shared/schemas/Farm';

type Props = {
  loc: FarmProps;
};

export default function LocationHeader(props: Props) {
  const { loc } = props;

  return (
    <div className="flex">
      <div className="mr-2">{loc.name}</div>
      <div className="text-xs">({loc.address1})</div>
    </div>
  );
}
