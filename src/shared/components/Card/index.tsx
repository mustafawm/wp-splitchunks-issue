import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'shared/components/Slider';

type Props = {
  name: string; // used in image alt
  images?: string[];
  Body: ReactElement;
  Footer: ReactElement;
};

const imgClass =
  'h-40 shadow-xs lg:shadow-none rounded-tl rounded-bl lg:rounded-none lg:rounded-t-sm';

export default function ProductCard(props: Props) {
  const { name, images = [], Body, Footer } = props;
  const { t } = useTranslation();

  const productImages =
    images?.map((imgSrc, idx) => (
      <img
        key={imgSrc}
        loading="lazy"
        src={imgSrc}
        className={imgClass}
        alt={`${name} ${idx}`}
      />
    )) || [];

  return (
    <div className="relative flex border-t border-gray-100 rounded lg:border-none lg:block lg:shadow-md">
      <div className={`w-1/3 lg:w-auto ${imgClass}`}>
        <Slider>
          {productImages.length ? (
            productImages
          ) : (
            <img
              loading="lazy"
              className={imgClass}
              alt={t('common.placeholder')}
              src="https://via.placeholder.com/550?text=NO+IMAGE"
            />
          )}
        </Slider>
      </div>
      <div className="w-2/3 flex flex-col justify-between h-40 lg:w-full shadow-xs">
        <div
          data-testid={`${name}-card-body`}
          className="h-full flex flex-col justify-around px-2 text-xs text-gray-600"
        >
          {Body}
        </div>
        <div className="w-full mx-auto border-t py-1 md:py-2 whitespace-pre">
          {Footer}
        </div>
      </div>
    </div>
  );
}
