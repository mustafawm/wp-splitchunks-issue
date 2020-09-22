import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Business } from 'shared/types';

type Props = { type: Business; className?: string };

export default function BusinessType(props: Props) {
  const { t } = useTranslation();
  const { type, className } = props;

  const wrapperClass = classNames(
    'rounded-lg px-2 py-1',
    type === Business.Farm
      ? 'bg-green-200 text-green-900'
      : type === Business.PackhouseUnit
      ? 'bg-red-200 text-red-900'
      : ' bg-blue-200 text-blue-900',
    className,
  );

  return <span className={wrapperClass}>{t(`app.businessType.${type}`)}</span>;
}
