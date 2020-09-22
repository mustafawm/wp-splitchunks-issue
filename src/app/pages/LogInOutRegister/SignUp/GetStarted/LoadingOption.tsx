/* eslint-disable react/no-array-index-key */
import React from 'react';

export default function LoadingOption({ amount = 3, className = '' }) {
  return (
    <>
      {Array(amount)
        .fill(null)
        .map((i, idx) => (
          <div
            key={idx}
            style={{ animationDuration: '5.3s' }}
            className={`${className} isFetchingIndicator bg-ice flex justify-center`}
          >
            <div className="w-24 lg:w-32 h-24 lg:h-32 mt-6 bg-ice opacity-75 rounded-full" />
          </div>
        ))}
    </>
  );
}
