import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import I18nProvider from '@/components/I18nProvider';
import ProductionsPlaylist from '@/components/productions/ProductionsPlaylist';
import ProductionsText from '@/components/productions/ProductionsText';
import getProductions from '@/strapi/get-productions';
import { getCurrentLocale } from '@/utils/i18n-server';

export async function generateMetadata({ params }: { params: { slide: string } }): Promise<Metadata> {
  const productions = await getProductions(getCurrentLocale());
  const data = productions?.find((e) => e.order === +params.slide);
  return {
    description: data?.alt.title,
    openGraph: {
      description: data?.alt.description,
      title: data?.alt.title,
      url: `https://skloresurs.com/productions/${params.slide}/alt`,
    },
  };
}

export default async function Productions({ params }: { params: { slide: string } }) {
  const productions = await getProductions(getCurrentLocale());
  const data = productions?.find((e) => e.order === +params.slide);

  if (!data || !productions || !data.alt) {
    return redirect(`/productions/${params.slide}`);
  }

  return (
    <>
      <video className='absolute inset-0 -z-50 size-full object-cover' src={data.alt.video} autoPlay muted loop />
      <div className='absolute inset-0 -z-40 size-full bg-gradient-to-r from-black' />
      <I18nProvider>
        <ProductionsText data={data} alt />
      </I18nProvider>
      <ProductionsPlaylist productions={productions} slide={+params.slide} />
    </>
  );
}
