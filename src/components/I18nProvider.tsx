import type { ReactNode } from 'react';
import React from 'react';

import { I18nProviderClient } from '@/utils/i18nClient';

interface IProviderProps {
  locale: string;
  children: ReactNode;
}

export default function I18nProvider({ locale, children }: IProviderProps) {
  return (
    <I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
      {children}
    </I18nProviderClient>
  );
}
