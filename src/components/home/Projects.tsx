import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from '@/components/ui/button';
import { getI18n } from '@/utils/i18n-server';

import { MdiChevronRight } from '../icons/mdi';

export default async function Projects() {
  const t = await getI18n();
  return (
    <div id='projects' className='mt-6 bg-background-alternative'>
      <div className='relative mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row'>
        <div className='flex flex-col gap-4 pt-6 md:w-1/2 md:pb-20'>
          <h2 className='text-primary' data-aos='fade-right' data-aos-anchor-placement='top-bottom'>
            {t('home.projects.title')}
          </h2>
          <p
            className='text-muted-foreground'
            data-aos='fade-right'
            data-aos-anchor-placement='top-bottom'
            data-aos-delay='100'
          >
            {t('home.projects.description')}
          </p>
          <Link
            href='/projects'
            title={t('home.projects.button')}
            data-aos='fade-right'
            data-aos-anchor-placement='top-bottom'
            data-aos-delay='200'
            className={twMerge(buttonVariants({ variant: 'default' }), 'w-min flex flex-row gap-1 items-center')}
          >
            {t('home.projects.button')}
            <MdiChevronRight />
          </Link>
        </div>
        <div className='relative w-full md:w-1/2'>
          <Image
            src='/projects.png'
            alt='Projects'
            title='Projects'
            height={400}
            width={700}
            loading='lazy'
            className='bottom-0 w-full object-cover object-bottom md:absolute'
          />
        </div>
      </div>
    </div>
  );
}
