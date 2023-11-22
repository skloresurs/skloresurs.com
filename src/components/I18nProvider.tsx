import type { ReactNode } from 'react';
import React from 'react';

import { I18nProviderClient } from '@/utils/i18n-client';
import { getCurrentLocale } from '@/utils/i18n-server';

export default function I18nProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <I18nProviderClient
      locale={getCurrentLocale()}
      fallback={<p>Loading...</p>}
    >
      {children}
    </I18nProviderClient>
  );
}
