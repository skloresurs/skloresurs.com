import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorLoaded from '@/components/ErrorLoad';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import getVacancies from '@/strapi/full-collections/get-vacancies';
import type IVacancy from '@/types/Vacancy';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t('vacancies.title'),
    description: t('vacancies.description'),
    alternates: {
      canonical: '/vacancies',
    },
    openGraph: {
      title: t('vacancies.title'),
      description: t('vacancies.description'),
      url: 'https://skloresurs.com/vacancies',
    },
  };
}

async function Vacancy({ data }: { data: IVacancy }) {
  const t = await getI18n();
  return (
    <Card
      className="flex break-inside-avoid-column flex-col"
      data-aos="fade-down"
    >
      <CardHeader className="pb-2">
        <div className="relative h-16 w-16">
          <Image
            src={data.image}
            alt={data.title}
            title={data.title}
            fill
            loading="lazy"
            className="rounded-md object-cover"
          />
        </div>
        <h2 className="mb-0 mt-1 text-lg font-medium md:text-xl lg:text-2xl">
          {data.title}
        </h2>
      </CardHeader>
      <CardContent className="flex-1 pb-2 text-muted-foreground">
        <p className="line-clamp-3">{data.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          className={twMerge(buttonVariants({ variant: 'outline' }), 'ml-auto')}
          href={`/vacancies/${data.id}`}
          title={t('vacancies.detailed-button')}
        >
          {t('vacancies.detailed-button')}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default async function Vacancies() {
  const vacancies = await getVacancies(getCurrentLocale());
  const t = await getI18n();
  return vacancies ? (
    <div className="mx-auto max-w-6xl px-5">
      <h1 className="mb-5 text-center">{t('vacancies.title')}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vacancies.map((e) => (
          <Vacancy key={e.id} data={e} />
        ))}
      </div>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
