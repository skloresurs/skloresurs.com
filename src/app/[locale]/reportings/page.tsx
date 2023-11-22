import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import MdiEye from '@/components/icons/mdi/MdiEye';
import MdiFilePdf from '@/components/icons/mdi/MdiFilePdf';
import getReportings from '@/strapi/full-collections/get-reportings';
import { getI18n } from '@/utils/i18n-server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();
  return {
    alternates: {
      canonical: '/reportings',
    },
    description: t('reportings.description'),
    openGraph: {
      description: t('reportings.description'),
      title: t('reportings.title'),
      url: 'https://skloresurs.com/reportings',
    },
    title: t('reportings.title'),
  };
}

export default async function Reportings() {
  const t = await getI18n();
  const reportings = await getReportings();

  return reportings ? (
    <div className="mx-auto max-w-6xl px-5">
      <h1 className="mb-5 text-center">{t('reportings.title')}</h1>
      <div className="flex flex-col gap-4">
        {reportings.map((e) => (
          <div key={e.year}>
            <h2 className="mb-3">
              {e.year} {t('reportings.year')}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Link
                target="_blank"
                title={t('reportings.auditory')}
                href={e.auditory}
                className="flex cursor-pointer flex-row items-center gap-2 rounded-md border-2 border-border px-3 py-2 duration-500 hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <MdiFilePdf className="h-8 w-8" />
                </div>
                <h3 className="flex-1  text-lg font-semibold">
                  {t('reportings.auditory')}
                </h3>
                <MdiEye className="h-6 w-6" />
              </Link>
              <Link
                target="_blank"
                title={t('reportings.finance')}
                href={e.finance}
                className="flex cursor-pointer flex-row items-center gap-2 rounded-md border-2 border-border px-3 py-2 duration-500 hover:bg-muted"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <MdiFilePdf className="h-8 w-8" />
                </div>
                <h3 className="flex-1 text-lg font-semibold">
                  {t('reportings.finance')}
                </h3>
                <MdiEye className="h-6 w-6" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <ErrorLoaded />
  );
}
