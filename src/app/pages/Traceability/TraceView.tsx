import React from 'react';
import DataSeries from './DataSeries';
import ProductDetails from './ProductDetails';
import { useFetchInventoryData } from './useApi';

export default function TraceView() {
  const { isLoading, data, error } = useFetchInventoryData();

  return (
    <div className="max-w-screen-xl mx-auto mb-48 flex flex-col-reverse md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
      <div className="w-full md:w-2/3 relative mx-1">
        <DataSeries productName={data?.companyProduct?.name} />
      </div>
      <div className="w-full md:w-1/3 mx-1" data-testid="infobox">
        <ProductDetails inventory={data} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
}
