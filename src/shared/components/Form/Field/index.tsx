/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import { Field, useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import useIsMobileScreen from 'shared/hooks/useMobileScreen';
import { SingleFieldProps } from '../types';

export default function SingleField(props: SingleFieldProps) {
  const {
    name,
    label,
    children,
    className = '',
    wrapperClassName,
    type,
    ...fieldProps
  } = props;
  const { t } = useTranslation();
  const { isMobile } = useIsMobileScreen();
  const { validateOnBlur } = useFormikContext();
  const [, meta] = useField(name);

  return (
    <div className={classNames('mt-1', wrapperClassName)}>
      <label htmlFor={`${name}-id`} className="utl-label">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <Field
          name={name}
          id={`${name}-id`}
          className={className}
          type={type === 'number' && !isMobile ? 'text' : type}
          {...fieldProps}
        />
      )}
      <div className="utl-error" data-testid={`${name}-error`}>
        {meta.error && !validateOnBlur
          ? t(meta.error)
          : meta.error && validateOnBlur && meta.touched
          ? t(meta.error)
          : ''}
      </div>
    </div>
  );
}
