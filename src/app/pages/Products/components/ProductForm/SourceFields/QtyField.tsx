import React from 'react';
import { useTranslation } from 'react-i18next';
import { InventoryPrdocut } from 'shared/types';
import Field from 'shared/components/Form/Field';

export default function QtyField(props: {
  name: string;
  label: string;
  inventory?: InventoryPrdocut;
}) {
  const { inventory, name, label } = props;
  const { t } = useTranslation();
  const isWasteField = name.includes('waste');
  const inventoryQty = Number(inventory?.quantity);
  const placeholder = inventory
    ? isWasteField
      ? ''
      : `${t('common.max')}: ${inventory?.quantity}`
    : '';

  const validateValue = (value: number) => {
    let error = undefined;
    if (isWasteField && value < 0) {
      error = t('validation.cannotBeLess', { limit: 0 });
    } else if (!isWasteField && value < 1) {
      error = t('validation.cannotBeLess', { limit: 1 });
    } else if (value > inventoryQty) {
      error = t('validation.cannotBeMore', { limit: inventoryQty });
    }
    return error;
  };

  return (
    <Field
      name={name}
      label={label}
      type="number"
      inputMode="decimal"
      className="utl-input"
      placeholder={placeholder}
      validate={validateValue}
      wrapperClassName="w-1/3 mr-2"
    />
  );
}
