import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';
import Share from 'shared/svgs/SafariShare.svg';

export default function InstallOnIOS({ onClose }: { onClose(): void }) {
  const { t } = useTranslation();

  return (
    <Modal childClass="w-full" onClose={onClose}>
      <div className="fixed bottom-0 w-full bg-white h-40">
        <span className="flex flex-col item-start p-4 text-lg leading-5 gap-2">
          <span>{t('app.iosFollowSteps')}</span>
          <span className="flex flex-col gap-1">
            <span className="flex items-center">
              {`${t('app.step1')} `}
              <span className="text-black mx-1">
                <Share className="fill-current w-8 h-8" />{' '}
              </span>
            </span>
            <span className="flex items-center">
              {`${t('app.step2_A')} `}
              <span className="font-semibold mx-1">{t('app.step2_B')}</span>
            </span>
          </span>
        </span>
        <span
          style={{ right: '48.5%' }}
          className="absolute bottom-0 text-gray-800"
        >
          ▼
        </span>
      </div>
    </Modal>
  );
}
