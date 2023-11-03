import '@/app/strapi.css';

import parse from 'html-react-parser';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import getVacancyById from '@/strapi/get-vacancy-by-id';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const vacancy = await getVacancyById(getCurrentLocale(), +params.id);
  return {
    title: vacancy?.title,
    description: vacancy?.description,
    alternates: {
      canonical: `/vacancies/${vacancy?.id}`,
    },
    openGraph: {
      title: vacancy?.title,
      description: vacancy?.description,
      url: `https://skloresurs.com/vacancies/${vacancy?.id}`,
    },
  };
}

export default async function Vacancy({ params }: { params: { id: string } }) {
  const t = await getI18n();
  if (!params.id) {
    return notFound();
  }
  const vacancy = await getVacancyById(getCurrentLocale(), +params.id);

  if (!vacancy) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-5">
      <Link
        href="/vacancies"
        title={t('vacancies.return-back')}
        className="mb-2 text-sm text-muted-foreground duration-300 hover:text-white"
      >
        {t('vacancies.return-back')}
      </Link>
      <h1 className="mb-5 flex-1 text-center">{vacancy.title}</h1>
      <div className="flex flex-col items-start gap-4 md:flex-row">
        {vacancy.video ? (
          <video
            src={vacancy.video}
            muted
            autoPlay
            loop
            className="mx-auto h-min object-cover md:w-[200px]"
          />
        ) : (
          <Image
            src={vacancy.image}
            alt={vacancy.title}
            title={vacancy.title}
            width="200"
            height="200"
            className="mx-auto h-min object-cover"
            loading="lazy"
          />
        )}
        <div className="content">{parse(vacancy.content)}</div>
      </div>
    </div>
  );
}
