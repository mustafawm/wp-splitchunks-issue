/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import useIsMobileScreen from 'shared/hooks/useMobileScreen';
import Category from './Category';
import Facility from './Facility';
import Product from './Product';
import Quality from './Quality';
import TransferStatus from './TransferStatus';
import { Filters, ContainerProps as Props } from './types';

export default function FiltersContainer(props: Props) {
  const { selected, onChange, filterNames, filtersCount, className } = props;
  const { isMobile } = useIsMobileScreen();
  const [mobileActiveFilter, setActiveFilter] = useState<Filters | null>(null);
  const toggleFilter = useCallback((filter: Filters): void => {
    setActiveFilter(currentFilter =>
      currentFilter === filter ? null : filter,
    );
  }, []);

  const filterProps = {
    onLabelClick: toggleFilter,
    mobileActiveFilter,
    selected,
    onChange,
    filterCount: {},
    isMobile,
  };

  const filters = filterNames.map(name => {
    let Filter: Function;
    switch (name) {
      case Filters.category:
        Filter = Category;
        filtersCount && (filterProps.filterCount = filtersCount[name]);
        break;
      case Filters.facility:
        Filter = Facility;
        filtersCount && (filterProps.filterCount = filtersCount[name]);
        break;
      case Filters.product:
        Filter = Product;
        filtersCount && (filterProps.filterCount = filtersCount[name]);
        break;
      case Filters.quality:
        Filter = Quality;
        filtersCount && (filterProps.filterCount = filtersCount[name]);
        break;
      case Filters.status:
        Filter = TransferStatus;
        filtersCount && (filterProps.filterCount = filtersCount[name]);
        break;
    }
    return <Filter key={name} {...filterProps} />;
  });

  return <span className={className}>{filters}</span>;
}
