import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';
import React from 'react';

import getCatalogByCategory from '@/strapi/catalog/get-catalog-by-category';
import getCatalogCategories from '@/strapi/catalog/get-categories';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const t = await getI18n();
  const currentLocale = getCurrentLocale();
  const categories = await getCatalogCategories(currentLocale);
  const category = categories?.find((e) => e.slug === params.slug);

  if (!category) {
    redirect('/catalog');
  }
  return {
    alternates: {
      canonical: `/catalog/${params.slug}`,
    },
    description: t('catalog.description'),
    openGraph: {
      description: t('catalog.description'),
      title: `${category.title} | ${t('meta.logo')}`,
      url: `https://skloresurs.com/catalog/${params.slug}`,
    },
    title: category.title,
  };
}

export default async function Catalog({ params }: { params: { slug: string } }) {
  const t = await getI18n();
  const currentLocale = getCurrentLocale();
  const categories = await getCatalogCategories(currentLocale);
  const category = categories?.find((e) => e.slug === params.slug);

  if (!category) {
    redirect('/catalog');
  }

  const catalogList = await getCatalogByCategory(currentLocale, params.slug);

  if (!catalogList) {
    redirect('/catalog');
  }
  return (
    <div className='flex flex-col items-center'>
      <Image src={category.image} alt={category.title} width='250' height='250' />
      <h2>{category.title}</h2>
      <div className='mt-4 flex flex-col gap-2'>
        {catalogList.map((e) => (
          <Link
            href={`/catalog/${params.slug}/${e.slug}`}
            key={e.slug}
            className='text-center text-2xl text-primary duration-300 hover:text-muted-foreground'
          >
            {e.title}
          </Link>
        ))}
      </div>

      <Link href='/catalog' className='mt-8 text-primary duration-300 hover:text-muted-foreground'>
        {`<< ${t('back')}`}
      </Link>
    </div>
  );
}
