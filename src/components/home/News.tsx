import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from '@/components/ui/button';
import getLatestNews from '@/strapi/get-latest-news';
import type IPost from '@/types/Post';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

import { MdiChevronRight } from '../icons/mdi';

interface IPostItem {
  news: IPost;
  index: number;
}

async function NewsItem({ news, index }: IPostItem) {
  const t = await getI18n();
  return (
    <div
      className="flex flex-col gap-2"
      data-aos="fade-down"
      data-aos-delay={150 + 100 * index}
    >
      <h3 className="text-lg font-semibold">{news.title}</h3>
      <p className="text-sm text-muted-foreground">{news.description}</p>
      <Link
        title={t('home.news.read-more')}
        href={`/news/${news.id}`}
        className={twMerge(
          buttonVariants({ variant: 'link' }),
          'w-min ml-auto',
        )}
      >
        {t('home.news.read-more')}
        <MdiChevronRight />
      </Link>
    </div>
  );
}

export default async function News() {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const news = await getLatestNews(locale);
  return (
    <div id="news" className="mx-auto mb-16 mt-20 w-full max-w-6xl px-6">
      <div className="flex flex-row items-center justify-between">
        <h2 data-aos="fade-right">{t('home.news.title')}</h2>
        <Link
          href="/news"
          title={t('home.news.button')}
          className={twMerge(
            buttonVariants({ variant: 'default' }),
            'hidden md:flex items-center gap-1',
          )}
        >
          {t('home.news.button')}
          <MdiChevronRight />
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        {news?.map((e, i) => <NewsItem key={e.id} news={e} index={i} />)}
      </div>
      <Link
        title={t('home.news.button')}
        href="/news"
        className={twMerge(
          buttonVariants({ variant: 'default' }),
          'flex md:hidden items-center gap-1 pt-3',
        )}
      >
        {t('home.news.button')}
        <MdiChevronRight />
      </Link>
    </div>
  );
}
