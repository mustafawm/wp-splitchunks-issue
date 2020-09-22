import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { queryKeys, url } from 'shared/consts';
import Accordion from 'shared/components/Accordion';
import { useUserCompanyGuid } from 'shared/providers/auth';
import { CertificateProps } from 'shared/schemas/Certificate';
import ItemsStack from 'shared/components/ItemsStack';
import usePageTitle from 'shared/hooks/usePageTitle';
import LoadingCerts from './Loading';
import Form from './Form';
import { useSubmitCertificate, useDeleteCertificate } from './useApi';

export default function Certificates() {
  usePageTitle('navigaion.profile.sections.certification.pageTitle');
  const { t } = useTranslation();
  const companyGuid = useUserCompanyGuid();
  const [submitIt, submitRes] = useSubmitCertificate(companyGuid);
  const [deleteIt, deleteRes] = useDeleteCertificate(companyGuid);
  const handleSubmit = useCallback(values => submitIt(values), []);
  const handleDelete = useCallback(deleteIt, []);

  return (
    <ItemsStack<CertificateProps>
      addText={t('navigation.profile.sections.cert.addCertificate')}
      queryKey={queryKeys.certificates(companyGuid)}
      fetchUrl={url.api.company.certificates(companyGuid)}
      LoadingPlaceholder={<LoadingCerts />}
      submitResult={submitRes}
      deleteResult={deleteRes}
      submitMsg={t('navigation.profile.sections.cert.certSubmittedMsg')}
      deleteMsg={t('navigation.profile.sections.cert.certDeletedMsg')}
    >
      {({ items, isAddingItem, onCancel }) => {
        return (
          <div className="flex flex-col w-full">
            {isAddingItem && (
              <Form onSubmit={handleSubmit} onCancel={onCancel} />
            )}
            {items.map((cert: CertificateProps) => (
              <div key={cert.name} className="mb-2">
                <Accordion name={cert.name} title={cert.name}>
                  <Form
                    data={cert}
                    onDelete={handleDelete}
                    onSubmit={handleSubmit}
                    isDeleting={deleteRes.isLoading}
                  />
                </Accordion>
              </div>
            ))}
          </div>
        );
      }}
    </ItemsStack>
  );
}
