import '@/app/strapi.css';

import parse from 'html-react-parser';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import getDeliveryPage from '@/strapi/pages/get-delivery-page';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Delivery() {
  const t = await getI18n();
  const data = await getDeliveryPage(getCurrentLocale());
  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-6 text-center">{t('delivery.title')}</h1>
        {data && <div className="content">{parse(data)}</div>}
      </div>
    </PageTransitionWrapper>
  );
}
