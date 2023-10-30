import '@/app/strapi.css';

import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { Badge } from '@/components/ui/badge';
import getPostById from '@/strapi/get-news-by-id';
import { getCurrentLocale } from '@/utils/i18nServer';
import getPostTagColor from '@/utils/post-tag-colors';

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
        <h1 className="mb-2 text-center">{post.title}</h1>
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="outline"
              className={getPostTagColor(tag.color)}
            >
              {tag.title}
            </Badge>
          ))}
        </div>
        <div className="content">{parse(post.content!)}</div>
      </div>
    </PageTransitionWrapper>
  );
}
