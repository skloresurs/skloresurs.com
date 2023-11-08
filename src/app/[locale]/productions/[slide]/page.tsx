import { redirect } from 'next/navigation';
import React from 'react';

import ProductionsPlaylist from '@/components/productions/ProductionsPlaylist';
import ProductionsText from '@/components/productions/ProductionsText';
import getProductions from '@/strapi/full-collections/get-productions';
import { getCurrentLocale } from '@/utils/i18n-server';

export default async function Productions({
  params,
}: {
  params: { slide: string };
}) {
  const productions = await getProductions(getCurrentLocale());
  const data = productions?.find((e) => e.order === +params.slide);

  if (!data || !productions) {
    return redirect('/productions/1');
  }

  return (
    <>
      <video
        className="absolute inset-0 -z-50 h-full w-full object-cover"
        src={data.video}
        autoPlay
        muted
        loop
      />
      <div className="absolute inset-0 -z-40 h-full w-full bg-gradient-to-r from-black" />
      <ProductionsText title={data.title} description={data.description} />
      <ProductionsPlaylist productions={productions} slide={+params.slide} />
    </>
  );
}
