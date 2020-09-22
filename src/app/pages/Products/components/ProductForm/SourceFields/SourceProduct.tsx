import React from 'react';
import { useTranslation } from 'react-i18next';
import { Option, InventoryPrdocut } from 'shared/types';
import Field from 'shared/components/Form/Field';
import SelectField from 'shared/components/Form/Select/SelectField';
import Button from 'shared/components/Button';
import QtyField from './QtyField';

export default function SourceProductFields(props: {
  sourcesList: Option[];
  onRemove(): void;
  idx: number;
  inventory?: InventoryPrdocut;
  isLoadingList: boolean;
  disableRemove: boolean;
}) {
  const {
    idx,
    inventory,
    isLoadingList,
    sourcesList,
    onRemove,
    disableRemove,
  } = props;
  const { t } = useTranslation();

  const usedQtyName = `materialInventories[${idx}].usedQuantity`;
  const wasteQtyName = `materialInventories[${idx}].wasteQuantity`;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-end justify-center w-full sm:flex-row">
        <SelectField
          isClearable
          aria-label={`source product-${idx}`}
          name={`materialInventories[${idx}].guid`}
          label={t('products.sourceProduct')}
          wrapperClassName="w-full sm:w-3/5 sm:mr-4"
          options={sourcesList}
          isLoading={isLoadingList}
        />
        <span className="flex items-end w-full mt-2 sm:mt-0">
          <QtyField
            name={usedQtyName}
            inventory={inventory}
            label={t('products.usedQty')}
          />
          <QtyField
            name={wasteQtyName}
            inventory={inventory}
            label={t('products.wasteQty')}
          />
          <span className="w-1/5 mt-4 flex self-center text-gray-800">
            {inventory?.quantityUnit || ''}
          </span>
          <Button
            color="white"
            text="X"
            className="flex mt-4 self-center py-1 px-2 text-red-600 border border-red-600 rounded"
            onClick={onRemove}
            disabled={disableRemove}
          />
        </span>
      </div>
      <Field
        component="textarea"
        name={`materialInventories[${idx}].comment`}
        label={t('common.comment')}
        className="utl-textarea h-20"
      />
    </div>
  );
}
