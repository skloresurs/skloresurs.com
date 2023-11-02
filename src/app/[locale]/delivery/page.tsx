import '@/app/strapi.css';

import parse from 'html-react-parser';
import type { Metadata } from 'next';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import getDeliveryPage from '@/strapi/pages/get-delivery-page';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t('delivery.title'),
    description: t('delivery.description'),
    alternates: {
      canonical: '/delivery',
    },
    openGraph: {
      title: t('delivery.title'),
      description: t('delivery.description'),
      url: 'https://skloresurs.com/delivery',
    },
  };
}

export default async function Delivery() {
  const t = await getI18n();
  const data = await getDeliveryPage(getCurrentLocale());

  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-6 text-center">{t('delivery.title')}</h1>
        {data ? <div className="content">{parse(data)}</div> : <ErrorLoaded />}
      </div>
    </PageTransitionWrapper>
  );
}
