'use client';

import parse from 'html-react-parser';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type IProduct from '@/types/Product';
import axios from '@/utils/axios-cache';
import { useCurrentLocale } from '@/utils/i18nClient';

export default function CatalogClient() {
  const query = useSearchParams();
  const locale = useCurrentLocale();
  const category =
    query.get('category') === 'interior' ? 'interior' : 'exterior';
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get(`/api/catalog?locale=${locale}&category=${category}`)
      .then((data) => setProducts(data.data ?? []))
      .catch((_) => setProducts([]));
  }, [category, locale]);
  return (
    <div className="flex flex-col gap-6">
      {products.map((e) => (
        <div
          key={e.id}
          className="rounded-sm border-l-2 border-border py-2 pl-4"
          data-aos="fade-right"
        >
          <h2 className="mb-1">{e.title}</h2>
          <div className="content">{parse(e.content ?? '')}</div>
        </div>
      ))}
    </div>
  );
}
