/* eslint-disable react/no-array-index-key */
import React from 'react';

const widths = ['w-3/5', 'w-4/5', 'w-2/5', 'w-3/5'];

export default function FiltersLoading() {
  return (
    <div className="flex flex-col">
      {Array(4)
        .fill(null)
        .map((i, idx) => (
          <span key={idx} className="flex justify-between mr-2">
            <div
              className={`my-2 rounded-xs h-3 isFetchingIndicator bg-ice ${widths[idx]}`}
              style={{ animationDuration: '8.2s' }}
            />
            <div className="w-4 h-4 rounded-sm bg-ice" />
          </span>
        ))}
    </div>
  );
}
