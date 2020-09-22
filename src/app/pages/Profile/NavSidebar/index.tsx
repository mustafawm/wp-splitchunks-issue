import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { UserRole } from 'shared/types';
import Button from 'shared/components/Button';
import { useProfile } from 'shared/providers/auth';
// import InstallPrompt from './InstallPrompt';
import routes, { ProfileRoutes } from '../routes';

export default function ProfileNavSidebar(props: { className?: string }) {
  const { t } = useTranslation();
  const { userProfile } = useProfile();
  const [isShown, setIsShown] = useState(false);

  const profileSideMenuItems = Object.keys(routes).map(key => {
    if (userProfile.role !== UserRole.Farmer && key === 'id') {
      return null;
    }
    const item = routes[key as keyof ProfileRoutes];
    return (
      <Button
        key={key}
        color="white"
        href={{ to: item.url }}
        text={t(item.display)}
        activeClassName="bg-green-600 text-white"
        className="my-1 text-xs hover:bg-green-600 hover:text-white uppercase py-1 md:py-2"
      />
    );
  });

  const menuClass = classNames(
    isShown ? 'flex' : 'hidden',
    'md:flex',
    'w-full flex-grow flex-col items-stretch bg-ice mb-8 py-2',
  );
  const btnClass = classNames(
    'md:hidden p-0 text-green-600 -mt-2',
    isShown ? 'text-2xl' : 'text-3xl',
  );

  return (
    <span className={props.className}>
      <Button
        color="white"
        text={isShown ? '𝖷' : '☰'}
        title="Profile menu"
        dataTestid="profile-nav"
        onClick={() => setIsShown(!isShown)}
        className={btnClass}
      />
      <div className={menuClass}>
        {profileSideMenuItems}
        {/* <InstallPrompt /> */}
      </div>
    </span>
  );
}
