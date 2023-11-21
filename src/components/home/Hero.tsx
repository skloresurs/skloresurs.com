import Image from 'next/image';
import React from 'react';

import { getI18n } from '@/utils/i18n-server';

import CloudAnimation from './CloudAnimation';
import styles from './Hero.module.css';

export default async function Hero() {
  const t = await getI18n();
  return (
    <div
      id="hero"
      className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-2 px-6 duration-500 md:flex-row md:items-start md:gap-8"
    >
      <div
        className={styles.glassmain}
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="px-6 pt-10">
          <h1 className="text-4xl font-normal uppercase text-primary md:text-5xl xl:text-6xl">
            {t('home.hero.main.title')}
          </h1>
          <p className="mt-2 text-xl md:text-2xl">
            {t('home.hero.main.sub-title')}
          </p>
          <p className="mt-6">{t('home.hero.main.learn-more')}</p>
        </div>
        <div className="flex-1" />
        <p className="px-6 pb-10 text-3xl uppercase md:text-5xl">
          Glass Processing
        </p>
      </div>
      <div
        className="relative h-full w-full max-w-[500px] md:mt-8 md:aspect-[3/4]"
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
      >
        <Image
          src="/hero-2.png"
          alt="Hero image"
          title="Hero image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-x-0 -z-50"
        />
        <CloudAnimation
          src="/hero-cloud.png"
          alt="Hero cloud"
          width={660}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute -left-24 top-8 -z-40"
        />
        <div className="flex h-full flex-col p-6 md:py-20">
          <div className="flex-1" />
          <div className="mb-20 text-xl font-light uppercase md:text-2xl xl:text-3xl">
            {t('home.hero.slogan')
              .split(' ')
              .map((e) => (
                <p key={e}>{e}</p>
              ))}
          </div>
          <h2 className="text-4xl font-normal text-primary drop-shadow-lg">
            {t('home.hero.target.title')}
          </h2>
          <p>{t('home.hero.target.content')}</p>
        </div>
      </div>
    </div>
  );
}
