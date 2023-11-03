import Image from 'next/image';
import React from 'react';

import { getI18n } from '@/utils/i18n-server';

export default async function ErrorLoaded() {
  const t = await getI18n();
  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <Image
        src="/bug-fixing.svg"
        width={600}
        height={500}
        alt="Error loaded"
        title="Error loaded"
      />
      <h2 className="mt-4 text-center">{t('meta.error.data')}</h2>
    </div>
  );
}
