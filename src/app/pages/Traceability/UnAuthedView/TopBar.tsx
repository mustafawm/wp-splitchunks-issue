import React from 'react';
import { NavLink } from 'react-router-dom';
import { url } from 'shared/consts';
import useMobileScreen from 'shared/hooks/useMobileScreen';
import AppLogo from 'assets/images/__appup-logo.png';
import LanguageOptions from 'shared/components/NavBar/components/Langs';
import AppName from 'shared/components/LogoName/Name';

export default function UnAuthedNavBar() {
  const { isMobile, isPortrait } = useMobileScreen();

  return (
    <header className="relative border-b-2">
      <div className="flex items-center justify-between p-3 sm:mx-auto max-w-screen-xl">
        <NavLink
          to={url.web.base}
          className="flex items-center space-x-1"
          title="__app Up"
        >
          <img
            loading="lazy"
            alt="__app up logo"
            className={isMobile ? 'w-10' : 'w-8'}
            src={AppLogo}
          />
          {!isPortrait && <AppName className="text-2xl" />}
        </NavLink>
        <LanguageOptions />
      </div>
    </header>
  );
}
