import type { Metadata } from 'next';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import ProjectsClient from '@/components/projects/ProjectsClient';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import { Separator } from '@/components/ui/separator';
import getCategories from '@/strapi/full-collections/projects/get-categories';
import getLocations from '@/strapi/full-collections/projects/get-locations';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: t('projects.title'),
    description: t('projects.description'),
    alternates: {
      canonical: '/projects',
    },
    openGraph: {
      title: t('projects.title'),
      description: t('projects.description'),
      url: 'https://skloresurs.com/projects',
    },
  };
}

export default async function Projects() {
  const locale = getCurrentLocale();
  const locations = await getLocations(locale);
  const glassCategories = await getCategories(locale);

  const t = await getI18n();
  return locations && glassCategories ? (
    <div className="mx-auto max-w-6xl px-5">
      <h1 className="mb-5 text-center">{t('projects.title')}</h1>
      <I18nProvider>
        <div className="flex h-full flex-col gap-3 md:flex-row">
          <ProjectsFilter
            locations={locations}
            glassCategories={glassCategories}
          />
          <Separator
            orientation="vertical"
            className="hidden h-auto md:block"
          />
          <ProjectsClient />
        </div>
      </I18nProvider>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
