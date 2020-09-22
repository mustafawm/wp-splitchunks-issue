import { Business } from './Business';
import { CompanyLocation } from './CompanyLocation';

export type Facility = {
  guid: string;
  name: string;
  description: string;
  vatNumber: string;
  registrationDate: string;
  businessType: Business;
  images: [string];
  contactPersonDisplayName: string;
  contactPersonEmail: string;
  contactPersonPhoneNumber: string;
  locations: Omit<CompanyLocation, 'location'> &
    {
      latitude: number;
      longitude: number;
    }[];
};
