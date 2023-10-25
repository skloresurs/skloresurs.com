'use client';

import { useState } from 'react';
import InfiniteScroller from 'react-infinite-scroll-component';
import Gallery from 'react-photo-gallery';

import type IProject from '@/interfaces/Projects';
import axios from '@/utils/axios-cache';
import { useCurrentLocale, useI18n } from '@/utils/i18nClient';

import { MdiCalendar } from './icons/MdiCalendar';
import { MdiEarth } from './icons/MdiEarth';
import { MdiGlassdoor } from './icons/MdiGlassdoor';
import { Separator } from './ui/separator';

interface IProps {
  data: IProject[];
  projectsCount: number;
}

export default function ProjectsClient({ data, projectsCount }: IProps) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [projects, setProjects] = useState<IProject[]>(data);

  const getMorePosts = async () => {
    const response = await axios
      .get(
        `https://${window.location.hostname}/api/projects?page=${
          projects.length / 5 + 1
        }&locale=${locale}`,
      )
      .catch((_) => null);
    if (response?.data) {
      setProjects([...projects, ...response.data]);
    }
  };
  return (
    <InfiniteScroller
      dataLength={projects.length}
      loader={<h4>{t('projects.loading')}</h4>}
      next={getMorePosts}
      hasMore={projectsCount > projects.length}
    >
      {projects.map((e, i) => (
        <div key={e.id}>
          <div className="mb-5">
            <h2 className="mb-2">{e.title}</h2>
            <div className="flex flex-row items-center gap-1">
              <MdiEarth className="h-5 w-5" />
              {e.location}
            </div>
            <div className="flex flex-row items-center gap-1">
              <MdiGlassdoor className="h-5 w-5" /> {e.glass}
            </div>
            <div className="flex flex-row items-center gap-1">
              <MdiCalendar className="h-5 w-5" /> {e.year}
            </div>
            <Gallery
              photos={e.images.map((photo) => {
                return {
                  src: photo,
                  width: 1,
                  height: 1,
                  alt: e.title,
                };
              })}
            />
          </div>
          {i < projects.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
    </InfiniteScroller>
  );
}
