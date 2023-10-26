import '@/app/strapi.css';

import parse from 'html-react-parser';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import getSeminars from '@/strapi/get-seminars';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Seminars() {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const data = await getSeminars(locale);
  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 text-center">{t('seminars.title')}</h1>
        {data && <div className="content">{parse(data)}</div>}
      </div>
    </PageTransitionWrapper>
  );
}
