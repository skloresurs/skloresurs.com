'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { RangeSlider } from '@/components/ui/range-slider';
import { useI18n } from '@/utils/i18n-client';

export default function ProjectsFilterYear() {
  const [values, setValues] = useState<number[]>([
    2000,
    new Date().getFullYear(),
  ]);
  const query = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  useEffect(() => {
    setValues([
      +(query.get('year-from') ?? 2000),
      +(query.get('year-to') ?? new Date().getFullYear()),
    ]);
  }, [query]);

  const search = () => {
    const current = new URLSearchParams(Array.from(query.entries()));
    current.delete('page');

    if (!values[0] || values[0] === 2000) {
      current.delete('year-from');
    } else {
      current.set('year-from', values[0].toString());
    }

    if (!values[1] || values[1] === new Date().getFullYear()) {
      current.delete('year-to');
    } else {
      current.set('year-to', values[1].toString());
    }

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.replace(`/projects${newQuery}`);
  };

  return (
    <>
      <h3 className="text-center">{t('projects.filters.year.title')}</h3>
      <RangeSlider
        className="mb-0"
        defaultValue={[2000, new Date().getFullYear()]}
        value={values}
        onValueChange={setValues}
        onValueCommit={search}
        min={2000}
        max={new Date().getFullYear()}
        step={1}
      />
      <p className="text-center text-muted-foreground">
        {values[0] === values[1] ? values[0] : `${values[0]} - ${values[1]}`}
      </p>
    </>
  );
}
