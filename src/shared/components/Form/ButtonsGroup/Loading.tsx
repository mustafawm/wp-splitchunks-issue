import React from 'react';

export default function LoadingButtons() {
  return (
    <div
      className="w-full h-5 isFetchingIndicator flex justify-between"
      style={{ animationDuration: '6s' }}
    >
      <div className="w-1/6" />
      <div className="bg-white w-1/6" />
      <div className="w-1/6" />
      <div className="w-1/6 bg-white" />
      <div className="w-1/6 " />
      <div className="bg-white w-1/6" />
    </div>
  );
}
