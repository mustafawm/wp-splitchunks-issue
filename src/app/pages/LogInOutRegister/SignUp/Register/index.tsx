import React from 'react';
import AddressAndLocFields from './partials/AddressAndLocFields';

export default function Register() {
  return (
    <AddressAndLocFields className="mt-3 md:mt-5" schemaPrefix="companyLoc" />
  );
}
