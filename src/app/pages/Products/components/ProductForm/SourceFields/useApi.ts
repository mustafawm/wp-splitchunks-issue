/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { url, queryKeys } from 'shared/consts';
import { InventoryPrdocut, Option, ErrResp } from 'shared/types';
import httpClient from 'shared/services/api';
import { prepareFormater } from 'shared/hooks/useFetchOptions/helpers';

export function useFetchSourceProducts(
  companyGuid: string,
): {
  isLoading: boolean;
  error: ErrResp;
  data: InventoryPrdocut[];
  options: Option[];
} {
  const formatOptions = prepareFormater(
    'companyProduct.name',
    'companyInventoryGuid',
  );
  const { data = [], isLoading, error } = useQuery<any, ErrResp>({
    queryKey: queryKeys.sourceProducts(companyGuid),
    queryFn: () =>
      httpClient.get(`${url.api.company.inventory(companyGuid)}?min=1`),
    config: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  });

  return {
    isLoading,
    options: formatOptions(data || []),
    data,
    error,
  };
}
