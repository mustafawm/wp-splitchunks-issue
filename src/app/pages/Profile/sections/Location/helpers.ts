import { FarmProps } from 'shared/schemas/Farm';

export function setInitialVals(
  farmLoc: FarmProps,
  countryCode: string,
): FarmProps {
  return {
    countryCode,
    isPrimaryLocation: false,
    locationType: '',
    name: '',
    address1: '',
    address2: '',
    area: '',
    subArea: '',
    zipCode: '',
    location: [farmLoc?.latitude, farmLoc?.longitude],
    latitude: 0,
    longitude: 0,
    ...farmLoc,
  };
}
