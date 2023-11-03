'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { ICategory } from '@/types/Product';
import { Category } from '@/types/Product';
import { useI18n } from '@/utils/i18n-client';

import icons from './icons/catalogCategories';

export default function CatalogCategorySwitcher() {
  const router = useRouter();
  const query = useSearchParams();
  const t = useI18n();
  const category =
    query.get('category') === 'interior' ? 'interior' : 'exterior';

  const switchCategory = async (newCategory: ICategory) => {
    const current = new URLSearchParams(Array.from(query.entries()));

    if (newCategory === 'interior') {
      current.set('category', 'interior');
    } else {
      current.delete('category');
    }

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.replace(`/catalog${newQuery}`);
  };
  return (
    <div className="mb-5 flex flex-row gap-4 overflow-x-scroll scrollbar-none">
      {Category.map((e) => (
        <button
          type="button"
          onClick={() => switchCategory(e)}
          className={twMerge(
            'border-2 border-border hover:bg-muted/50 duration-300 rounded-md flex flex-row gap-2 items-center p-3',
            category === e
              ? 'bg-muted'
              : 'text-muted-foreground fill-muted-foreground',
          )}
          key={e}
        >
          {icons[e as 'interior' | 'exterior']}
          <p className="text-lg font-semibold">{t(`catalog.${e}`)}</p>
        </button>
      ))}
    </div>
  );
}
