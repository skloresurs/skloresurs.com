import '@/app/strapi.css';

import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import CollapsibleItem from '@/components/catalog/CollapsibleItem';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

import EN from './i18n/en.json';
import UK from './i18n/uk.json';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/catalog',
    },
    description: t('catalog.description'),
    openGraph: {
      description: t('catalog.description'),
      title: `${t('catalog.title')} | ${t('meta.logo')}`,
      url: 'https://skloresurs.com/catalog',
    },
    title: t('catalog.title'),
  };
}

export default async function Catalog() {
  const t = await getI18n();
  const currentLocale = getCurrentLocale();
  const translatedData = currentLocale === 'uk' ? UK : EN;
  return (
    <div className='mx-auto w-full max-w-6xl px-5'>
      <h1 className='mb-2 text-center'>{t('catalog.title')}</h1>
      <div className='flex flex-col gap-5 md:flex-row md:justify-between md:gap-3'>
        <div className='flex max-w-[400px] flex-col items-center gap-3 md:w-1/2'>
          <Image src='/double-glazing.png' alt={translatedData['double-glazing'].title} width='200' height='200' />
          <h2 className='uppercase'>{translatedData['double-glazing'].title}</h2>
          <ul className='flex w-full flex-col gap-3'>
            {translatedData['double-glazing'].elements.map((e) => (
              <h3 className='m-0 p-0 text-xl' key={e.title}>
                {e.title}
              </h3>
            ))}
          </ul>
        </div>
        <div className='flex max-w-[400px] flex-col items-center gap-3  md:w-1/2'>
          <Image src='/monoglass.png' alt={translatedData.mono.title} width='275' height='275' />
          <h2 className='uppercase'>{translatedData.mono.title}</h2>
          <ul className='flex w-full flex-col gap-3'>
            {translatedData.mono.elements.map((e) =>
              e.children ? (
                <CollapsibleItem key={e.title} item={e} />
              ) : (
                <h3 className='m-0 p-0 text-xl' key={e.title}>
                  {e.title}
                </h3>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
