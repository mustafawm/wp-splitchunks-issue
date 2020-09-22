import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { Props } from './types';

export default function SubmitCancelButtons(props: Props) {
  const { t } = useTranslation();

  const handleCancel = (): void => {
    if (props.onCancel) {
      props.resetForm();
      props.onCancel();
    }
  };

  const submitClass = classNames(
    'sm:w-auto px-8',
    props.onCancel ? 'w-3/5' : 'w-full',
  );

  return (
    <div className="my-2 mx-0">
      <hr />
      <div className="flex flex-row-reverse justify-between mt-2">
        <Button
          type="submit"
          color="green"
          className={submitClass}
          disabled={props.isSubmitting}
          text={props.submitText || t('common.submit')}
        />
        {props.onCancel && (
          <Button
            text={props.cancelText || t('common.cancel')}
            color="white"
            type="button"
            onClick={handleCancel}
            className="mr-2 border w-2/5 sm:w-auto px-8"
            data-testid="cancel-btn"
          />
        )}
      </div>
    </div>
  );
}
