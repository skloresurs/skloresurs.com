'use client';

import Link from 'next/link';
import React from 'react';
import Typed from 'react-typed';
import { twMerge } from 'tailwind-merge';

import type IProduction from '@/types/Production';
import { useI18n } from '@/utils/i18n-client';

import { buttonVariants } from '../ui/button';

interface IProps {
  data: IProduction;
  alt?: boolean;
}

export default function ProductionsText({ data, alt }: Readonly<IProps>) {
  const t = useI18n();
  return (
    <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col gap-8 md:right-1/2 lg:right-2/3">
      <h1>
        <Typed
          cursorChar=""
          strings={[alt ? data.alt.title : data.title]}
          typeSpeed={40}
        />
      </h1>
      <p>
        <Typed
          cursorChar=""
          strings={[alt ? '' : data.description]}
          typeSpeed={5}
        />
      </p>
      {data.alt && !alt && (
        <Link
          href={`/productions/${data.order}/alt`}
          className={twMerge(buttonVariants({ variant: 'outline' }), 'w-min')}
        >
          {data.alt.title}
        </Link>
      )}
      {alt && (
        <Link
          href={`/productions/${data.order}`}
          className={twMerge(buttonVariants({ variant: 'outline' }), 'w-min')}
        >
          {t('production.return-from-alt')}
        </Link>
      )}
    </div>
  );
}
