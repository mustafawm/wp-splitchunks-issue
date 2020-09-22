import * as Yup from 'yup';
// import { WhenOptions, DateSchema } from 'yup';

const CertificateSchema = Yup.object({
  name: Yup.string().required('validation.required'),
  type: Yup.string().required('validation.required'),
  description: Yup.string().nullable(),
  status: Yup.string().nullable(),
  certificationBodyGuid: Yup.string().nullable(),
  issuedDate: Yup.date().required('validation.required'),
  expiredDate: Yup.date()
    .required('validation.required')
    .when(
      'issuedDate',
      (issuedDate: Yup.WhenOptions<Date>, schema: Yup.DateSchema) => {
        return (
          issuedDate &&
          schema.min(issuedDate as Date, 'validation.cannotBeBeforeIssue')
        );
      },
    ),
  certificateFiles: Yup.array()
    .of(Yup.string())
    .required('validation.required'),
});

export default CertificateSchema;
export type CertificateProps = {
  guid?: string;
  name: string;
  type: string;
  description: string;
  status: string;
  certificationBodyGuid: string;
  issuedDate: string;
  expiredDate: string;
  certificateFiles: string[];
};
