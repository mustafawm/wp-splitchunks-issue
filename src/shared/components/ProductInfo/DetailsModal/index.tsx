import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal';
import Slider from 'shared/components/Slider';
import LoadingDetails from './Loading';
import Details from './Details';
import { DetailsModalProps as Props } from './types';

export default function ProductDetailsModal(props: Props) {
  const { inventory, onClose, error, isLoading } = props;
  const { t } = useTranslation();

  const images = (
    inventory?.companyProduct?.images || []
  ).map((imgSrc: string, idx: number) => (
    <img
      key={imgSrc}
      src={imgSrc}
      loading="lazy"
      className="rounded-sm h-56 w-32"
      alt={`${inventory?.companyProduct?.name} ${idx}`}
    />
  ));

  return (
    <Modal
      showCloseBtn
      onClose={onClose}
      childClass="w-full max-w-lg md:max-w-3xl"
      wrapperClass="w-full flex justify-center items-center"
    >
      <span>
        {error && <span className="utl-error">{error?.message}</span>}
        {isLoading ? (
          <LoadingDetails />
        ) : (
          <div className="flex flex-col justify-center mx-auto py-2 sm:py-4 px-2 sm:px-6 h-full">
            <h1>{inventory?.companyProduct.name}</h1>
            <h5 className="my-2">
              <span className="text-gray-700">
                {`${t('products.farmName')} - `}
              </span>
              {inventory?.companyLocation?.name}{' '}
              {inventory?.companyLocation?.subArea}
            </h5>
            {images && (
              <div className="mb-6">
                <Slider>{images}</Slider>
              </div>
            )}
            <Details product={inventory} />
            <div className="mt-4">
              <h3>{t('common.description')}</h3>
              <p className="text-gray-700">
                {inventory?.companyProduct?.description}
              </p>
            </div>
          </div>
        )}
      </span>
    </Modal>
  );
}
