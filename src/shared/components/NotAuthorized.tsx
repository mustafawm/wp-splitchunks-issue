import React from 'react';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export default function NotAuthorized() {
  const { t } = useTranslation();
  const { state } = useLocation() as Location<{ pathname: string }>;

  return (
    <div>
      <h1>{t('app.notAuthed')}</h1>
      <pre className="mt-2">{state?.pathname || ''}</pre>
    </div>
  );
}
