import * as Yup from 'yup';
import { UserRole } from 'shared/types';

const UserSchema = Yup.object({
  firstName: Yup.string().required('validation.required'),
  lastName: Yup.string().required('validation.required'),
  email: Yup.string()
    .email('validation.notEmail')
    .required('validation.required'),
  phoneNumber: Yup.string()
    .required('validation.required')
    .typeError('validation.mustBeNumber'),
  dateOfBirth: Yup.string().required('validation.required'),
  role: Yup.string().required('validation.required'),
  // address: Yup.object().shape({
  //   country: Yup.string(),
  //   state: Yup.string(),
  //   city: Yup.string(),
  //   province: Yup.string(),
  //   streetName: Yup.string(),
  //   streetNo: Yup.string(),
  //   zipCode: Yup.string(),
  // }),
});

export default UserSchema;
export type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  role: UserRole;
};
