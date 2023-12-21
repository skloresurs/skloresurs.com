import '../globals.css';

import type { Metadata, Viewport } from 'next';
import { Raleway } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { ReactNode } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import AOSInit from '@/components/Aos';
import Footer from '@/components/Footer';
import { GAnalytics } from '@/components/GAnalytics';
import I18nProvider from '@/components/I18nProvider';
import NavBar from '@/components/Navbar';
import { env } from '@/env.mjs';
import { getCurrentLocale, getI18n } from '@/utils/i18n-server';

const { NEXT_PUBLIC_BASE_URL } = env;

const raleway = Raleway({
  display: 'swap',
  subsets: ['cyrillic-ext', 'latin-ext'],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  const locale = getCurrentLocale();
  return {
    alternates: {
      canonical: 'https://skloresurs.com',
      languages: { en: '/en', uk: '/' },
    },
    applicationName: 'Skloresurs website',
    authors: [{ name: 'HighError', url: 'https://github.com/higherror' }],
    category: 'website',
    creator: 'HighError',
    generator: 'Next.js',
    metadataBase: new URL('https://skloresurs.com'),
    openGraph: {
      alternateLocale: ['uk', 'en'].filter((e) => e !== locale),
      images: [
        {
          height: 650,
          url: `${NEXT_PUBLIC_BASE_URL}/card.png`,
          width: 1200,
        },
      ],
      locale,
      siteName: t('meta.logo'),
      type: 'website',
    },
    other: {
      'geo.placename': 'вулиця Семидубська, 105, Дубно, Рівненська область, 35600',
      'geo.position': '50.393393898987426, 25.77552926677272',
      'geo.region': 'Рівненська область',
    },
    publisher: 'HighError',
    robots: 'index, follow',
    title: {
      default: t('meta.title'),
      template: `%s | ${t('meta.logo')}`,
    },
    twitter: {
      card: 'summary',
      creator: '@higherrorua',
      creatorId: '1045759364584353792',
      images: `${NEXT_PUBLIC_BASE_URL}/card.png`,
    },
  };
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  initialScale: 1,
  width: 'device-width',
};

interface IProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({ params, children }: IProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    alternateName: 'Skloresurs',
    logo: `${NEXT_PUBLIC_BASE_URL}/logo.png`,
    name: 'Склоресурс',
    sameAs: ['https://www.facebook.com/skloresurs', 'https://www.instagram.com/skloresurs/'],
    url: 'https://skloresurs.com/',
  };

  return (
    <html lang={params.locale}>
      <head>
        <script
          key='structured-data'
          type='application/ld+json'
          // eslint-disable-next-line react/no-danger, xss/no-mixed-html
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <meta name='og:image' content={`${NEXT_PUBLIC_BASE_URL}/card.png`} />
      </head>
      <AOSInit />
      <body
        className={twMerge(
          'mx-auto flex min-h-[100dvh] flex-col pb-6 duration-500 scrollbar-thin scrollbar-thumb-primary',
          raleway.className
        )}
      >
        <NextTopLoader showSpinner crawl color='#9ddbe2' />
        <GAnalytics />
        <NavBar />
        <div className='flex-1'>{children}</div>
        <I18nProvider>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
