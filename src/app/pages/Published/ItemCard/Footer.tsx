import React, { useCallback, useState, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { TransferStatus } from 'shared/types';
import Button from 'shared/components/Button';
import Dropdown from 'shared/components/Dropdown';
import ConfirmDelete from 'shared/components/ConfirmDelete';
import DetailsModalWrapper from 'shared/components/ProductInfo/DetailsModal/Wrapper';
import options from './options';
import { shouldDisableBtn } from './helpers';
import { Props } from './types';

export default function Footer(props: Props) {
  const { transfer, onCancel } = props;
  const { t } = useTranslation();
  const [currentModal, setCurrentModal] = useState<'cancel' | 'details' | ''>(
    '',
  );

  const hideModal = useCallback(() => setCurrentModal(''), []);
  const handleCancel = useCallback(() => {
    hideModal();
    onCancel(transfer);
  }, [transfer.guid]);
  const handleActionClick = useCallback(
    (key: string): void => {
      if (['cancel', 'details'].includes(key)) {
        // @ts-ignore
        setCurrentModal(key);
      }
    },
    [transfer.guid],
  );

  const actions = options.map(opt => {
    if (opt._key === 'hr') {
      return <hr key={opt._key} />;
    }
    if (opt._key === 'update' && transfer.status === TransferStatus.Publish) {
      return null;
    }
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
          <opt.Icon className="fill-current h-5 w-5 mx-5" />
          <span className="text-black">{t(opt.display)}</span>
        </span>
      </Button>
    );
  });

  return (
    <>
      {currentModal === 'cancel' && (
        <ConfirmDelete
          title={t('common.cancel')}
          message={
            <span>
              <p className="mb-1">{t('published.confirmCancelMsg')}</p>
              <p>{t('published.confirmCancelMsg_1')}</p>
            </span>
          }
          onYes={handleCancel}
          onNo={hideModal}
          yesText={t('published.yesCancel')}
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
