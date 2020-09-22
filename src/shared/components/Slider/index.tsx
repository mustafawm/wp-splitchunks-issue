import React, { ReactElement } from 'react';
import Slider, { Settings } from 'react-slick';
import { PrevArrow, NextArrow } from './helpers';
import 'slick-carousel/slick/slick.css';

type Props = Settings & {
  children: ReactElement | ReactElement[] | null;
};

export default function ImageSlider(props: Props): ReactElement {
  return (
    <Slider nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
      {props.children}
    </Slider>
  );
}
