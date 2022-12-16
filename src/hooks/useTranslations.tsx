/**
 * Helper hook for localized text strings
 */
import {useSelector} from 'react-redux';
import localeTypes from '../i18n/localetypes';

import * as En from '../i18n/en.json';
import * as Ru from '../i18n/ru.json';

type translationsArrayType = {
  [Property in localeTypes as string]: object;
};

const translations: translationsArrayType = {
  en: En,
  ru: Ru,
};

type stateType = {
  locale: localeTypes;
};

type translationKeys = {
  [Property in keyof typeof En]: string;
};

const useTranslations = (): translationKeys => {
  const locale = useSelector((state: stateType) => state?.locale ?? 'en');
  return Object.assign(
    translations.en,
    translations[locale],
  ) as translationKeys;
};

export default useTranslations;
