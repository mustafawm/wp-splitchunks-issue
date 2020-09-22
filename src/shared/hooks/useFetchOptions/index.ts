import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option } from 'shared/types';
import { useFetchData } from './useApi';
import { prepareFormater } from './helpers';
import { Props, ReturnType } from './types';

export default function useFetchOptions(props: Props): ReturnType {
  const { url, labelKey, valueKey, translationKey } = props;
  const { t } = useTranslation();
  const formatOptions = prepareFormater(labelKey, valueKey);
  const [fieldOptions, setFieldOptions] = useState<Option[]>([]);
  const { data, isLoading, isSuccess, error } = useFetchData(url);

  const setOptions = (options: Option[]): void => {
    setFieldOptions(
      translationKey
        ? options.map(opt => ({
            ...opt,
            label: t(`${translationKey}.${opt.label}`),
          }))
        : options,
    );
  };

  useEffect(() => {
    if (isSuccess && Array.isArray(data)) {
      const options = formatOptions(data);
      setOptions(options);
    }
  }, [isSuccess]);

  return {
    options: fieldOptions,
    isLoading: isLoading,
    error,
  };
}
