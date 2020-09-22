import React, { useCallback, useState, useMemo, useEffect } from 'react';
import FiltersPane from 'shared/components/FiltersPane';
import { useAlertFunction } from 'shared/providers/alert';
import LoadingCard from 'shared/components/Card/Loading';
import useDataLength from './useLoadingLength';
import { Props } from './types';
import './styles.css';
import { useFetchGridData } from './useApi';

export default function ItemsGrid<Item>(props: Props<Item>) {
  const {
    fetchUrl,
    filterItems,
    countFilters,
    filterNames,
    children,
    delResult,
    queryKey,
    filtersPaneClass = '',
  } = props;
  const toastIt = useAlertFunction();
  const {
    data = [],
    error,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useFetchGridData({ queryKey, fetchUrl });
  const loadingLength = useDataLength(fetchUrl, data?.length);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    if (delResult.isError) {
      toastIt(delResult.error?.message, 'red');
    } else if (delResult.isSuccess) {
      refetch();
    }
  }, [delResult.status]);

  const onFiltersChange = useCallback((filter: string | null): void => {
    if (filter === null) {
      setFilters([]);
      return;
    }
    setFilters(currentFilters => {
      if (currentFilters.includes(filter)) {
        return currentFilters.filter(f => f !== filter);
      }
      return [...currentFilters, filter];
    });
    return;
  }, []);

  const items: Item[] = useMemo(() => filterItems(data, filters), [
    JSON.stringify(data),
    filters.length,
    fetchUrl,
  ]);
  const filtersCount = useMemo(() => countFilters(data), [
    filters.length,
    isFetching,
  ]);

  return (
    <div className="flex flex-col md:flex-row items-start">
      <FiltersPane
        selected={filters}
        onChange={onFiltersChange}
        filtersCount={filtersCount}
        filterNames={filterNames}
        className={`flex-1 md:border-r md:mr-3 ${filtersPaneClass}`}
      />
      <span className="w-full flex-3 lg:flex-4">
        {isError && <span className="utl-error">{error?.message}</span>}
        <div className="items-grid">
          {isLoading ? <LoadingCard amount={loadingLength} /> : children(items)}
        </div>
      </span>
    </div>
  );
}
