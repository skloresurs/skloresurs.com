'use client';

import Link from 'next/link';
import React from 'react';

import type IProduction from '@/types/Production';
import { useI18n } from '@/utils/i18n-client';

import { MdiChevronLeft } from '../icons/mdi';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

interface IProps {
  productions: IProduction[];
  slide: number;
}

export default function ProductionsPlaylist({
  productions,
  slide,
}: Readonly<IProps>) {
  const t = useI18n();
  return (
    <Sheet>
      <SheetTrigger className="absolute right-4 top-1/2 -translate-y-1/2">
        <MdiChevronLeft fontSize={50} />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t('production.playlist.title')}</SheetTitle>
          {productions.map((e) => (
            <Link
              className={`select-none rounded-md border-2 border-border p-2 duration-300 hover:bg-muted ${
                slide === e.order ? 'bg-muted' : ''
              }`}
              key={e.order}
              href={`/productions/${e.order}`}
            >
              {`${e.order}. ${e.title}`}
            </Link>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
