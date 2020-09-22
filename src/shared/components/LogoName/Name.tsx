import React from 'react';

export default function AppName({ className = 'text-3xl' }) {
  return (
    <div
      className={`text-green-600 font-extrabold tracking-tighter ${className}`}
    >
      <span className="pr-px">__appUP</span>
      <span className="text-blue-500 pl-px">@UN</span>
    </div>
  );
}
