import * as Yup from 'yup';
import UserSchema from 'shared/schemas/User';
import CompanySchema from 'shared/schemas/Company';
import CompanyLocSchema from 'shared/schemas/CompanyLocation';

export const RegisterationSchema = Yup.object({
  user: UserSchema,
  company: CompanySchema,
  companyLoc: CompanyLocSchema,
});

export const initVals = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    dateOfBirth: '',
  },
  company: {
    contactPersonGuid: '', // filled once user ☝️ is created
    name: '',
    description: '',
    vatNumber: '',
    registrationDate: '',
    businessType: '',
  },
  companyLoc: {
    isPrimaryLocation: true, // TODO
    locationType: '',
    name: '', // TODO same as company name ☝️ ¯\_(ツ)_/¯
    address1: '',
    address2: '',
    countryCode: '',
    area: '',
    subArea: '',
    zipCode: '',
    location: [],
    // latitude: 0,
    // longitude: 0,
  },
};
