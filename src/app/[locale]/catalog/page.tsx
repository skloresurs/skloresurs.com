import '@/app/strapi.css';

import type { Metadata } from 'next';
import React from 'react';

import CatalogCategorySwitcher from '@/components/CatalogCategorySwitcher';
import CatalogClient from '@/components/CatalogClient';
import I18nProvider from '@/components/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { getI18n } from '@/utils/i18nServer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t('catalog.title'),
    description: t('catalog.description'),
    alternates: {
      canonical: '/news',
    },
    openGraph: {
      title: t('catalog.title'),
      description: t('catalog.description'),
      url: 'https://skloresurs.com/catalog',
    },
  };
}

export default async function Catalog() {
  const t = await getI18n();
  return (
    <PageTransitionWrapper>
      <div className="mx-auto w-full max-w-6xl px-5">
        <h1 className="mb-2 text-center">{t('catalog.title')}</h1>
        <I18nProvider>
          <CatalogCategorySwitcher />
          <CatalogClient />
        </I18nProvider>
      </div>
    </PageTransitionWrapper>
  );
}
