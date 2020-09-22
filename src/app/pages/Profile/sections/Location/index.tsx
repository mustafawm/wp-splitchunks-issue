import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { queryKeys, url } from 'shared/consts';
import { FarmProps } from 'shared/schemas/Farm';
import Accordion from 'shared/components/Accordion';
import usePageTitle from 'shared/hooks/usePageTitle';
import ItemsStack from 'shared/components/ItemsStack';
import { useUserCompanyGuid } from 'shared/providers/auth';
import LoadingForm from 'shared/components/LoadingForm';
import Form from './Form';
import Header from './AccordionHeader';
import { useDeleteLocation, useSubmitLocation } from './useApi';

export default function Locations() {
  usePageTitle('navigation.profile.sections.location.pageTitle');
  const { t } = useTranslation();
  const companyGuid = useUserCompanyGuid();
  const [submitIt, submitResult] = useSubmitLocation(companyGuid);
  const [deleteIt, deleteResult] = useDeleteLocation(companyGuid);
  const handleSubmit = useCallback(submitIt, []);
  const handleDelete = useCallback(deleteIt, []);

  return (
    <ItemsStack<FarmProps>
      queryKey={queryKeys.companyLocations(companyGuid)}
      fetchUrl={url.api.company.locations(companyGuid)}
      LoadingPlaceholder={<LoadingForm />}
      submitResult={submitResult}
      deleteResult={deleteResult}
      addText={t('navigation.profile.sections.location.addLocationBtn')}
      submitMsg={t('navigation.profile.sections.location.locationSubmittedMsg')}
      deleteMsg={t('navigation.profile.sections.location.locationDeletedMsg')}
    >
      {({ items, isAddingItem, onCancel }) => (
        <div className="flex flex-col w-full">
          {isAddingItem && <Form onSubmit={handleSubmit} onCancel={onCancel} />}
          {items.map((loc: FarmProps) => (
            <div key={loc.guid} className="mb-2">
              <Accordion
                name={loc.name}
                title={<Header loc={loc} />}
                isOpen={loc.isPrimaryLocation}
              >
                <Form
                  farmLoc={loc}
                  onDelete={handleDelete}
                  onSubmit={handleSubmit}
                  isDeleting={deleteResult.isLoading}
                />
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </ItemsStack>
  );
}
