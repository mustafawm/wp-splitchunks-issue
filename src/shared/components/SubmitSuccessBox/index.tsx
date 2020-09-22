import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import Party from 'shared/svgs/Party.svg';
import { Props } from './types';

export default function SubmitSuccessBox(props: Props) {
  const {
    message,
    primaryBtnText,
    primaryHref,
    secondaryBtnText,
    secondaryHref,
  } = props;
  const { t } = useTranslation();

  return (
    <Modal
      childClass="w-full max-w-md"
      wrapperClass="w-full flex justify-center items-center"
    >
      <div className="flex flex-col justify-center mx-auto p-8 h-full items-center">
        <span className="bg-green-100 rounded-full p-3">
          <span className="text-green-700">
            <Party className="w-10 h-10 fill-current" />
          </span>
        </span>
        <h3 className="my-4">{t('common.submitted')}</h3>
        <span>{message}</span>
        <Button
          color="green"
          className="mt-4 px-16"
          text={primaryBtnText}
          href={primaryHref}
          dataTestid="go-to-primary"
        />
        <Button
          color="white"
          className="mt-2 normal-case underline text-gray-900 font-normal"
          text={secondaryBtnText}
          href={secondaryHref}
          dataTestid="go-to-secondary"
        />
      </div>
    </Modal>
  );
}
