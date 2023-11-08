import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import getBookQuality from '@/strapi/get-book-of-quality';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

import { MdiChevronRight } from '../icons/mdi';
import { buttonVariants } from '../ui/button';

export default async function QualityBook() {
  const t = await getI18n();
  const url = await getBookQuality(getCurrentLocale());
  return (
    <div id="quality-book" className="mt-6 bg-background-alternative">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 p-6 md:flex-row">
        <div className="relative mx-auto w-full max-w-[400px] md:w-1/3 md:pr-12">
          <Image
            src="/quality-book.png"
            alt="Quality book"
            title="Quality book"
            height={447}
            width={400}
            loading="lazy"
            className="bottom-0 w-full object-cover object-bottom md:absolute"
          />
        </div>
        <div className="flex flex-col gap-4 pt-6 md:w-2/3 md:pb-20">
          <h2 className="text-primary" data-aos="fade-right">
            {t('home.quality.title')}
          </h2>
          <p
            className="text-muted-foreground"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {t('home.quality.description')}
          </p>
          <Link
            href={url ?? '#'}
            target="_blank"
            title={t('home.quality.button')}
            data-aos="fade-right"
            data-aos-delay="200"
            className={twMerge(
              buttonVariants({ variant: 'default' }),
              'w-min flex flex-row gap-1 items-center',
            )}
          >
            {t('home.quality.button')}
            <MdiChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
