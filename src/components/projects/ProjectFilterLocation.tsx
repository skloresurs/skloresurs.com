'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import type { ILocation } from '@/interfaces/Projects';
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

export default function ProjectFilterLocation({
  locations,
}: {
  locations: ILocation[];
}) {
  const query = useSearchParams();
  const [value, setValue] = React.useState<string>(
    locations
      .find((e) => e.id.toString() === query.get('location'))
      ?.id.toString() ?? 'none',
  );
  const t = useI18n();

  function search(currentValue: string) {
    const current = new URLSearchParams(Array.from(query.entries()));
    if (currentValue === 'none') {
      current.delete('location');
    } else {
      current.set('location', currentValue);
    }
    setValue(currentValue);

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    window.location.replace(`/projects${newQuery}`);
  }

  return (
    <Select value={value} onValueChange={(e) => search(e)}>
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('projects.filters.location.title')}</SelectLabel>
          <ScrollArea className="h-[250px]">
            <SelectItem value="none">
              {t('projects.filters.location.all-locations')}
            </SelectItem>
            {locations.map((e) => (
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
