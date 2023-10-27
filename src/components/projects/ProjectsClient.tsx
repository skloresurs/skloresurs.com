'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import type IProject from '@/interfaces/Projects';
import type { ILocation } from '@/interfaces/Projects';
import axios from '@/utils/axios-cache';
import { GenerateProjectLink } from '@/utils/generate-links';
import { useCurrentLocale, useI18n } from '@/utils/i18nClient';

import { MdiCalendar } from '../icons/MdiCalendar';
import { MdiEarth } from '../icons/MdiEarth';
import { MdiGlassdoor } from '../icons/MdiGlassdoor';

interface IProps {
  locations: ILocation[];
}

export default function ProjectsClient({ locations }: IProps) {
  const t = useI18n();
  const locale = useCurrentLocale();
  const query = useSearchParams();

  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = query.get('location');
  const glassCategory = query.get('glass');

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    const response = await axios
      .get(GenerateProjectLink(locale, location, glassCategory))
      .catch((_) => null);
    if (response?.data) {
      setProjects(response.data.data);
      setProjectsCount(response.data.meta.total);
    }
    setIsLoading(false);
  }, [locale, location, glassCategory]);

  useEffect(() => {
    setProjects([]);
    getProjects();
  }, [query, locations, getProjects]);

  return (
    <div className="flex-1 py-2">
      {isLoading && (
        <div className="w-full">
          <div className="relative mx-auto aspect-square w-[400px]">
            <Image
              src="/loading.svg"
              alt="loading"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {!isLoading && projectsCount === 0 && (
        <div className="w-full">
          <div className="relative mx-auto aspect-square w-[400px]">
            <Image
              src="/neutral-face.svg"
              alt="missing"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-center">{t('projects.none')}</h2>
        </div>
      )}
      {!isLoading && projectsCount > 0 && (
        <>
          <p className="mb-2 text-right text-sm text-muted-foreground">
            {t('projects.show')}
            {projects.length}/{projectsCount}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </>
      )}
    </div>
  );
}
