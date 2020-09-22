/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { ErrResp } from 'shared/types';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';
import { FarmProps } from 'shared/schemas/Farm';

function prepareLatLng(data: FarmProps) {
  if (!Array.isArray(data?.location)) {
    return data;
  }
  const [latitude, longitude] = data.location;
  const newData = { ...data, latitude, longitude };
  delete newData.location;
  return newData;
}

export function useSubmitLocation(companyGuid: string) {
  const locationsQueryKey = queryKeys.companyLocations(companyGuid);

  function submitIt(values: FarmProps) {
    const data = Object.assign(values);
    if (data.guid && data.guid.length !== 36) {
      delete data.guid; // added in onMutate
    }
    return httpClient.put(
      url.api.profile.companyInfoLoc(companyGuid),
      prepareLatLng(data),
    );
  }

  return useMutation<any, ErrResp, FarmProps>(submitIt, {
    onMutate: (data: FarmProps) => {
      const locData = prepareLatLng(data);
      queryCache.cancelQueries(locationsQueryKey);
      const snapshot = queryCache.getQueryData(locationsQueryKey);
      queryCache.setQueryData(locationsQueryKey, (prev: FarmProps[] = []) => {
        if (data.guid) {
          return prev.map(loc => {
            if (loc.guid === data.guid) {
              return { ...loc, ...locData };
            }
            return loc;
          });
        }
        locData.guid = String(Date.now());
        return [...prev, locData];
      });
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(locationsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(locationsQueryKey),
  });
}

export function useDeleteLocation(companyGuid: string) {
  const locationsQueryKey = queryKeys.companyLocations(companyGuid);

  function deleteIt(locationGuid: string) {
    return httpClient.delete(
      `${url.api.profile.companyInfoLoc(companyGuid)}/${locationGuid}`,
    );
  }

  return useMutation<any, ErrResp, string>(deleteIt, {
    onMutate: locationGuid => {
      queryCache.cancelQueries(locationsQueryKey);
      const snapshot = queryCache.getQueryData(locationsQueryKey);
      queryCache.setQueryData(locationsQueryKey, (prev: FarmProps[] = []) =>
        prev.filter(loc => loc.guid !== locationGuid),
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(locationsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(locationsQueryKey),
  });
}
