import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound404() {
  const { t } = useTranslation();

  return <h2>{t('app.404')}</h2>;
}
