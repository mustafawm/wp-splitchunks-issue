import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BROWSER, StorageKeys } from 'shared/consts';
import storage from 'shared/services/storage';
import Button from 'shared/components/Button';
import { usePromptToInstall } from 'shared/providers/propmptToInstall';
import IOSInstructions from './IOSInstructions';

export default function InstallPrompt() {
  const { t } = useTranslation();
  const { deferredEvt, invalidateEvt } = usePromptToInstall();
  const [state, setState] = useState({
    hasAsked: Boolean(storage.local.getItem(StorageKeys.hasPromptediOS)),
    showIOSBox: false,
  });
  const setShowIOSBox = useCallback(showIOSBox => {
    setState({
      showIOSBox,
      hasAsked: storage.local.setItem(StorageKeys.hasPromptediOS, 1) as boolean,
    });
  }, []);

  const onInstall = () => {
    if (deferredEvt?.prompt) {
      deferredEvt.prompt();
      invalidateEvt();
    } else if (BROWSER.isSafariMobile) {
      setShowIOSBox(true);
    }
  };
  const onHideMessage = useCallback(() => {
    if (deferredEvt) {
      invalidateEvt();
    } else {
      setShowIOSBox(false);
    }
  }, []);

  const shouldShowPrompt =
    !BROWSER.isStandAlone &&
    ((BROWSER.isChrome && deferredEvt) ||
      (BROWSER.isSafariMobile && !state.hasAsked));

  if (state.showIOSBox) {
    return <IOSInstructions onClose={onHideMessage} />;
  }
  if (!shouldShowPrompt) {
    return null;
  }
  return (
    <span className="mt-4 py-2 w-ful border-t border-gray-300 flex flex-col items-center">
      <span>
        <p className="text-gray-900">
          <span role="img" aria-label="down-pointing double triangle">
            ⏬{' '}
          </span>
          {t('app.installQ')}
        </p>
        <span className="flex justify-around items-center my-1">
          <Button
            color="blue"
            className="py-px px-3 text-xs "
            text={t('common.yes')}
            onClick={onInstall}
          />
          <Button
            color="white"
            className="p-0 text-xs text-gray-800 underline"
            text={t('app.noHideMsg')}
            onClick={onHideMessage}
          />
        </span>
      </span>
    </span>
  );
}
