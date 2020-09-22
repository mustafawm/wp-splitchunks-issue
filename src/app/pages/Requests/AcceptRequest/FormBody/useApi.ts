/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { queryKeys, url } from 'shared/consts';
import { ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';
import { useUserCompanyGuid } from 'shared/providers/auth';
import useFetchOptions from 'shared/hooks/useFetchOptions';

export function useFetchCurrentTransfer() {
  const companyGuid = useUserCompanyGuid();
  const { transferGuid } = useParams();

  return useQuery<any, ErrResp>({
    queryKey: queryKeys.transfer(transferGuid),
    queryFn: () =>
      httpClient.get(
        `${url.api.company.transfer(companyGuid)}/${transferGuid}`,
      ),
    config: {
      refetchOnWindowFocus: false,
    },
  });
}

export function useGetLocationName(locationGuid: string): string {
  let locationName = '';
  const companyGuid = useUserCompanyGuid();
  const { options } = useFetchOptions({
    url: url.api.company.locations(companyGuid),
    labelKey: 'name',
    valueKey: 'guid',
  });

  if (Array.isArray(options)) {
    const location = options.find(loc => loc.value === locationGuid);
    locationName = location?.label || '';
  }

  return locationName;
}
