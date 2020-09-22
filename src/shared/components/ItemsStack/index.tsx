import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { BROWSER } from 'shared/consts';
import Button from 'shared/components/Button';
import { useAlertFunction } from 'shared/providers/alert';
import useIsMobileScreen from 'shared/hooks/useMobileScreen';
import { useFetchItems } from './useApi';
import { Props } from './types';

export default function ItemsStack<Item>(props: Props<Item>) {
  const {
    fetchUrl,
    children,
    queryKey,
    LoadingPlaceholder,
    submitResult,
    deleteResult,
    addText,
    submitMsg,
    deleteMsg,
  } = props;
  const toastIt = useAlertFunction();
  const { isMobile, isPortrait } = useIsMobileScreen();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const { isLoading, isError, data = [], error } = useFetchItems(
    queryKey,
    fetchUrl,
  );
  const onAddClick = useCallback(() => {
    BROWSER.isSafariMobile
      ? window.scrollTo(0, 0)
      : window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAddingItem(true);
  }, [BROWSER.isSafariMobile]);

  useEffect(() => {
    if (submitResult.isError || deleteResult.isError) {
      toastIt(
        submitResult.error?.message || deleteResult.error?.message,
        'red',
      );
    } else if (submitResult.isSuccess || deleteResult.isSuccess) {
      setIsAddingItem(false);
      const msg = submitResult.isSuccess
        ? submitMsg
        : deleteResult.isSuccess
        ? deleteMsg
        : '';
      toastIt(msg, 'green');
    }
    submitResult.reset();
    deleteResult.reset();
  }, [submitResult.status, deleteResult.status]);

  const addBtnClass = classNames(
    'z-10 fixed bottom-0 right-0 mr-2 rounded-full',
    isPortrait ? 'mb-16' : 'mb-16 sm:mb-5',
    'md:relative md:w-full md:flex md:justify-end md:mb-2 md:rounded-sm',
    isAddingItem && 'hidden md:hidden',
  );
  const addBtnText = !isMobile ? addText : '+';

  return (
    <div className="relative flex flex-col w-full">
      <span className={addBtnClass}>
        <Button
          className="px-4 md:px-2 py-3 md:py-1 shadow-md text-lg md:text-sm rounded-full md:rounded-sm md:mb-1"
          text={addBtnText}
          color="orange"
          onClick={onAddClick}
          data-testid="add-item"
        />
      </span>
      <div className="w-full">
        {isError && <p className="utl-error">{error?.message}</p>}
        {isLoading
          ? LoadingPlaceholder
          : children({
              items: data,
              isAddingItem,
              onCancel: () => setIsAddingItem(false),
            })}
      </div>
    </div>
  );
}
