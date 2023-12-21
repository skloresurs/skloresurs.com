'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import SearchFilter from '@/components/filters/SearchFilter';
import SelectFilter from '@/components/filters/SelectFilter';
import { Button } from '@/components/ui/button';
import type { ICategory, IManufacturer } from '@/types/Component';
import { useI18n } from '@/utils/i18n-client';

interface IProps {
  categories: ICategory[];
  manufacturers: IManufacturer[];
}

export default function ComponentsFilter({ categories, manufacturers }: IProps) {
  const t = useI18n();
  const router = useRouter();
  return (
    <div className='w-full py-2 md:w-[250px]'>
      <h2 className='mb-5 text-center'>{t('meta.filters.title')}</h2>
      <div className='flex flex-col gap-3'>
        <SearchFilter path='/components' />
        <SelectFilter
          data={categories.map((e) => ({
            id: e.id.toString(),
            title: e.title,
          }))}
          filterKey='category'
          path='/components'
          title={t('components.categories.title')}
          allTitle={t('components.categories.all')}
        />
        <SelectFilter
          data={manufacturers.map((e) => ({
            id: e.id.toString(),
            title: e.title,
          }))}
          filterKey='manufacturer'
          path='/components'
          title={t('components.manufacturer.title')}
          allTitle={t('components.manufacturer.all')}
        />
        <Button variant='destructive' className='mt-5' onClick={() => router.push('/components')}>
          {t('meta.filters.reset')}
        </Button>
      </div>
    </div>
  );
}
