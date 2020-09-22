import React from 'react';
import { useProfile } from 'shared/providers/auth';
import TraveView from './TraceView';
import TobBar from './UnAuthedView/TopBar';
import LearnMore from './UnAuthedView/LearnMore';

export default function Traceability() {
  const { userProfile } = useProfile();

  if (userProfile.isProfileComplete) {
    return <TraveView />;
  }
  return (
    <>
      <TobBar />
      <LearnMore />
      <div className="utl-page-container mt-3">
        <TraveView />
      </div>
    </>
  );
}
