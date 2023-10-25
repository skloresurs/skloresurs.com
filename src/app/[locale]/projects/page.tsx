import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import I18nProvider from '@/components/I18nProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import ProjectsClient from '@/components/ProjectsClient';
import getProjects from '@/strapi/get-projects';
import { getCurrentLocale, getI18n } from '@/utils/i18nServer';

export default async function Projects() {
  const data = await getProjects(getCurrentLocale(), 1);
  const t = await getI18n();
  return (
    <PageTransitionWrapper>
      {!data && <ErrorLoaded />}
      {data && (
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-5 text-center">{t('projects.title')}</h1>
          <I18nProvider locale={getCurrentLocale()}>
            <ProjectsClient data={data.projects} projectsCount={data.total} />
          </I18nProvider>
        </div>
      )}
    </PageTransitionWrapper>
  );
}
