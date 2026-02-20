import { useSettings } from '../context/SettingsContext';
import { translations } from './translations';

export const LOCALE_OPTIONS = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

export const useTranslation = () => {
  const { settings } = useSettings();
  const locale = settings?.locale || 'es';
  const t = translations[locale] || translations.es;
  return { t, locale };
};
