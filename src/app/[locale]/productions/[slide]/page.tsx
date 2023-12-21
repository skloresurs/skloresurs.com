import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import I18nProvider from '@/components/I18nProvider';
import ProductionsPlaylist from '@/components/productions/ProductionsPlaylist';
import ProductionsText from '@/components/productions/ProductionsText';
import getProductions from '@/strapi/full-collections/get-productions';
import { getCurrentLocale } from '@/utils/i18n-server';

export async function generateMetadata({ params }: { params: { slide: string } }): Promise<Metadata> {
  const productions = await getProductions(getCurrentLocale());
  const data = productions?.find((e) => e.order === +params.slide);
  return {
    description: data?.title,
    openGraph: {
      description: data?.description,
      title: data?.title,
      url: `https://skloresurs.com/productions/${params.slide}`,
    },
  };
}

export default async function Productions({ params }: { params: { slide: string } }) {
  const productions = await getProductions(getCurrentLocale());
  const data = productions?.find((e) => e.order === +params.slide);

  if (!data || !productions) {
    return redirect('/productions/1');
  }

  return (
    <>
      <video className='absolute inset-0 -z-50 h-full w-full object-cover' src={data.video} autoPlay muted loop />
      <div className='absolute inset-0 -z-40 h-full w-full bg-gradient-to-r from-black' />
      <I18nProvider>
        <ProductionsText data={data} />
        <ProductionsPlaylist productions={productions} slide={+params.slide} />
      </I18nProvider>
    </>
  );
}
