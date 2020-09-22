import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import { TransferProduct } from 'shared/types';
import Field from 'shared/components/Form/Field';
import Select from 'shared/components/Form/Select';
import { useUserCompanyGuid } from 'shared/providers/auth';

type Props = { transfer?: TransferProduct; className?: string };

export default function ProcessRequestFields(props: Props) {
  const { transfer, className = '' } = props;
  const companyGuid = useUserCompanyGuid();
  const { t } = useTranslation();
  const senderQty = Number(transfer?.senderQuantity);
  const placeholder = t('validation.maxIs', { limit: senderQty });

  const validateValue = (value: number) => {
    let error = undefined;
    if (value < 1) {
      error = t('validation.cannotBeLess', { limit: 1 });
    } else if (value > senderQty) {
      error = t('validation.cannotBeMore', { limit: senderQty });
    }
    return error;
  };

  return (
    <div
      className={`p-3 md:p-5 mr-0 sm:mr-3 shadow-md border-t border-gray-100 ${className}`}
    >
      <span className="flex items-center">
        <Field
          name="acceptQuantity"
          validate={validateValue}
          label={t('requests.processReq.acceptQty')}
          className="utl-input"
          placeholder={placeholder}
          type="number"
          inputMode="decimal"
          wrapperClassName="mr-4"
        />
        <span className="mt-4 uppercase text-gray-800">
          {transfer?.quantityUnit}
        </span>
      </span>
      <Select
        name="receiverCompanyLocationGuid"
        aria-label="company location"
        label={t('requests.processReq.location')}
        labelKey="name"
        valueKey="guid"
        className="w-full"
        url={url.api.company.locations(companyGuid)}
      />
      <Field
        component="textarea"
        name="receiverComment"
        label={t('requests.processReq.comment')}
        className="utl-textarea"
      />
    </div>
  );
}
