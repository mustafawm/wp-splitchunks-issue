import React from 'react';

export default function LoadingDetails() {
  return (
    <div
      className="relative mt-4 mr-0 sm:mr-3 shadow-lg border-t border-gray-100 isFetchingIndicator h-56"
      style={{ animationDuration: '4.4s' }}
    >
      <div className="w-full flex flex-col">
        <div className="h-6 w-full bg-white" />
        <div className="flex justify-between h-16">
          <div className="w-2 bg-white" />
          <div className="w-1/4">
            <div className="h-12" />
            <div className="h-4 bg-white" />
          </div>
          <div className="w-3/4 bg-white" />
        </div>
        <div className="h-32 border-8 border-white" />
        <div className="h-8 bg-white" />
      </div>
    </div>
  );
}
