'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { useI18n } from '@/utils/i18nClient';

import { MdiMagnify } from '../icons/MdiMagnify';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ProjectSearch() {
  const [value, setValue] = useState<string>('');
  const query = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  useEffect(() => {
    setValue(query.get('search') ?? '');
  }, [query]);

  const search = () => {
    const current = new URLSearchParams(Array.from(query.entries()));

    if (!value || value === '') {
      current.delete('search');
    } else {
      current.set('search', value);
    }

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.replace(`/projects${newQuery}`);
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder={t('projects.filters.search.placeholder')}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button size="icon" className="aspect-square" onClick={search}>
        <MdiMagnify className="h-5 w-5" />
      </Button>
    </div>
  );
}
