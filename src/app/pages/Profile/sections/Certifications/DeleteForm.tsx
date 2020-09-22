import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import ConfirmDeletetion from 'shared/components/ConfirmDelete';
import Trash from 'shared/svgs/Trash.svg';
import { DeleteFormProps as Props } from './types';

export default function DeleteSection(props: Props) {
  const { onDelete, isDeleting } = props;
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const handleDelete = useCallback(() => {
    onDelete();
    setShowModal(false);
  }, []);

  return (
    <>
      <Button
        color="white"
        disabled={isDeleting}
        title={t('common.remove')}
        onClick={(): void => setShowModal(true)}
        data-testid="del-cert"
        className="absolute right-0 p-0 mt-1 text-red-600 border border-red-600 rounded-full hover:border-red-700"
      >
        <Trash className="w-6 h-6 fill-current sm:w-8 sm:h-6" />
      </Button>
      {showModal && (
        <ConfirmDeletetion
          title={t('common.delete')}
          message={
            <span>
              <p className="mb-1">
                {t('navigation.profile.sections.cert.confirmDeleteMsg')}
              </p>
              <p>{t('navigation.profile.sections.cert.confirmDeleteMsg_1')}</p>
            </span>
          }
          onYes={handleDelete}
          onNo={(): void => setShowModal(false)}
        />
      )}
    </>
  );
}
