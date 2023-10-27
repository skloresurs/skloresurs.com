'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

import { useI18n } from '@/utils/i18nClient';

import { RangeSlider } from '../ui/range-slider';

export default function ProjectFilterYear() {
  const [values, setValues] = useState<number[]>([
    2000,
    new Date().getFullYear(),
  ]);
  const query = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  const search = () => {
    const current = new URLSearchParams(Array.from(query.entries()));

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
      <h4 className="text-center">{t('projects.filters.year.title')}</h4>
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
