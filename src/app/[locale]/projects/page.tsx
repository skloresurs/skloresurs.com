import axios from 'axios';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import ProjectsClient from '@/components/projects/ProjectsClient';
import type IProject from '@/interfaces/Projects';
import getAllProjectLocations from '@/strapi/get-all-project-locations';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Projects({
  searchParams,
}: {
  searchParams: {
    location?: string;
  };
}) {
  const locale = getCurrentLocale();
  const {
    data,
  }: {
    data: {
      data: IProject[];
      meta: { total: number };
    };
  } = await axios.get(
    `http://localhost:3000/api/projects?locale${locale}${
      searchParams.location ? `&location=${searchParams.location}` : ''
    }`,
  );
  const locations = await getAllProjectLocations(locale);

  const t = await getI18n();
  return (
    <PageTransitionWrapper>
      {(!data || !locations) && <ErrorLoaded />}
      {data && locations && (
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-5 text-center">{t('projects.title')}</h1>
          <I18nProvider locale={getCurrentLocale()}>
            <ProjectsClient
              data={data.data}
              projectsCount={data.meta.total}
              locations={locations}
            />
          </I18nProvider>
        </div>
      )}
    </PageTransitionWrapper>
  );
}
