import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from 'shared/providers/auth';
import { AlertProvider } from 'shared/providers/alert';
import { PromptToInstallProvider } from 'shared/providers/propmptToInstall';
import LogoName from 'shared/components/LogoName';
import ErrorBoundary from 'shared/components/ErrorBoundary';
import ConnectionStatus from 'shared/components/ConnectionStatus';
import Routes from './Routes';

export default function __appUpApp() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <PromptToInstallProvider>
        <ConnectionStatus message={t('app.youreOffline')} />
        <BrowserRouter>
          <AlertProvider>
            <AuthProvider>
              <main>
                <Suspense fallback={<LogoName showLoadingIndicator />}>
                  <Routes />
                </Suspense>
              </main>
            </AuthProvider>
          </AlertProvider>
        </BrowserRouter>
      </PromptToInstallProvider>
    </ErrorBoundary>
  );
}
