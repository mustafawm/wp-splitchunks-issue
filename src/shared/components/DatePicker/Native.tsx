/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BROWSER } from 'shared/consts';
import Button from 'shared/components/Button';
import Calendar from 'shared/svgs/Calendar.svg';
import { Props } from './types';

export default function NativeDatePicker(props: Props) {
  const {
    id,
    value = '',
    onChange,
    containerClassName,
    iconClassName,
    ...inputProps
  } = props;
  const { t } = useTranslation();
  const wrapperClassName = classNames(
    'relative flex items-center w-full',
    containerClassName,
  );
  const iconCss = classNames('fill-current w-6 ml-4', iconClassName);

  return (
    <div className={wrapperClassName}>
      <span className="absolute z-10 text-green-600">
        <Calendar className={iconCss} />
      </span>
      <input
        id={id}
        type="date"
        className="utl-input pl-10 bg-white"
        placeholder={BROWSER.isSafari ? ' yyyy-mm-dd' : 'dd/mm/yyyy'}
        onChange={evt => onChange(evt.target.value)}
        value={value}
        {...inputProps}
      />
      {BROWSER.isSafari && (
        <Button
          text="？"
          color="white"
          className="p-0 absolute right-0 text-gray-800"
          onClick={() => alert(t('app.safariDate?'))}
        />
      )}
    </div>
  );
}
