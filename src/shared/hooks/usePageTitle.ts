import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function usePageTitle(
  title: string,
  shouldTranslate = true,
): void {
  const { t } = useTranslation();

  useEffect(() => {
    const appTitle = t('app.title');

    if (title) {
      const pageTitle = shouldTranslate ? t(title) : title;
      document.title = `${appTitle} | ${pageTitle}`;
    }

    return (): void => {
      if (title) {
        document.title = appTitle;
      }
    };
  }, [title]);
}
