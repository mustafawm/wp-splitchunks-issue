/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { url } from 'shared/consts';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { Props as ButtonProps } from 'shared/components/Button/types';

export default function LogoutButton(
  props: { className?: string } & ButtonProps,
) {
  const { className, ...btnProps } = props;
  const { t } = useTranslation();

  return (
    <Button
      color="white"
      text={t('common.logout')}
      className={`font-normal text-sm md:hover:text-green-600 ${className}`}
      activeClassName="bg-white text-green-600"
      href={{ to: `${url.web.logout}?hardLogout=true` }}
      {...btnProps}
    />
  );
}
