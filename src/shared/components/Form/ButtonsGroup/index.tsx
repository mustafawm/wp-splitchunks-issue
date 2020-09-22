import React, { useMemo, useCallback } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import useFetchOptions from 'shared/hooks/useFetchOptions';
import LoadingBtns from './Loading';
import { Props } from './types';
import InputButtons from './InputButtons';
import FormField from '../Field';

export default function ButtonsGroup(props: Props) {
  const {
    url = '',
    type,
    name,
    label,
    wrapperClassName,
    className = 'flex justify-between flex-wrap',
    labelKey,
    valueKey,
    translationKey,
  } = props;
  const [field] = useField(name);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { options, isLoading } = useFetchOptions({
    url,
    labelKey,
    valueKey,
  });

  const handleChange = useCallback(field.onChange, []);
  const inputValue = useMemo(() => field.value, [field.value]);
  const inputOpts = useMemo(() => {
    if (translationKey) {
      return options.map(opt => ({
        ...opt,
        label: t(`${translationKey}.${opt.label}`),
      }));
    }
    return options;
  }, [options, translationKey, language]);

  return (
    <FormField label={label} name={name} wrapperClassName={wrapperClassName}>
      <div className={className}>
        {isLoading && !options.length && <LoadingBtns />}
        <InputButtons
          type={type}
          name={name}
          onChange={handleChange}
          options={inputOpts}
          value={inputValue as string}
        />
      </div>
    </FormField>
  );
}
