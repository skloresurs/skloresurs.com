import '../globals.css';

import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import type { ReactNode } from 'react';
import React from 'react';

import AOSInit from '@/components/AOS';
import Footer from '@/components/Footer';
import { GAnalytics } from '@/components/GAnalytics';
import NavBar from '@/components/Navbar';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

const raleway = Raleway({
  subsets: ['cyrillic-ext', 'latin-ext'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const locale = getCurrentLocale();
  return {
    generator: 'Next.js',
    applicationName: 'Skloresurs website',
    authors: [{ name: 'HighError', url: 'https://github.com/higherror' }],
    creator: 'HighError',
    publisher: 'HighError',
    title: {
      template: `%s | ${t('meta.logo')}`,
      default: t('meta.title'),
    },
    metadataBase: new URL('https://skloresurs.com'),
    alternates: {
      canonical: 'https://skloresurs.com',
      languages: { uk: '/', en: '/en' },
    },
    openGraph: {
      images: '/logo.png',
      locale,
      type: 'website',
      siteName: t('meta.logo'),
    },
    twitter: {
      card: 'summary',
      creator: '@higherrorua',
      creatorId: '1045759364584353792',
    },
    robots: 'index, follow',
    category: 'website',
    other: {
      'geo.placename':
        'вулиця Семидубська, 105, Дубно, Рівненська область, 35600',
      'geo.position': '50.393393898987426, 25.77552926677272',
      'geo.region': 'Рівненська область',
    },
  };
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: 'Склоресурс',
    alternateName: 'Skloresurs',
    url: 'https://skloresurs.com/',
    logo: '',
    sameAs: [
      'https://www.facebook.com/skloresurs',
      'https://www.instagram.com/skloresurs/',
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          key="structured-data"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <AOSInit />
      <body
        className={`mx-auto flex min-h-[100dvh] flex-col pb-6 duration-500 scrollbar-thin scrollbar-thumb-primary ${raleway.className}`}
      >
        <GAnalytics />
        <NavBar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
