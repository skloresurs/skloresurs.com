import type { ReactNode } from 'react';
import React from 'react';

import { I18nProviderClient } from '@/utils/i18nClient';
import { getCurrentLocale } from '@/utils/i18nServer';

export default function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nProviderClient
      locale={getCurrentLocale()}
      fallback={<p>Loading...</p>}
    >
      {children}
    </I18nProviderClient>
  );
}
