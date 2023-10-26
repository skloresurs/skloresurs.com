'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import InfiniteScroller from 'react-infinite-scroll-component';

import type IProject from '@/interfaces/Projects';
import type { ILocation } from '@/interfaces/Projects';
import axios from '@/utils/axios-cache';
import { useCurrentLocale } from '@/utils/i18nClient';

import { MdiCalendar } from '../icons/MdiCalendar';
import { MdiEarth } from '../icons/MdiEarth';
import { MdiGlassdoor } from '../icons/MdiGlassdoor';
import { Skeleton } from '../ui/skeleton';
import ProjectFilterLocation from './ProjectFilterLocation';

interface IProps {
  data: IProject[];
  projectsCount: number;
  locations: ILocation[];
}

export default function ProjectsClient({
  data,
  projectsCount,
  locations,
}: IProps) {
  const locale = useCurrentLocale();
  const [projects, setProjects] = useState<IProject[]>(data);

  const location = useSearchParams().get('location');

  const getMorePosts = async () => {
    const response = await axios
      .get(
        `/api/projects?page=${projects.length / 8 + 1}&locale=${locale}${
          location ? `&location=${location}` : ''
        }`,
      )
      .catch((_) => null);
    if (response?.data) {
      setProjects([...projects, ...response.data.data]);
    }
  };
  return (
    <>
      <div className="mb-3 flex flex-row gap-2">
        <ProjectFilterLocation locations={locations} />
      </div>
      <InfiniteScroller
        dataLength={projects.length}
        loader={
          <div className="flex break-inside-avoid-column flex-col gap-2">
            <Skeleton className="relative aspect-square w-full overflow-hidden rounded-lg" />
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-6 w-3/4" />
          </div>
        }
        next={getMorePosts}
        hasMore={projectsCount > projects.length}
        className="grid grid-cols-1 gap-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((e) => (
          <div
            className="flex break-inside-avoid-column flex-col gap-2"
            key={e.id}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <ImageGallery
                additionalClass="absolute object-cover"
                items={e.images.map((image) => {
                  return { original: image };
                })}
                lazyLoad
                showBullets
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={false}
                slideInterval={5000}
              />
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex flex-row items-center gap-1">
                <MdiEarth className="h-4 w-4 min-w-[16px]" />
                {e.location.title}
              </div>
              <div className="flex flex-row items-center gap-1">
                <MdiGlassdoor className="h-4 w-4 min-w-[16px]" /> {e.glass}
              </div>
              <div className="flex flex-row items-center gap-1">
                <MdiCalendar className="h-4 w-4 min-w-[16px]" /> {e.year}
              </div>
            </div>
            <h2 className="mb-2 text-base lg:text-lg ">{e.title}</h2>
          </div>
        ))}
      </InfiniteScroller>
    </>
  );
}
