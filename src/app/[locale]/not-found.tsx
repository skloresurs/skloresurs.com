import Image from 'next/image';
import React from 'react';

import { getI18n } from '@/utils/i18n-server';

export default async function NotFound() {
  const t = await getI18n();
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6">
      <Image src="/404.svg" width="400" height="500" alt="404" />
      <h1>{t('meta.error.404')}</h1>
    </div>
  );
}
