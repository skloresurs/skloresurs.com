import React from 'react';

import I18nProvider from '@/components/I18nProvider';
import getProductions from '@/strapi/full-collections/get-productions';
import { getCurrentLocale } from '@/utils/i18nServer';

import Production from './Production';

export default async function ProductionServer() {
  const productions = await getProductions(getCurrentLocale());
  return (
    <I18nProvider>
      {productions && <Production productions={productions} />}
    </I18nProvider>
  );
}
