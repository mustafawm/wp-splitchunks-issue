import React, { ReactElement, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import Dropdown from 'shared/components/Dropdown';
import ConfirmDelete from 'shared/components/ConfirmDelete';
import DetailsModalWrapper from 'shared/components/ProductInfo/DetailsModal/Wrapper';
import options from './options';
import { shouldDisableBtn } from './helpers';
import { Props, CurrentModal } from './types';

export default function Footer(props: Props) {
  const { transfer, onDiscard } = props;
  const { t } = useTranslation();
  const [currentModal, setCurrentModal] = useState<CurrentModal>('');

  const hideModal = useCallback(() => setCurrentModal(''), []);

  const handleDiscard = useCallback(() => {
    hideModal();
    onDiscard(transfer);
  }, [transfer.guid]);

  const handleActionClick = useCallback(
    (key: string): void => {
      if (['reject', 'details'].includes(key)) {
        setCurrentModal(key as CurrentModal);
      }
    },
    [transfer.guid],
  );

  const actions = options.map(opt => {
    return (
      <Button
        key={opt._key}
        color="white"
        className="w-full p-0 py-2"
        href={opt.url && opt.url(transfer)}
        disabled={shouldDisableBtn(opt, transfer)}
        onClick={(): void => handleActionClick(opt._key)}
      >
        <span className="flex items-center font-medium normal-case text-gray-700">
          <opt.Icon className="fill-current h-4 sm:h-5 w-4 sm:w-5 ml-2 sm:ml-4 mr-3 sm:mr-6" />
          <span className="text-black">{t(opt.display)}</span>
        </span>
      </Button>
    );
  });

  return (
    <>
      {currentModal === 'reject' && (
        <ConfirmDelete
          title={t('common.reject')}
          message={
            <span>
              <p className="mb-1">{t('requests.confirmRejectMsg')}</p>
              <p>{t('requests.confirmRejectMsg_1')}</p>
            </span>
          }
          onYes={handleDiscard}
          onNo={hideModal}
        />
      )}
      {currentModal === 'details' && (
        <DetailsModalWrapper
          onClose={hideModal}
          inventoryGuid={transfer.companyInventoryGuid}
        />
      )}
      <Dropdown
        btnContent={t('common.manage')}
        btnClassName="text-green-700 mx-auto"
        dataTestid={`${transfer?.companyProduct?.name}-manage`}
      >
        {actions as ReactElement[]}
      </Dropdown>
    </>
  );
}
