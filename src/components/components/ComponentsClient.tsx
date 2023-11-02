'use client';

import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import type IComponent from '@/types/Component';
import { GenerateComponentLink } from '@/utils/generate-links';
import { useCurrentLocale, useI18n } from '@/utils/i18n-client';

import ComponentCard from './ComponentCard';

export default function ComponentsClient() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const query = useSearchParams();

  const [components, setComponents] = useState<IComponent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const category = query.get('category');
  const search = query.get('search');

  const getComponents = useCallback(async () => {
    setIsLoading(true);
    await axios
      .get(GenerateComponentLink(locale, category, search))
      .then((response) => {
        setComponents(response.data.components ?? []);
      })
      .catch((_) => null)
      .finally(() => setIsLoading(false));
  }, [locale, category, search]);

  useEffect(() => {
    setComponents([]);
    getComponents();
  }, [getComponents]);

  return (
    <div className="flex-1 py-2">
      {isLoading && (
        <div className="w-full">
          <div className="relative mx-auto aspect-square w-[400px] max-w-[100%]">
            <Image
              src="/loading.svg"
              alt="loading"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {!isLoading && components.length === 0 && (
        <div className="w-full">
          <div className="relative mx-auto aspect-square w-[400px] max-w-[100%]">
            <Image
              src="/neutral-face.svg"
              alt="missing"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-center">{t('components.none')}</h2>
        </div>
      )}
      {!isLoading && components.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {components.map((e) => (
            <ComponentCard key={e.id} component={e} />
          ))}
        </div>
      )}
    </div>
  );
}
