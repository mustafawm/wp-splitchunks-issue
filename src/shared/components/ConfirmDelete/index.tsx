import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';
import useOnEsc from 'shared/hooks/useOnEscPress';
import Trash from 'shared/svgs/Trash.svg';

type Props = {
  title?: string;
  message: string | ReactElement | ReactElement[];
  onYes?(): void;
  onNo?(): void;
  yesText?: string;
  noText?: string;
};

const sharedBtnClass = 'py-2 px-4 sm:px-6 border font-normal';

export default function ConfirmDeletetion(props: Props) {
  const { t } = useTranslation();
  const {
    title,
    message,
    onYes,
    onNo,
    yesText = t('common.yesDelete'),
    noText = t('common.noDelete'),
  } = props;
  useOnEsc(onNo);

  return (
    <Modal
      wrapperClass="flex flex-col justify-center"
      childClass="flex justify-center m-auto px-8 sm:px-10 rounded-sm"
    >
      <div className="flex flex-col items-start justify-around py-4">
        <div className="flex items-center">
          <span className="p-0 mr-2 flex justify-center items-center border rounded-full text-red-600 border-red-600">
            <Trash className="w-6 sm:w-8 h-6 sm:h-8 fill-current" />
          </span>
          <span className="text-xl text-black font-bold">{title}</span>
        </div>
        <div className="my-4 sm:my-6 text-gray-700 font-light">{message}</div>
        <div className="w-full flex justify-end">
          <Button
            data-testid="cancel-delete"
            color="white"
            onClick={onNo}
            text={noText}
            className={`${sharedBtnClass} mr-3 hover:bg-gray-100 hover:text-black`}
          />
          <Button
            data-testid="confirm-delete"
            color="red"
            onClick={onYes}
            text={yesText}
            className={sharedBtnClass}
          />
        </div>
      </div>
    </Modal>
  );
}
