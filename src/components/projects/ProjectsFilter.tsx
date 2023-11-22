'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import SearchFilter from '@/components/filters/SearchFilter';
import SelectFilter from '@/components/filters/SelectFilter';
import { Button } from '@/components/ui/button';
import type { IGlassCategory, ILocation } from '@/types/Projects';
import { useI18n } from '@/utils/i18n-client';

import ProjectsFilterYear from './ProjectsFilterYear';

interface IProps {
  locations: ILocation[];
  glassCategories: IGlassCategory[];
}

export default function ProjectsFilter({
  locations,
  glassCategories,
}: Readonly<IProps>) {
  const t = useI18n();
  const router = useRouter();
  return (
    <div className="w-full py-2 md:w-[250px]">
      <h2 className="mb-5 text-center">{t('meta.filters.title')}</h2>
      <div className="flex flex-col gap-3">
        <SearchFilter path="/projects" />
        <SelectFilter
          data={locations.map((e) => ({ id: e.id.toString(), title: e.title }))}
          filterKey="location"
          path="/projects"
          title={t('projects.filters.location.title')}
          allTitle={t('projects.filters.location.all')}
        />
        <SelectFilter
          data={glassCategories.map((e) => ({
            id: e.id.toString(),
            title: e.title,
          }))}
          filterKey="glass"
          path="/projects"
          title={t('projects.filters.glass.title')}
          allTitle={t('projects.filters.glass.all')}
        />
        <ProjectsFilterYear />
        <Button
          variant="destructive"
          className="mt-5"
          onClick={() => router.push('/projects')}
        >
          {t('meta.filters.reset')}
        </Button>
      </div>
    </div>
  );
}
