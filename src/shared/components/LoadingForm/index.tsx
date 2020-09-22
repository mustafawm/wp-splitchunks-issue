import React from 'react';

export default function LoadingForm() {
  return (
    <div
      className="border border-gray-100 isFetchingIndicator"
      style={{ animationDuration: '6s' }}
    >
      <div className="w-full h-8 bg-white" />
      <div className="flex h-8 w-full">
        <div className="w-4 bg-white" />
        <div className="w-full" />
        <div className="w-4 bg-white" />
      </div>
      <div className="w-full h-6 bg-white" />
      <div className="flex h-8 w-full">
        <div className="w-4 bg-white" />
        <div className="w-full" />
        <div className="w-4 bg-white" />
      </div>
      <div className="w-full h-8 bg-white" />
      <div className="flex h-20 w-full">
        <div className="w-4 bg-white" />
        <div className="w-full" />
        <div className="w-4 bg-white" />
      </div>
      <div className="w-full h-8 bg-white" />
      <div className="flex h-8 w-full">
        <div className="w-4 bg-white" />
        <div className="w-full" />
        <div className="w-4 bg-white" />
      </div>
      <div className="w-full h-8 bg-white" />
      <div className="flex h-32 w-full">
        <div className="w-4 bg-white" />
        <div className="w-full" />
        <div className="w-4 bg-white" />
      </div>
      <div className="w-full h-8 bg-white" />
    </div>
  );
}
