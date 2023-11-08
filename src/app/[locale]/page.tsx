import type { Metadata } from 'next';
import React from 'react';

import Certificates from '@/components/home/Certificates';
import ContactUs from '@/components/home/ContactUs';
import Hero from '@/components/home/Hero';
import News from '@/components/home/News';
import PartnersServer from '@/components/home/PartnersServer';
import Projects from '@/components/home/Projects';
import QualityBook from '@/components/home/QualityBook';
import Target from '@/components/home/Target';
import { getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    description: t('home.meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('home.meta.description'),
      url: 'https://skloresurs.com',
    },
  };
}

export default async function Home() {
  return (
    <>
      <Hero />
      <Target />
      <Certificates />
      <QualityBook />
      <News />
      <Projects />
      <PartnersServer />
      <ContactUs />
    </>
  );
}
