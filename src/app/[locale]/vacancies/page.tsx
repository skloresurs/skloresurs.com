import type { Metadata } from 'next';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import Vacancy from '@/components/Vacancy';
import getVacancies from '@/strapi/vacancy/get-vacancies';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/vacancies',
    },
    description: t('vacancies.description'),
    openGraph: {
      description: t('vacancies.description'),
      title: t('vacancies.title'),
      url: 'https://skloresurs.com/vacancies',
    },
    title: t('vacancies.title'),
  };
}

export default async function Vacancies() {
  const vacancies = await getVacancies(getCurrentLocale());
  const t = await getI18n();
  return vacancies ? (
    <div className='mx-auto max-w-6xl px-5'>
      <h1 className='mb-5 text-center'>{t('vacancies.title')}</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {vacancies.map((e) => (
          <Vacancy key={e.id} data={e} />
        ))}
      </div>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
