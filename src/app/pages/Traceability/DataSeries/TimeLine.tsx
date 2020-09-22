import React from 'react';
import EclipseNotStarted from 'shared/svgs/EclipseNotStarted.svg';

export default function Timeline({ withTail }: { withTail: boolean }) {
  return (
    <div className="w-8">
      <div className="text-gray-500 z-10">
        <EclipseNotStarted className="w-3 fill-current" />
      </div>
      {withTail && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 5,
            height: 'calc(100% - 10px)',
            border: '1px solid #cbd5e0',
          }}
        />
      )}
    </div>
  );
}
