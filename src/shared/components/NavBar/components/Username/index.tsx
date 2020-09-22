import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import Dropdown from 'shared/components/Dropdown';
import useMobileScreen from 'shared/hooks/useMobileScreen';
import InitCircle from './InitCircle';
import LogoutButon from './LogoutButton';
import LogoutButtonMobile from './LogoutButtonMobile';

export default function Username(props: { className?: string }) {
  const { t } = useTranslation();
  const { isMobile } = useMobileScreen();
  const wrapperClass = classNames('flex items-center w-full', props.className);

  return (
    <div className={wrapperClass}>
      {isMobile ? (
        <LogoutButtonMobile />
      ) : (
        <Dropdown menuClassName="min-w-3/4" btnContent={<InitCircle />}>
          <Button
            color="white"
            className="font-normal text-sm hover:text-green-600"
            activeClassName="bg-white text-green-600"
            text={t('common.profile')}
            href={{ to: '/profile' }}
          />
          <hr />
          <LogoutButon />
        </Dropdown>
      )}
    </div>
  );
}
