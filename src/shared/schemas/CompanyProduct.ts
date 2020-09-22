import * as Yup from 'yup';

const CompanyProductSchema = Yup.object({
  name: Yup.string().required('validation.required'),
  description: Yup.string().required('validation.required'),
  produceDate: Yup.date().required('validation.required'),
  availabilityDate: Yup.date()
    .required('validation.required')
    .when(
      'produceDate',
      (produceDate: Yup.WhenOptions<Date>, schema: Yup.DateSchema) => {
        return (
          produceDate &&
          schema.min(produceDate as Date, 'validation.cannotBeBeforeProduce')
        );
      },
    ),
  qualityCode: Yup.string().required('validation.required'),
  commonProductGuid: Yup.string().required('validation.required'),
  images: Yup.array().of(Yup.string()).nullable(),
  categories: Yup.array().of(Yup.string()).required('validation.required'),
});

export default CompanyProductSchema;
export type CompanyProductProps = {
  name: string;
  description: string;
  produceDate: string;
  availabilityDate: string;
  qualityCode: string;
  commonProductGuid: string;
  images?: string[];
  categories: string[];
};
