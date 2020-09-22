/* eslint-disable react/no-array-index-key */
import React from 'react';

export default function ProductCardLoading({ amount = 1 }) {
  return (
    <>
      {Array(amount)
        .fill(null)
        .map((i, idx) => (
          <div
            key={idx}
            className="isFetchingIndicator flex lg:flex-col border border-gray-100 shadow-xs"
            style={{ animationDuration: '5s' }}
          >
            <div
              className="w-1/3 lg:w-auto h-40 lg:h-40 opacity-75"
              style={{ background: '#ddd' }}
            />
            <div className="w-2/3 lg:w-auto lg:h-40 flex flex-col justify-between">
              <div className="bg-white h-8" />
              <div className="bg-white h-6" />
              <div className="bg-white h-10" />
            </div>
          </div>
        ))}
    </>
  );
}
