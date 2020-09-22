import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import ConfirmDeletetion from 'shared/components/ConfirmDelete';
import Trash from 'shared/svgs/Trash.svg';
import { DeleteLocProps as Props } from './types';

export default function DeleteLoc(props: Props) {
  const { isDeleting, onDelete } = props;
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
        className="absolute right-0 p-0 mt-1 text-red-600 border border-red-600 hover:border-red-700 rounded-full"
        data-testid="del-loc"
      >
        <Trash className="w-6 sm:w-8 h-6 sm:h-6 fill-current" />
      </Button>
      {showModal && (
        <ConfirmDeletetion
          title={t('common.delete')}
          message={t('navigation.profile.sections.location.confirmDeleteMsg')}
          onYes={handleDelete}
          onNo={(): void => setShowModal(false)}
        />
      )}
    </>
  );
}
