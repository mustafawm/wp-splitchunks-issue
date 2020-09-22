/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, queryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { url, queryKeys } from 'shared/consts';
import { Facility, ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';

function updateFacilitiesCache(facility: Facility): void {
  if (!facility) {
    return;
  }
  queryCache.setQueryData(queryKeys.facilities(), cached => {
    if (!cached || !Array.isArray(cached)) {
      return cached;
    }
    return cached.map((f: Facility) => {
      if (f.guid === facility.guid) {
        return facility;
      }
      return f;
    });
  });
}

export function useFetchFacilityDetails(facility?: Facility) {
  const { companyGuid = '' } = useParams();
  const queryKey = queryKeys.facility(companyGuid);

  return useQuery<any, ErrResp>({
    queryKey,
    queryFn: () => httpClient.get(url.api.company.info(companyGuid)),
    config: {
      onSuccess: updateFacilitiesCache,
      refetchOnWindowFocus: false,
      initialData: () => {
        if (facility) {
          return facility;
        }
        const facilities: Facility[] =
          queryCache.getQueryData(queryKeys.facilities(companyGuid)) || [];
        return facilities.find(facility => facility.guid === companyGuid);
      },
      initialStale: true,
    },
  });
}
