import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { getDatePart } from 'shared/utils/string';
import FieldVal from 'shared/components/FieldVal';
import LoadingInfo from './Loading';
import { InfoBoxProps } from './types';
import DetailsModal from '../DetailsModal';

export default function ProductInfoBox(props: InfoBoxProps) {
  const {
    fields = [],
    additionalFields = [],
    inventory,
    isLoading,
    error,
  } = props;
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  if (isLoading) {
    return <LoadingInfo />;
  }
  if (error) {
    return <div className="utl-error">{error?.message}</div>;
  }
  return (
    <>
      {showDetails && (
        <DetailsModal
          inventory={inventory}
          onClose={(): void => setShowDetails(false)}
          error={error}
          isLoading={isLoading}
        />
      )}
      <div className="p-3 md:p-5 shadow-md border-t border-gray-100">
        <h1>{inventory?.companyProduct.name}</h1>
        <div className="flex flex-col justify-between">
          {fields.includes('quality') && (
            <FieldVal
              name={t('products.quality')}
              value={t(
                `products.qualities.${inventory?.companyProduct.qualityCode}`,
              )}
            />
          )}
          {fields.includes('produceDate') && (
            <FieldVal
              name={t('products.harvestedOn')}
              value={getDatePart(inventory?.companyProduct.produceDate)}
            />
          )}
          {fields.includes('remainingQuantity') && (
            <FieldVal
              name={t('products.remainingQty')}
              value={`${inventory?.quantity} ${inventory?.quantityUnit}`}
            />
          )}
          {fields.includes('quantity') && (
            <FieldVal
              name={t('products.originalQty')}
              value={`${inventory?.originalQuantity} ${inventory?.quantityUnit}`}
            />
          )}
          {Boolean(additionalFields.length) && <hr className="my-3" />}
          {additionalFields.map(field => (
            <FieldVal key={field.name} name={field.name} value={field.value} />
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <Button
            color="white"
            text={t('common.details')}
            onClick={(): void => setShowDetails(true)}
            className="text-green-600 w-5/6 border rounded-sm"
          />
        </div>
      </div>
    </>
  );
}
