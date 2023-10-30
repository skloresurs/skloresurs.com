import React from 'react';

import ComponentsClient from '@/components/components/ComponentsClient';
import ComponentsFilter from '@/components/components/ComponentsFilter';
import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { Separator } from '@/components/ui/separator';
import getCategories from '@/strapi/full-collections/components/get-categories';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Components() {
  const t = await getI18n();
  const categories = await getCategories(getCurrentLocale());

  return (
    <PageTransitionWrapper>
      {categories ? (
        <div className="mx-auto w-full max-w-6xl px-5">
          <h1 className="mb-5 text-center">{t('components.title')}</h1>
          <I18nProvider>
            <div className="flex h-full flex-col gap-3 md:flex-row">
              <ComponentsFilter categories={categories} />
              <Separator
                orientation="vertical"
                className="hidden h-auto md:block"
              />
              <ComponentsClient />
            </div>
          </I18nProvider>
        </div>
      ) : (
        <ErrorLoaded />
      )}
    </PageTransitionWrapper>
  );
}
