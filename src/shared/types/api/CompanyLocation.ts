import { CompanyLocProps } from 'shared/schemas/CompanyLocation';
import { LocationType } from './LocationType.enum';

export type CompanyLocation = Omit<
  CompanyLocProps,
  'location' | 'locationType'
> & {
  locationType: LocationType;
  latitude: number;
  longitude: number;
  guid: string;
};
