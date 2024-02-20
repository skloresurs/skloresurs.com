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
      <video className='absolute inset-0 -z-50 size-full object-cover' autoPlay muted loop>
        <source type='video/webm; codecs="av01.0.04M.08"; profiles="isom,av01,iso2,mp41"' src={data.video_av1} />
        <source type='video/mp4' src={data.video} />
      </video>
      <div className='absolute inset-0 -z-40 size-full bg-gradient-to-r from-black' />
      <I18nProvider>
        <ProductionsText data={data} />
        <ProductionsPlaylist productions={productions} slide={+params.slide} />
      </I18nProvider>
    </>
  );
}
