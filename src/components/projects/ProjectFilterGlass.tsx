'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';

import type { IGlassCategory } from '@/interfaces/Projects';
import { useI18n } from '@/utils/i18nClient';

import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function ProjectFilterGlass({
  glassCategories,
}: {
  glassCategories: IGlassCategory[];
}) {
  const query = useSearchParams();
  const router = useRouter();
  const [value, setValue] = React.useState<string>(
    glassCategories
      .find((e) => e.id.toString() === query.get('glass'))
      ?.id.toString() ?? 'none',
  );
  const t = useI18n();

  useEffect(() => {
    setValue(query.get('glass') ?? 'none');
  }, [query]);

  function search(currentValue: string) {
    const current = new URLSearchParams(Array.from(query.entries()));
    if (currentValue === 'none') {
      current.delete('glass');
    } else {
      current.set('glass', currentValue);
    }
    setValue(currentValue);

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.replace(`/projects${newQuery}`);
  }

  return (
    <Select value={value} onValueChange={(e) => search(e)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t('projects.filters.glass.title')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('projects.filters.glass.title')}</SelectLabel>
          <ScrollArea className="h-[250px]">
            <SelectItem value="none">
              {t('projects.filters.glass.all-types')}
            </SelectItem>
            {glassCategories.map((e) => (
              <SelectItem value={e.id.toString()} key={e.id}>
                {e.title}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
