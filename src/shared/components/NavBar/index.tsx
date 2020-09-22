import React from 'react';
import classNames from 'classnames';
import { useIsFetching } from 'react-query';
import { NavLink } from 'react-router-dom';
import { url } from 'shared/consts';
import useMobileScreen from 'shared/hooks/useMobileScreen';
import AppLogo from 'assets/images/__appup-logo.png';
import Username from './components/Username';
import LanguageOptions from './components/Langs';
import NavItems from './NavItems';

export default function NavBar() {
  const isFetching = useIsFetching();
  const { isMobile, isPortrait } = useMobileScreen();
  const navItemsClass = classNames(
    'flex justify-between items-center',
    'fixed bottom-0 right-0 left-0 z-20 bg-white border-t border-gray-200 px-2 pt-px',
    'sm:relative sm:bg-auto sm:border-none sm:px-0 sm:pt-0',
    'sm:w-1/2 md:w-1/3',
  );

  return (
    <header className="relative mb-8 sm:mb-12">
      <div className="flex items-center justify-end sm:justify-between p-3 sm:mx-auto max-w-screen-xl">
        <div className="flex flex-1 items-center">
          <NavLink to={url.web.base} className="mr-6" title="__app Up">
            <img
              loading="lazy"
              alt="__app up logo"
              className={!isMobile ? 'w-8' : !isPortrait ? 'w-10' : 'w-6'}
              src={AppLogo}
            />
          </NavLink>
          <span className={navItemsClass}>
            <NavItems />
          </span>
        </div>
        <div className="flex items-center">
          <LanguageOptions />
          <Username />
        </div>
      </div>
      {/* divider line */}
      <div
        className={classNames(
          'absolute right-0 left-0 border-t border-b h-3 sm:h-5 bg-ice w-full',
          isFetching && 'isFetchingIndicator',
        )}
      />
    </header>
  );
}
