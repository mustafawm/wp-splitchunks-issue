import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import LogoutIcon from 'shared/svgs/Logout.svg';
import LogoutButton from './LogoutButton';

export default function LogoutPopup() {
  const { t } = useTranslation();
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <Button
        color="white"
        title="Logout"
        className="font-normal text-sm p-0 pl-4"
        onClick={() => setIsShown(true)}
      >
        <span className="text-gray-900">
          <LogoutIcon className="w-5 h-4 fill-current" />
        </span>
      </Button>
      {isShown && (
        <Modal
          childClass="w-full max-w-lg md:max-w-3xl"
          wrapperClass="w-full flex justify-center items-center"
        >
          <div className="py-5 flex flex-col justify-center items-center">
            <p className="mb-4">{t('app.confirmLogout')}</p>
            <span>
              <LogoutButton
                text={t('common.yesLogout')}
                color="blue"
                onClick={() => setIsShown(false)}
                className="py-2 px-4 sm:px-6 border font-normal"
              />
              <Button
                color="white"
                onClick={() => setIsShown(false)}
                text={t('common.cancel')}
                className="py-2 px-4 font-normal mr-3 underline"
              />
            </span>
          </div>
        </Modal>
      )}
    </>
  );
}
