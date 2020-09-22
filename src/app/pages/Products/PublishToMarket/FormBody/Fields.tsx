import React from 'react';
import { useTranslation } from 'react-i18next';
import { url } from 'shared/consts';
import { InventoryPrdocut } from 'shared/types';
import Field from 'shared/components/Form/Field';
import Select from 'shared/components/Form/Select';

type Props = { inventory?: InventoryPrdocut; className?: string };

export default function PublishFormFields(props: Props) {
  const { inventory, className = '' } = props;
  const { t } = useTranslation();

  const qtyUnit = inventory?.quantityUnit;
  const inventoryQty = Number(inventory?.quantity);
  const qtyPlaceholder = t('validation.maxIs', { limit: inventory?.quantity });

  const validateValue = (value: number) => {
    let error = undefined;
    if (value < 1) {
      error = t('validation.cannotBeLess', { limit: 1 });
    } else if (value > inventoryQty) {
      error = t('validation.cannotBeMore', { limit: inventoryQty });
    }
    return error;
  };

  return (
    <div
      className={`p-3 md:p-5 mr-0 sm:mr-3 shadow-md border-t border-gray-100 ${className}`}
    >
      <div className="utl-two-fields">
        <span className="flex items-center">
          <Field
            type="number"
            inputMode="decimal"
            name="pricePerUnit"
            className="utl-input"
            wrapperClassName="mr-4"
            label={t('products.publishProduct.form.price')}
            placeholder={t('products.publishProduct.form.pricePlaceholder')}
          />
          <span className="mt-4 uppercase text-gray-800">
            {t('app.country.currency')} / {qtyUnit}
          </span>
        </span>
        <span className="flex items-center">
          <Field
            type="number"
            inputMode="decimal"
            name="quantity"
            className="utl-input"
            validate={validateValue}
            placeholder={qtyPlaceholder}
            label={t('products.publishProduct.form.quantity')}
          />
          <span className="mt-4 ml-2 uppercase text-gray-800">{qtyUnit}</span>
        </span>
      </div>
      <Select
        name="marketplaces"
        aria-label="markets"
        labelKey="username"
        valueKey="username"
        className="w-full"
        url={url.api.blockchain.marketplace}
        label={t('products.publishProduct.form.market')}
      />
      <Field
        component="textarea"
        name="senderComment"
        label={t('products.publishProduct.form.comment')}
        className="utl-textarea"
      />
    </div>
  );
}
