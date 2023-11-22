'use client';

import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type IProduction from '@/types/Production';

interface IProps {
  productions: IProduction[];
  slide: number;
}

export default function ProductionsPlaylist({
  productions,
  slide,
}: Readonly<IProps>) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-row overflow-x-auto bg-black">
      {productions.map((e) => (
        <Link
          href={`/productions/${e.order}`}
          title={e.title}
          className={twMerge(
            'w-max cursor-pointer whitespace-nowrap bg-black px-5 py-4 duration-300 hover:bg-muted',
            slide === e.order ? 'bg-muted' : ''
          )}
          key={e.order}
        >
          {e.title}
        </Link>
      ))}
    </div>
  );
}
