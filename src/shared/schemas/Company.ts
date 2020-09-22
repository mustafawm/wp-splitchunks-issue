import * as Yup from 'yup';

const CompanySchema = Yup.object({
  name: Yup.string().required('validation.required'),
  description: Yup.string(),
  vatNumber: Yup.string().required('validation.required'),
  registrationDate: Yup.string().required('validation.required'),
});

export default CompanySchema;
export type CompanyProps = Yup.InferType<typeof CompanySchema> & {
  contactPersonGuid: string; // to be filled from previous req (createUser)
  businessType: string; // to be filled from previous page (onboarding page)
};
