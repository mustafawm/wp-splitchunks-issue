import React from 'react';
import { useTranslation } from 'react-i18next';
import PersonalDetailsFields from 'shared/components/Form/partials/Personal';
import { Props } from './types';

export default function PersonalFields(props: Props) {
  const { t } = useTranslation();

  return (
    <div className={props.className}>
      <h4>
        {t('common.profile')} {t('common.details')}
      </h4>
      <PersonalDetailsFields schemaPrefix={props.schemaPrefix} />
    </div>
  );
}
