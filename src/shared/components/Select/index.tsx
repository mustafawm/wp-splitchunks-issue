/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect, { Props } from 'react-select';
import { selectCss, setSelectTheme } from './cssHelpers';

/**
 * @param props aria-label is required
 * for E2E tests to work properly
 */
export default function Select(props: Props) {
  const { t } = useTranslation();

  return (
    <ReactSelect
      styles={selectCss}
      theme={setSelectTheme}
      placeholder={t('common.select')}
      className={props['aria-label']}
      {...props}
    />
  );
}
