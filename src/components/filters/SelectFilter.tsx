'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IProps {
  data: { id: string; title: string }[];
  filterKey: string;
  path: string;
  title: string;
  allTitle: string;
}

export default function SelectFilter({
  data,
  filterKey,
  path,
  title,
  allTitle,
}: IProps) {
  const query = useSearchParams();
  const router = useRouter();
  const [value, setValue] = React.useState<string>(
    data.find((e) => e.id === query.get(filterKey) ?? 'none')?.id ?? 'none',
  );

  useEffect(() => {
    setValue(query.get(filterKey) ?? 'none');
  }, [query, filterKey]);

  const search = (currentValue: string) => {
    const current = new URLSearchParams(Array.from(query.entries()));
    if (currentValue === 'none') {
      current.delete(filterKey);
    } else {
      current.set(filterKey, currentValue);
    }
    setValue(currentValue);

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.replace(`${path}${newQuery}`);
  };

  return (
    <Select value={value} onValueChange={search}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          <ScrollArea className="h-[250px]">
            <SelectItem value="none">{allTitle}</SelectItem>
            {data.map((e) => (
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
