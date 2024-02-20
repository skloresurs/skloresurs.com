import Link from 'next/link';
import React from 'react';

import { getI18n } from '@/utils/i18n-server';

import { MdiEye, MdiFilePdf } from './icons/mdi';

interface IProps {
  href: string;
  title: string;
}

export default async function Reporting({ href, title }: IProps) {
  const t = await getI18n();
  return (
    <Link
      target='_blank'
      title={t('reportings.auditory')}
      href={href}
      className='flex cursor-pointer flex-row items-center gap-2 rounded-md border-2 border-border px-3 py-2 duration-500 hover:bg-muted'
    >
      <div className='flex size-12 items-center justify-center rounded-full bg-muted'>
        <MdiFilePdf className='size-8' />
      </div>
      <h3 className='m-0 flex-1 text-lg font-semibold'>{title}</h3>
      <MdiEye className='size-6' />
    </Link>
  );
}
