import type { Metadata } from 'next';
import React from 'react';

import I18nProvider from '@/components/I18nProvider';
import NewsClient from '@/components/NewsClient';
import { getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/news',
    },
    description: t('news.description'),
    openGraph: {
      description: t('news.description'),
      title: t('news.title'),
      url: 'https://skloresurs.com/news',
    },
    title: t('news.title'),
  };
}

export default async function News() {
  const t = await getI18n();

  return (
    <div className="mx-auto max-w-6xl px-5">
      <h1 className="mb-5 text-center">{t('news.title')}</h1>
      <I18nProvider>
        <NewsClient />
      </I18nProvider>
    </div>
  );
}
