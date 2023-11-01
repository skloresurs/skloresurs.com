'use client';

import { createI18nClient } from 'next-international/client';

// Create the i18n client and export its functions and components
export const {
  useI18n, // Hook for accessing i18n functions
  useScopedI18n, // Hook for accessing scoped i18n functions
  I18nProviderClient, // Component for providing i18n context
  useChangeLocale, // Hook for changing the current locale
  useCurrentLocale, // Hook for accessing the current locale
} = createI18nClient({
  uk: () => import('../locales/uk'), // Import the uk locale dynamically
  en: () => import('../locales/en'), // Import the en locale dynamically
});
