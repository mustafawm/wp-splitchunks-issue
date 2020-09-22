/* eslint-disable react/no-array-index-key */
import React from 'react';

export default function LoadingDetails() {
  return (
    <div
      className="border border-gray-100 isFetchingIndicator"
      style={{ animationDuration: '8s' }}
    >
      {Array(4)
        .fill(null)
        .map((i, idx) => (
          <span key={idx}>
            <div className="w-full h-4 bg-white" />
            <div className="flex h-4 w-full">
              <div className="w-4 bg-white" />
              <div className="w-full" />
              <div className="w-4 bg-white" />
            </div>
          </span>
        ))}
      <div className="w-full h-8 bg-white" />
    </div>
  );
}
