import '@/app/strapi.css';

import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { getCurrentLocale } from '@/utils/i18nServer';
import getPostById from '@/strapi/get-news-by-id';

export default async function NewsPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    return notFound();
  }

  const post = await getPostById(getCurrentLocale(), +params.id);

  if (!post) {
    return notFound();
  }
  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 text-center">{post.title}</h1>
        <div className="content">{parse(post.content!)}</div>
      </div>
    </PageTransitionWrapper>
  );
}
