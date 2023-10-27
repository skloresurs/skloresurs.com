import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorLoaded from '@/components/ErrorLoad';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type IVacancy from '@/interfaces/Vacancy';
import getVacancies from '@/strapi/full-collections/get-vacancies';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

async function Vacancy({ data }: { data: IVacancy }) {
  const t = await getI18n();
  return (
    <Card className="mb-5 break-inside-avoid-column">
      <CardHeader>
        <div className="relative h-16 w-16">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <h2 className="mt-1 text-lg font-medium md:text-xl lg:text-2xl">
          {data.title}
        </h2>
      </CardHeader>
      <CardContent>{data.description}</CardContent>
      <CardFooter>
        <Link
          className={twMerge(buttonVariants({ variant: 'outline' }), 'ml-auto')}
          href={`/vacancies/${data.id}`}
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
  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 text-center">{t('vacancies.title')}</h1>
        {!vacancies && <ErrorLoaded />}
        {vacancies && (
          <div className="columns-1 gap-4 md:col-span-2 lg:columns-3">
            {vacancies.map((e) => (
              <Vacancy key={e.id} data={e} />
            ))}
          </div>
        )}
      </div>
    </PageTransitionWrapper>
  );
}
