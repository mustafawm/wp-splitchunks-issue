import * as Yup from 'yup';

const CompanyLocationSchema = Yup.object({
  isPrimaryLocation: Yup.boolean(),
  locationType: Yup.string().required('validation.required'),
  name: Yup.string(),
  address1: Yup.string().required('validation.required'),
  address2: Yup.string(),
  countryCode: Yup.string(), // TODO -- curerently hardcoded
  area: Yup.string().required('validation.required'),
  subArea: Yup.string(),
  zipCode: Yup.string().required('validation.required'),
  location: Yup.array().compact().required('validation.required'),
  // latitude: Yup.number(),
  // longitude: Yup.string(),
});

export default CompanyLocationSchema;
export type CompanyLocProps = {
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
  location: [number, number];
};
