import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facility } from 'shared/types';
import Button from 'shared/components/Button';

export default function Footer(props: { facility: Facility }) {
  const { facility } = props;
  const { t } = useTranslation();

  return (
    <Button
      color="white"
      text={t('common.select')}
      href={{ to: facility.guid, state: { facility } }}
      className="text-green-600 flex justify-center p-0"
      dataTestid={`${facility.name}-select-btn`}
    />
  );
}
