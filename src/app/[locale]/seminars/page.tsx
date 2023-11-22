import '@/app/strapi.css';

import parse from 'html-react-parser';
import type { Metadata } from 'next';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import getSeminarPage from '@/strapi/pages/get-seminar-page';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/seminars',
    },
    description: t('seminars.description'),
    openGraph: {
      description: t('seminars.description'),
      title: t('seminars.title'),
      url: 'https://skloresurs.com/seminars',
    },
    title: t('seminars.title'),
  };
}

export default async function Seminars() {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const data = await getSeminarPage(locale);
  return data ? (
    <div className="mx-auto max-w-6xl px-5">
      <h1 className="mb-5 text-center">{t('seminars.title')}</h1>
      <div className="content">{parse(data)}</div>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
