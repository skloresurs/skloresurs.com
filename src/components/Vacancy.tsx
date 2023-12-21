import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import IVacancy from '@/types/Vacancy';
import { getI18n } from '@/utils/i18n-server';

import { buttonVariants } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default async function Vacancy({ data }: { data: IVacancy }) {
  const t = await getI18n();
  return (
    <Card
      className='flex break-inside-avoid-column flex-col'
      data-aos='fade-down'
      data-aos-anchor-placement='top-bottom'
    >
      <CardHeader className='pb-2'>
        <div className='relative h-16 w-16'>
          <Image
            src={data.image}
            alt={data.title}
            title={data.title}
            fill
            loading='lazy'
            className='rounded-md object-cover'
          />
        </div>
        <h2 className='mb-0 mt-1 text-lg font-medium md:text-xl lg:text-2xl'>{data.title}</h2>
      </CardHeader>
      <CardContent className='flex-1 pb-2 text-muted-foreground'>
        <p className='line-clamp-3'>{data.description}</p>
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
