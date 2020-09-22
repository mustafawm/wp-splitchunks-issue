import { FunctionComponent, SVGAttributes } from 'react';
import Farmer from 'shared/svgs/Farmer.svg';
import Processor from 'shared/svgs/Processor.svg';
import Packhouse from 'shared/svgs/Packhouse.svg';
import { Business } from 'shared/types';

type BusinessOpt = {
  display: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>>;
};

export const businessIconMap: Record<Business, BusinessOpt> = {
  Farm: {
    display: 'Farm',
    icon: Farmer,
  },
  ProcessingUnit: {
    display: 'Processing',
    icon: Processor,
  },
  PackhouseUnit: {
    display: 'Packhouse',
    icon: Packhouse,
  },
};
