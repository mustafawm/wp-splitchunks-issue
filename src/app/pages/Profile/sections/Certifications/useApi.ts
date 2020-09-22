/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, queryCache } from 'react-query';
import { FormikValues } from 'formik';
import { ErrResp } from 'shared/types';
import { url, queryKeys } from 'shared/consts';
import httpClient from 'shared/services/api';
import { CertificateProps } from 'shared/schemas/Certificate';

export function useSubmitCertificate(companyGuid: string) {
  const certsQueryKey = queryKeys.certificates(companyGuid);

  function submitIt(values: FormikValues) {
    if (values.guid.length !== 36) {
      delete values.guid;
    }
    return httpClient.put(url.api.profile.certificate(companyGuid), values);
  }

  return useMutation<any, ErrResp, CertificateProps>(submitIt, {
    onMutate: (data: CertificateProps) => {
      queryCache.cancelQueries(certsQueryKey);
      const snapshot = queryCache.getQueryData(certsQueryKey);
      queryCache.setQueryData(
        certsQueryKey,
        (prev: CertificateProps[] = []) => {
          if (data.guid) {
            return prev.map(cert => {
              if (cert.guid === data.guid) {
                return data;
              }
              return cert;
            });
          }
          data.guid = String(Date.now());
          return [...prev, data];
        },
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(certsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(certsQueryKey),
  });
}

export function useDeleteCertificate(companyGuid: string) {
  const certsQueryKey = queryKeys.certificates(companyGuid);

  function deleteit(guid: string) {
    return httpClient.delete(
      `${url.api.profile.certificate(companyGuid)}/${guid}`,
    );
  }

  return useMutation<any, ErrResp, string>(deleteit, {
    onMutate: certGuid => {
      queryCache.cancelQueries(certsQueryKey);
      const snapshot = queryCache.getQueryData(certsQueryKey);
      queryCache.setQueryData(certsQueryKey, (prev: CertificateProps[] = []) =>
        prev.filter(cert => cert.guid !== certGuid),
      );
      return snapshot;
    },
    onError: (error, data, snapshot) =>
      queryCache.setQueryData(certsQueryKey, snapshot),
    onSettled: () => queryCache.invalidateQueries(certsQueryKey),
  });
}
