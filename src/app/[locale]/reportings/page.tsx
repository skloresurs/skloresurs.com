import Link from 'next/link';
import React from 'react';

import ErrorLoaded from '@/components/ErrorLoad';
import { MdiEye } from '@/components/icons/MdiEye';
import { MdiFilePdf } from '@/components/icons/MdiFilePdf';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import { getI18n } from '@/utils/i18nServer';
import getAllReportings from '@/strapi/get-all-reportings';

export default async function Reportings() {
  const t = await getI18n();
  const reportings = await getAllReportings();

  if (!reportings) {
    return <ErrorLoaded />;
  }

  return (
    <PageTransitionWrapper>
      <div className="mx-auto max-w-6xl px-5">
        <h1 className="mb-5 text-center">{t('reportings.title')}</h1>
        <div className="flex flex-col gap-4">
          {reportings &&
            reportings.map((e) => (
              <div key={e.year}>
                <h2 className="mb-3">
                  {e.year} {t('reportings.year')}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Link
                    target="_blank"
                    href={e.auditory}
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-md border-2 border-border px-3 py-2 duration-500 hover:bg-muted"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <MdiFilePdf className="h-8 w-8" />
                    </div>
                    <h5 className="flex-1">{t('reportings.auditory')}</h5>
                    <MdiEye className="h-6 w-6" />
                  </Link>
                  <Link
                    target="_blank"
                    href={e.finance}
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-md border-2 border-border px-3 py-2 duration-500 hover:bg-muted"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <MdiFilePdf className="h-8 w-8" />
                    </div>
                    <h5 className="flex-1">{t('reportings.finance')}</h5>
                    <MdiEye className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </PageTransitionWrapper>
  );
}
