'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import type ReactImageGallery from 'react-image-gallery';
import ImageGallery from 'react-image-gallery';
import ReactPlayer from 'react-player/lazy';
import Typed from 'react-typed';

import type IProduction from '@/types/Production';
import { useI18n } from '@/utils/i18n-client';

interface IProps {
  productions: IProduction[];
}

export default function Production({ productions }: IProps) {
  const t = useI18n();
  const [hasWindow, setHasWindow] = useState(false);
  const gallery = useRef<any>(null);
  const h3 = useRef<any>(null);
  const p = useRef<any>(null);
  const [data, setData] = useState<IProduction | undefined>(productions[0]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);
  return (
    <div
      id="production"
      className="relative mt-24 gap-6 bg-background-alternative py-6"
    >
      <Image
        className="absolute left-1/2 top-0 -z-50 -translate-x-1/2 -translate-y-full"
        src="/build.png"
        width={650}
        height={430}
        alt=""
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-2/3">
          <h2 className="text-primary" data-aos="fade-right">
            {t('home.productions.title')}
          </h2>
          <h3 data-aos="fade-right" data-aos-delay={100}>
            <Typed
              typedRef={(el: Typed) => {
                h3.current = el;
              }}
              cursorChar=""
              strings={['', data?.title ?? '']}
              typeSpeed={40}
            />
          </h3>
          <p data-aos="fade-right" data-aos-delay={200}>
            <Typed
              typedRef={(el: Typed) => {
                p.current = el;
              }}
              cursorChar=""
              strings={['', data?.description ?? '']}
              typeSpeed={5}
            />
          </p>
        </div>
        <div
          className="aspect-video w-full overflow-hidden rounded-md"
          data-aos="fade-left"
          data-aos-delay={300}
        >
          {hasWindow && (
            <ImageGallery
              ref={(el: ReactImageGallery) => {
                gallery.current = el;
              }}
              items={productions}
              lazyLoad
              showIndex
              showThumbnails={false}
              showPlayButton={false}
              showFullscreenButton={false}
              additionalClass="object-contain"
              onSlide={(i) => {
                setData(productions[+i]);
                h3.current?.reset();
                p.current?.reset();
              }}
              renderItem={(original) => (
                <ReactPlayer
                  url={original.original}
                  loop
                  muted
                  playing
                  controls={false}
                  width="100%"
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
