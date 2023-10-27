import Image from 'next/image';
import Link from 'next/link';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import type IPost from '@/interfaces/Post';
import getNews from '@/strapi/full-collections/get-news';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

async function Post({ data }: { data: IPost }) {
  const t = await getI18n();
  return (
    <div className="mb-4 break-inside-avoid-column">
      <div className="relative mb-6 aspect-square w-full">
        <Image
          src={data.image}
          fill
          alt={data.title}
          className="object-cover"
        />
      </div>
      <div className="px-2">
        <h2 className="text-lg font-medium md:text-xl lg:text-2xl">
          {data.title}
        </h2>
        <p>
          {data.description}...{' '}
          {data.video ? (
            <Link target="_blank" href={data.video} className="text-primary">
              {t('news.watch-video')}
            </Link>
          ) : (
            <Link className="text-primary" href={`/news/${data.id}`}>
              {t('news.read-more')}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

export default async function News() {
  const t = await getI18n();
  const news = await getNews(getCurrentLocale());
  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 text-center">{t('news.title')}</h1>
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {news?.map((e) => <Post key={e.id} data={e} />)}
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
