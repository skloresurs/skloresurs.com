import '@/app/strapi.css';

import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';
import React from 'react';

import getCatalogBySlug from '@/strapi/catalog/get-catalog-by-slug';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata({ params }: { params: { slug: string; element: string } }): Promise<Metadata> {
  const t = await getI18n();
  const currentLocale = getCurrentLocale();
  const element = await getCatalogBySlug(currentLocale, params.slug, params.element);

  if (!element) {
    redirect('/catalog');
  }

  return {
    alternates: {
      canonical: `catalog/${params.slug}/${params.element}`,
    },
    description: element.content,
    openGraph: {
      description: element.content,
      title: `${element.title} | ${t('meta.logo')}`,
      url: `https://skloresurs.com/catalog/${params.slug}/${params.element}`,
    },
    title: element.title,
  };
}

export default async function Catalog({ params }: { params: { slug: string; element: string } }) {
  const t = await getI18n();
  const currentLocale = getCurrentLocale();
  const element = await getCatalogBySlug(currentLocale, params.slug, params.element);

  if (!element) {
    redirect('/catalog');
  }
  return (
    <div className='mx-auto flex max-w-6xl flex-col items-center'>
      <Image src={element.image} alt={element.title} width='350' height='350' />
      <h2>{element.title}</h2>
      <div className='content text-center'>{parse(element.content)}</div>
      <Link href={`/catalog/${params.slug}`} className='mt-8 text-primary duration-300 hover:text-muted-foreground'>
        {`<< ${t('back')}`}
      </Link>
    </div>
  );
}
