import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { FiltersPaneProps as Props } from './types';
import FiltersContainer from './Filters';

export default function FiltersPane(props: Props) {
  const { selected, onChange, filtersCount, className, filterNames } = props;
  const { t } = useTranslation();

  const wrapperClass = classNames(
    'w-full flex flex-col items-center max-w-sm mx-auto mb-2',
    'md:w-1/4 md:mb-0',
    className,
  );
  const resetBtnClass = classNames(
    !selected.length && 'hidden',
    'absolute top-0 right-0 left-0 mx-auto p-0 underline text-gray-900 flex items-center justify-center -mt-5',
    'md:block md:relative md:no-underline md:w-11/12 md:ml-1 md:border md:rounded md:mt-4 md:border-gray-500 md:py-1',
  );

  return (
    <aside className={wrapperClass}>
      <div className="relative w-full flex md:flex-col justify-start items-center md:items-start pt-1 md:pt-0">
        <span className="my-2 hidden md:block font-semibold text-lg">
          {t('common.filters')}
        </span>
        <FiltersContainer
          className="w-full flex md:flex-col justify-between md:justify-start gap-2 mx-auto overflow-x-auto"
          filterNames={filterNames}
          selected={selected}
          onChange={onChange}
          filtersCount={filtersCount}
        />
        <Button
          color="white"
          text={t('common.reset')}
          disabled={!Boolean(selected.length)}
          className={resetBtnClass}
          onClick={(): void => onChange(null)}
          dataTestid="reset"
        />
      </div>
    </aside>
  );
}
