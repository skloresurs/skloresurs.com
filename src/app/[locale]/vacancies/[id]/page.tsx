import '@/app/strapi.css';

import parse from 'html-react-parser';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import getVacancyById from '@/strapi/get-vacancy-by-id';
import { getCurrentLocale } from '@/utils/i18nServer';

export default async function Vacancy({ params }: { params: { id: string } }) {
  if (!params.id) {
    return notFound();
  }
  const vacancy = await getVacancyById(getCurrentLocale(), +params.id);

  if (!vacancy) {
    return notFound();
  }

  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 flex-1 text-center">{vacancy.title}</h1>
        <div className="flex flex-col items-start gap-4 md:flex-row">
          {vacancy.video ? (
            <video
              src={vacancy.video}
              muted
              autoPlay
              loop
              className="mx-auto h-min object-cover md:w-[200px]"
            />
          ) : (
            <Image
              src={vacancy.image}
              alt={vacancy.title}
              width="200"
              height="200"
              className="mx-auto h-min object-cover"
              loading="lazy"
            />
          )}
          <div className="content">{parse(vacancy.content)}</div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
