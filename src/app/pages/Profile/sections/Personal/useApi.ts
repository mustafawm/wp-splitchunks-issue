/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import httpClient from 'shared/services/api';
import { url } from 'shared/consts';
import { ErrResp, AppUser } from 'shared/types';
import { useProfile } from 'shared/providers/auth';
import { UserProps } from 'shared/schemas/User';

export function useSubmitProfile() {
  const { userProfile, setUserProfile } = useProfile();

  function submitIt(values: UserProps) {
    return httpClient.put(url.api.profile.root, values);
  }
  return useMutation<any, ErrResp, UserProps>(submitIt, {
    onMutate: (values: UserProps) => {
      const snapShot = Object.assign({}, userProfile);
      setUserProfile(values);
      return snapShot;
    },
    onError: (err, data, snapShot) =>
      setUserProfile(snapShot as Partial<AppUser>),
  });
}
