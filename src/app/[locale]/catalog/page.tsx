import { Metadata } from 'next/types';
import React from 'react';

import Category from '@/components/catalog/Category';
import getCatalogCategories from '@/strapi/catalog/get-categories';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

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
  const currentLocale = getCurrentLocale();
  const categories = await getCatalogCategories(currentLocale);
  return (
    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2'>
      {categories?.map((e) => <Category category={e} key={e.slug} />)}
    </div>
  );
}
