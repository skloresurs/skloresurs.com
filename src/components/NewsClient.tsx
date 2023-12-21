'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { MdiEye, MdiVideo } from '@/components/icons/mdi';
import MdiArrowTopRightThick from '@/components/icons/mdi/MdiArrowTopRightThick';
import { Badge } from '@/components/ui/badge';
import CustomPagination from '@/components/ui/pagination';
import type IPostExtended from '@/types/Post';
import { useCurrentLocale } from '@/utils/i18n-client';
import getPostTagColor from '@/utils/post-tag-colors';

function Post({ data }: { data: IPostExtended }) {
  return (
    <Link
      title={data.title}
      href={data.category === 'video' ? data.video! : `/news/${data.id}`}
      target={data.category === 'video' ? '_blank' : '_self'}
      className='group flex flex-col'
      data-aos='fade-down'
      data-aos-anchor-placement='top-bottom'
    >
      <div className='relative mb-6 aspect-square w-full overflow-hidden sm:mb-8'>
        <Image
          src={data.image}
          fill
          alt={data.title}
          title={data.title}
          loading='lazy'
          className='object-cover duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:blur-sm'
        />
        {data.category === 'video' ? (
          <MdiVideo className='absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0 drop-shadow-lg duration-300 group-hover:opacity-100' />
        ) : (
          <MdiEye className='absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0 drop-shadow-lg duration-300 group-hover:opacity-100' />
        )}
      </div>
      <div className='mb-3 flex flex-row items-start gap-4 duration-300 group-hover:text-primary'>
        <h2
          className='flex-1 text-lg font-medium sm:text-xl lg:text-2xl'
          data-aos='fade-right'
          data-aos-anchor-placement='top-bottom'
          data-aos-delay='100'
        >
          {data.title}
        </h2>
        <MdiArrowTopRightThick className='h-6 w-6' />
      </div>
      <p
        className='line-clamp-2 text-muted-foreground'
        data-aos='fade-right'
        data-aos-anchor-placement='top-bottom'
        data-aos-delay='200'
      >
        {data.description}
      </p>
      {data.tags.length > 0 && (
        <div className='mt-6 flex flex-wrap gap-2'>
          {data.tags.map((tag) => (
            <Badge variant='outline' className={getPostTagColor(tag.color)} key={tag.id}>
              {tag.title}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}

export default function NewsClient() {
  const locale = useCurrentLocale();
  const query = useSearchParams();
  const [news, setNews] = useState<IPostExtended[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`/api/news?page=${query.get('page') ?? 1}&locale=${locale}`)
      .then((data) => {
        setNews(data.data.posts);
        return setTotal(Math.ceil(data.data.total / 6));
      })
      .catch(() => null);
  }, [query, locale]);

  return (
    <>
      <div className='grid flex-1 grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12'>
        {news.map((e) => (
          <Post key={e.id} data={e} />
        ))}
      </div>
      {news && news.length > 0 && <CustomPagination href='/news' totalPages={total} />}
    </>
  );
}
