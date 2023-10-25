import Image from 'next/image';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { getI18n } from '@/utils/i18nServer';

export default async function Delivery() {
  const t = await getI18n();
  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-6 text-center">{t('delivery.title')}</h1>
        <p className="indent-4">{t('delivery.p1')}</p>
        <p className="indent-4">{t('delivery.p2')}</p>
        <p className="mt-4 indent-4">{t('delivery.p3')}</p>
        <Image
          src="/delivery.jpg"
          alt="delivery"
          width={450}
          height={450}
          className="mx-auto mt-4"
        />
      </div>
    </PageTransitionWrapper>
  );
}
