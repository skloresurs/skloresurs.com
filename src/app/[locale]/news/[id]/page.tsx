import '@/app/strapi.css';

import parse from 'html-react-parser';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import getPostById from '@/strapi/news/get-news-by-id';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';
import getPostTagColor from '@/utils/post-tag-colors';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPostById(getCurrentLocale(), +params.id);
  return {
    alternates: {
      canonical: `/news/${params.id}`,
    },
    description: post?.description,
    openGraph: {
      description: post?.description,
      title: post?.title,
      type: 'article',
      url: `https://skloresurs.com/news/${params.id}`,
    },
    title: post?.title,
  };
}

export default async function NewsPage({ params }: { params: { id: string } }) {
  const t = await getI18n();
  if (!params.id) {
    return notFound();
  }

  const post = await getPostById(getCurrentLocale(), +params.id);

  if (!post) {
    return notFound();
  }
  return (
    <div className='mx-auto max-w-6xl px-5'>
      <Link
        href='/news'
        title={t('news.return-back')}
        className='mb-2 text-sm text-muted-foreground duration-300 hover:text-white'
      >
        {t('news.return-back')}
      </Link>
      <h1 className='mb-2 text-center'>{post.title}</h1>
      <div className='mb-5 flex flex-wrap items-center justify-center gap-2'>
        {post.tags.map((tag) => (
          <Badge key={tag.id} variant='outline' className={getPostTagColor(tag.color)}>
            {tag.title}
          </Badge>
        ))}
      </div>
      <div className='content'>{parse(post.content!)}</div>
    </div>
  );
}
