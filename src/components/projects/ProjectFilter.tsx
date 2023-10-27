'use client';

import React from 'react';

import type { IGlassCategory, ILocation } from '@/interfaces/Projects';
import { useI18n } from '@/utils/i18nClient';

import ProjectFilterGlass from './ProjectFilterGlass';
import ProjectFilterLocation from './ProjectFilterLocation';

interface IProps {
  locations: ILocation[];
  glassCategories: IGlassCategory[];
}

export default function ProjectFilter({ locations, glassCategories }: IProps) {
  const t = useI18n();
  return (
    <div className="w-[250px] py-2">
      <h2 className="mb-5 text-center">{t('projects.filters.title')}</h2>
      <div className="flex flex-row gap-3 md:flex-col">
        <ProjectFilterLocation locations={locations} />
        <ProjectFilterGlass glassCategories={glassCategories} />
      </div>
    </div>
  );
}
