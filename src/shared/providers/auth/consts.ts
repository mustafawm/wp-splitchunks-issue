import { UserRole, Business } from 'shared/types';

export const userProfileTemplate = {
  guid: '',
  firstName: '',
  lastName: '',
  isProfileComplete: undefined,
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  role: UserRole.Farmer,
  companyInfo: {
    name: '',
    description: '',
    vatNumber: '',
    registrationDate: '',
    businessType: Business.Farm,
    guid: '',
  },
  farmerInfo: {
    farmerId: '',
    farmerPhotoUris: [],
  },
};
