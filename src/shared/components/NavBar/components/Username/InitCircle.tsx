import React from 'react';
import { useProfile } from 'shared/providers/auth';
import InitialsCircle from 'shared/components/InitialsCircle';
import { stringWithMaxChar } from 'shared/utils/string';

const FullnameMaxChars = 13;
function getDisplayName(firstName: string, lastName: string): string {
  const fullname = `${firstName} ${lastName}`;
  if (fullname.length <= FullnameMaxChars) {
    return fullname;
  } else if (firstName.length <= FullnameMaxChars) {
    return firstName;
  }

  return stringWithMaxChar(firstName, FullnameMaxChars);
}

export default function InitsCircle() {
  const { userProfile } = useProfile();
  const { firstName = '', lastName = '' } = userProfile;

  return (
    <>
      <InitialsCircle
        className="truncate-1-line mx-2 w-8 h-8 font-light"
        firstName={firstName}
        lastName={lastName}
      />
      <span className="truncate-1-line text-sm" data-testid="username-nav">
        {getDisplayName(firstName, lastName)}
      </span>
    </>
  );
}
