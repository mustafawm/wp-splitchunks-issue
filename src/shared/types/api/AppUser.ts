import { Business } from './Business';
import { UserRole } from './UserRole.enum';
import { ProfileStatus } from './ProfileStatus';

export type AppUser = {
  guid: string;
  firstName: string;
  lastName: string;
  isProfileComplete: ProfileStatus;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  role: UserRole;
  companyInfo: {
    name: string;
    description: string;
    vatNumber: string;
    registrationDate: string;
    businessType: Business;
    guid: string;
  };
  farmerInfo: {
    farmerId: string;
    farmerPhotoUris: string[];
  };
};
