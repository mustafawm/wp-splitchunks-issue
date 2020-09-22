/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import { url } from 'shared/consts';
import { ErrResp, AppUser } from 'shared/types';
import httpClient from 'shared/services/api';
import { useProfile } from 'shared/providers/auth';
import { FarmerIdProps } from 'shared/schemas/FarmerIdentification';

export function useSubmitIdentification() {
  const { userProfile, setUserProfile } = useProfile();

  function submitIt(values: FarmerIdProps) {
    return httpClient.put(url.api.profile.farmerInfo, values);
  }
  return useMutation<any, ErrResp, FarmerIdProps>(submitIt, {
    onMutate: (values: FarmerIdProps) => {
      const snapShot = Object.assign({}, userProfile);
      setUserProfile({
        farmerInfo: {
          ...snapShot.farmerInfo,
          farmerId: values?.farmerId,
          farmerPhotoUris: values?.farmerPhotoUris,
        },
      });
      return snapShot;
    },
    onError: (err, data, snapShot) =>
      setUserProfile(snapShot as Partial<AppUser>),
  });
}
