import React from 'react';

export default function LoadingCerts() {
  return (
    <div className="h-24 w-full mt-6 isFetchingIndicator flex flex-col">
      <div className="h-10" />
      <div className="h-8 bg-white" />
      <div className="h-10" />
    </div>
  );
}
