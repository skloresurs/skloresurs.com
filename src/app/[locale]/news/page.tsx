import type { Metadata } from 'next';

import I18nProvider from '@/components/I18nProvider';
import NewsClient from '@/components/NewsClient';
import { getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t('news.title'),
    description: t('news.description'),
    alternates: {
      canonical: '/news',
    },
    openGraph: {
      title: t('news.title'),
      description: t('news.description'),
      url: 'https://skloresurs.com/news',
    },
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
