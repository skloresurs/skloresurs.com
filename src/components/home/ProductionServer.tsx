import React from 'react';

import getProductions from '@/strapi/full-collections/get-productions';
import { getCurrentLocale } from '@/utils/i18nServer';

import I18nProvider from '../I18nProvider';
import Production from './Production';

export default async function ProductionServer() {
  const productions = await getProductions(getCurrentLocale());
  return (
    <I18nProvider>
      {productions && <Production productions={productions} />}
    </I18nProvider>
  );
}
