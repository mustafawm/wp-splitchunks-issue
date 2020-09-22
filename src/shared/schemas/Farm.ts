import * as Yup from 'yup';

const FarmSchema = Yup.object({
  isPrimaryLocation: Yup.boolean(),
  locationType: Yup.string().required('validation.required'),
  name: Yup.string().required('validation.required'),
  address1: Yup.string().required('validation.required'),
  address2: Yup.string().ensure(),
  countryCode: Yup.string().required('validation.required'),
  area: Yup.string().required('validation.required'),
  subArea: Yup.string().ensure(),
  zipCode: Yup.string().required('validation.required'),
  location: Yup.array().compact().required('validation.required'), // to extract lat/lng from
  latitude: Yup.number(),
  longitude: Yup.number(),
});

export default FarmSchema;
export type FarmProps = {
  guid: string;
  countryCode: string;
  isPrimaryLocation: boolean;
  locationType: string;
  name: string;
  address1: string;
  address2: string;
  area: string;
  subArea: string;
  zipCode: string;
  location: [number, number]; // ?
};
