import React from 'react';
import LoadingSpinner from 'shared/components/Spinner';
import AppLogo from 'assets/images/__appup-logo.png';
import AppName from './Name';
import { Children } from 'shared/types';

export default function LogoName({
  children,
  showLoadingIndicator = false,
}: Children & {
  showLoadingIndicator?: boolean;
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center flex-col w-56">
        <img
          loading="lazy"
          alt="__app up logo"
          className="my-5 w-48 h-48"
          src={AppLogo}
        />
        <AppName />
        <div className="mt-4">
          {children}
          {showLoadingIndicator && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
