'use client';

import parse from 'html-react-parser';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import type IProduct from '@/types/Product';
import axios from '@/utils/axios-cache';
import { useCurrentLocale } from '@/utils/i18n-client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export default function CatalogClient() {
  const query = useSearchParams();
  const locale = useCurrentLocale();
  const category =
    query.get('category') === 'interior' ? 'interior' : 'exterior';
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const axiosQuery = new URLSearchParams();
    axiosQuery.set('locale', locale);
    axiosQuery.set('category', category);
    axios
      .get(`/api/catalog?${axiosQuery.toString()}`)
      .then((data) => setProducts(data.data ?? []))
      .catch(() => setProducts([]));
  }, [category, locale]);
  return (
    <Accordion type="single" collapsible>
      {products.map((e) => (
        <AccordionItem
          value={e.id.toString()}
          key={e.id}
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
        >
          <AccordionTrigger className="p-0 text-left">
            {e.title}
          </AccordionTrigger>
          <AccordionContent className="content pl-1 text-base">
            {parse(e.content ?? '')}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
