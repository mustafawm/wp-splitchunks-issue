import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useMobileScreen from 'shared/hooks/useMobileScreen';
import navlinks, { profileRoute } from './links';

export default function NavItems() {
  const { t } = useTranslation();
  const { isMobile } = useMobileScreen();

  const navItems = (isMobile ? [...navlinks, profileRoute] : navlinks).map(
    route => (
      <span key={route.name} className="flex items-center">
        <NavLink
          // end
          to={route.link}
          activeClassName="text-green-600"
          className="hover:text-green-600 mx-2"
        >
          <span className="flex flex-col items-center">
            {isMobile && <route.Icon className="h-6 fill-current" />}
            <span className="text-xs md:text-sm">
              {route.display && t(route.display)}
            </span>
          </span>
        </NavLink>
        {/* {route.name === 'requests' && (
        <div className="w-5 h-5 px-1 py-1 flex items-center justify-center mb-2 bg-green-600 text-white rounded-full text-xs">
          39
        </div>
      )} */}
      </span>
    ),
  );

  return <>{navItems}</>;
}
