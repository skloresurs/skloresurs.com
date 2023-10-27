'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import type { IGlassCategory, ILocation } from '@/interfaces/Projects';
import { useI18n } from '@/utils/i18nClient';

import { Button } from '../ui/button';
import ProjectFilterGlass from './ProjectFilterGlass';
import ProjectFilterLocation from './ProjectFilterLocation';
import ProjectFilterYear from './ProjectFilterYear';
import ProjectSearch from './ProjectSearch';

interface IProps {
  locations: ILocation[];
  glassCategories: IGlassCategory[];
}

export default function ProjectFilter({ locations, glassCategories }: IProps) {
  const t = useI18n();
  const router = useRouter();
  return (
    <div className="w-full py-2 md:w-[250px]">
      <h2 className="mb-5 text-center">{t('projects.filters.title')}</h2>
      <div className="flex flex-col gap-3">
        <ProjectSearch />
        <ProjectFilterLocation locations={locations} />
        <ProjectFilterGlass glassCategories={glassCategories} />
        <ProjectFilterYear />
        <Button
          variant="destructive"
          className="mt-5"
          onClick={() => router.push('/projects')}
        >
          {t('projects.filters.reset')}
        </Button>
      </div>
    </div>
  );
}
