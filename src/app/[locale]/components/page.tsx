import type { Metadata } from 'next';
import React from 'react';

import ComponentsClient from '@/components/components/ComponentsClient';
import ComponentsFilter from '@/components/components/ComponentsFilter';
import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import { Separator } from '@/components/ui/separator';
import getComponentCategories from '@/strapi/full-collections/components/get-categories';
import getComponentManufacturers from '@/strapi/full-collections/components/get-manufacturers';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/components',
    },
    description: t('components.description'),
    openGraph: {
      description: t('components.description'),
      title: t('components.title'),
      url: 'https://skloresurs.com/components',
    },
    title: t('components.title'),
  };
}

export default async function Components() {
  const t = await getI18n();
  const categories = await getComponentCategories(getCurrentLocale());
  const manufacturers = await getComponentManufacturers(getCurrentLocale());

  return categories && manufacturers ? (
    <div className='mx-auto w-full max-w-6xl px-5'>
      <h1 className='mb-5 text-center'>{t('components.title')}</h1>
      <I18nProvider>
        <div className='flex h-full flex-col gap-3 md:flex-row'>
          <ComponentsFilter categories={categories} manufacturers={manufacturers} />
          <Separator orientation='vertical' className='hidden h-auto md:block' />
          <ComponentsClient />
        </div>
      </I18nProvider>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
