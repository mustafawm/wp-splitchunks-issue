import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/components/Button';
import { url } from 'shared/consts';
import useIsMobileScreen from 'shared/hooks/useMobileScreen';

export default function LearnMore() {
  const { isMobile } = useIsMobileScreen();
  const { t } = useTranslation();

  const btnClass = classNames(
    'absolute right-0 bottom-0',
    isMobile
      ? 'p-0 text-blue-600 underline mb-1'
      : ' pt-px pb-px px-4 sm:py-2 sm:px-4 mb-6',
  );

  return (
    <div className="h-24 md:h-64 bg-grey flex items-center justify-center">
      <div className="relative max-w-screen-x h-full flex justify-center items-center">
        <div className="md:h-32 flex flex-col justify-around items-center -mt-4 mb-3">
          <p className="font-bold text-gray-900 text-lg md:text-5xl leading-10">
            {t('trace.unAuthedView.line_1')}
          </p>
          <p className="font-medium text-gray-600 text-xs md:text-lg">
            {t('trace.unAuthedView.line_2')}
          </p>
        </div>
        <Button
          text={t('login.learnMore')}
          color={isMobile ? 'white' : 'green'}
          className={btnClass}
          href={{ to: url.web.base }}
        />
      </div>
    </div>
  );
}
