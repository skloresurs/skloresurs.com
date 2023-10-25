'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import type ReactImageGallery from 'react-image-gallery';
import ImageGallery from 'react-image-gallery';
import Typed from 'react-typed';

import type IProduction from '@/interfaces/Production';
import { useI18n } from '@/utils/i18nClient';

interface IProps {
  productions: IProduction[];
}

export default function Production({ productions }: IProps) {
  const t = useI18n();
  const gallery = useRef<any>(null);
  const h3 = useRef<any>(null);
  const p = useRef<any>(null);
  const [data, setData] = React.useState<IProduction | undefined>(
    productions[0],
  );
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
          className="h-full overflow-hidden rounded-md md:w-1/3"
          data-aos="fade-left"
          data-aos-delay={300}
        >
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
            additionalClass="object-cover"
            onSlide={(i) => {
              setData(productions[+i]);
              h3.current?.reset();
              p.current?.reset();
            }}
            renderItem={(original) => (
              <video autoPlay muted loop>
                <source src={original.original} type="video/mp4" />
              </video>
            )}
          />
        </div>
      </div>
    </div>
  );
}
