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
    <div className='mx-auto max-w-6xl px-5'>
      <h1 className='mb-5 text-center'>{t('delivery.title')}</h1>
      <video src='/delivery/video.mp4' autoPlay muted loop className='aspect-video' />
      <div className='content relative ml-auto mt-6 max-w-[400px] bg-black/70 p-6 pt-12 md:mr-[50px] md:mt-[-250px]'>
        <Image src='/delivery/glass.png' alt='glass' fill className='relative z-30' />
        <p>{t('delivery.p1')}</p>
        <p>{t('delivery.p2')}</p>
        <br />
        <p>{t('delivery.p3')}</p>
      </div>
    </div>
  );
}
