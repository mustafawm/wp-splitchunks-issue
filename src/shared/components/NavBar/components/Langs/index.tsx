import React, { useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from 'shared/types';
import { langs, StorageKeys } from 'shared/consts';
import Button from 'shared/components/Button';
import LoadingSpinner from 'shared/components/Spinner';
import storage from 'shared/services/storage';
import { LangOptionProps } from './types';

// TODO temp
const [english, thai] = langs;

const LangOption = (props: LangOptionProps) => {
  const { lang, onClick, isSelected } = props;
  return (
    <Button
      title={lang.value}
      color="white"
      text={lang.label}
      onClick={onClick}
      className={`font-light p-1 hover:text-green-600 ${
        isSelected && 'cursor-default text-green-600'
      }`}
      data-testid={`lang-${lang.value}`}
    />
  );
};

export default function LanguageOptions(props: { className?: string }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = storage.local.getItem(StorageKeys.lang);
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);

  const changeLang = (lang: Language): void => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
      storage.local.setItem(StorageKeys.lang, lang);
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner svgClassName="w-6 h-6" />}>
      <div className={`flex items-center mr-1 ${props.className}`}>
        <LangOption
          lang={english}
          isSelected={english.value === i18n.language}
          onClick={(): void => changeLang(english.value)}
        />
        <span className="mx-px text-gray-700">|</span>
        <LangOption
          lang={thai}
          isSelected={thai.value === i18n.language}
          onClick={(): void => changeLang(thai.value)}
        />
      </div>
    </Suspense>
  );
}
