'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { MdiMagnify } from '@/components/icons/mdi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/utils/i18n-client';

export default function SearchFilter({ path }: Readonly<{ path: string }>) {
  const [value, setValue] = useState<string>('');
  const query = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  useEffect(() => {
    setValue(query.get('search') ?? '');
  }, [query]);

  const search = () => {
    const current = new URLSearchParams([...query.entries()]);
    current.delete('page');

    if (!value || value === '') {
      current.delete('search');
    } else {
      current.set('search', value);
    }

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.replace(`${path}${newQuery}`);
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder={t('meta.filters.search')}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button size="icon" className="aspect-square" onClick={search}>
        <MdiMagnify className="h-5 w-5" />
      </Button>
    </div>
  );
}
