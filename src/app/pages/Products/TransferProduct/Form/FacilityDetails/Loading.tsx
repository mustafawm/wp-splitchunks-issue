import React from 'react';

export default function LoadingDetails() {
  return (
    <div
      className="relative mr-0 sm:mr-3 shadow-lg border-t border-gray-100 isFetchingIndicator"
      style={{ animationDuration: '4.4s' }}
    >
      <div className="h-8 w-full bg-white" />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="w-4 bg-white" />
          <div className="w-1/3 flex flex-col">
            <div className="h-4" />
            <div className="h-2 bg-white" />
            <div className="h-2" />
            <div className="h-16 bg-white" />
          </div>
          <div className="relative w-2/3 bg-white h-24" />
        </div>
      </div>
      <div className="w-full h-20 flex justify-between">
        <div className="h-full w-4 bg-white" />
        <div className="h-full w-auto" />
        <div className="h-full w-4 bg-white" />
      </div>
      <div className="h-12 w-full bg-white" />
      <div className="flex justify-between">
        <div className="w-4 bg-white h-4" />
        <div />
        <div className="w-4 bg-white h-4" />
      </div>
      <div className="h-4 w-full bg-white" />
    </div>
  );
}
