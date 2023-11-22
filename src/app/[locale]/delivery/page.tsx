import '@/app/strapi.css';

import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import { getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/delivery',
    },
    description: t('delivery.description'),
    openGraph: {
      description: t('delivery.description'),
      title: t('delivery.title'),
      url: 'https://skloresurs.com/delivery',
    },
    title: t('delivery.title'),
  };
}

export default async function Delivery() {
  const t = await getI18n();
  return (
    <div className="mx-auto max-w-6xl px-5">
      <h1 className="mb-5 text-center">{t('delivery.title')}</h1>
      <div className="relative h-[200px] sm:h-[400px]">
        <Image
          src="/delivery/glass1.png"
          alt="cars"
          width={1000}
          height={400}
          className="absolute left-0 h-full w-full max-w-[1000px] overflow-x-hidden"
        />
        <Image
          src="/delivery/cars.png"
          alt="cars"
          width={800}
          height={352}
          className="absolute -bottom-10 left-3 w-full min-w-[400px] max-w-[800px]"
        />
        <Image
          src="/delivery/clouds.png"
          alt="clouds"
          width={500}
          height={172}
          className="absolute right-0"
        />
      </div>
      <div className="content relative ml-auto mt-6 max-w-[600px] p-6 pt-12 md:mt-[-50px]">
        <Image
          src="/delivery/glass2.png"
          alt="glass"
          fill
          className="relative z-30"
        />
        <p>{t('delivery.p1')}</p>
        <p>{t('delivery.p2')}</p>
        <br />
        <p>{t('delivery.p3')}</p>
      </div>
    </div>
  );
}
