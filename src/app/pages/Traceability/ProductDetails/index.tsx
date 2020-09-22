/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import useIsMobileScreen from 'shared/hooks/useMobileScreen';
import ProductInfo from 'shared/components/ProductInfo/SideBox';
import DetailsModal from 'shared/components/ProductInfo/DetailsModal';
import { InfoBoxProps } from 'shared/components/ProductInfo/SideBox/types';

export default function ProductDetails(
  props: Pick<InfoBoxProps, 'inventory' | 'isLoading' | 'error'>,
) {
  const { t } = useTranslation();
  const { isMobile } = useIsMobileScreen();
  const [showModal, setShowModal] = useState(false);

  if (isMobile) {
    return (
      <span className="flex justify-center">
        <Button
          text={t('common.details')}
          onClick={() => setShowModal(true)}
          color="white"
          className="w-full border border-gray-300 text-green-600 font-light shadow-sm max-w-sm"
        />
        {showModal && (
          <DetailsModal onClose={() => setShowModal(false)} {...props} />
        )}
      </span>
    );
  }
  return (
    <ProductInfo
      {...props}
      fields={['quality', 'produceDate', 'quantity', 'remainingQuantity']}
    />
  );
}
