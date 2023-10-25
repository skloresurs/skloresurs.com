import type { Metadata } from 'next';
import React from 'react';

import Certificates from '@/components/home/Certificates';
import ContactUs from '@/components/home/ContactUs';
import Hero from '@/components/home/Hero';
import News from '@/components/home/News';
import PartnersServer from '@/components/home/PartnersServer';
import ProductionServer from '@/components/home/ProductionServer';
import Projects from '@/components/home/Projects';
import Target from '@/components/home/Target';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { getI18n } from '@/utils/i18nServer';

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
    <PageTransitionWrapper>
      <Hero />
      <Target />
      <Certificates />
      <ProductionServer />
      <News />
      <Projects />
      <PartnersServer />
      <ContactUs />
    </PageTransitionWrapper>
  );
}
