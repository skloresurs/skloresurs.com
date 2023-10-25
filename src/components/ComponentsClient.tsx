'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import type { ICategory } from '@/interfaces/Component';
import type IComponent from '@/interfaces/Component';
import { useI18n } from '@/utils/i18nClient';

import { MdiFilterOffOutline } from './icons/MdiFilterOffOutline';
import { MdiSortAlphabeticalAscending } from './icons/MdiSortAlphabeticalAscending';
import { MdiSortAlphabeticalDescending } from './icons/MdiSortAlphabeticalDescending';
import { Button, buttonVariants } from './ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';

interface IProps {
  categories: ICategory[];
  components: IComponent[];
}

const sortings = {
  title: {
    desc: 'title-desc',
  },
};

function ComponentCard({ component }: { component: IComponent }) {
  const t = useI18n();
  return (
    <Card
      data-aos="fade-down"
      data-aos-anchor-placement="top-bottom"
      className="mb-4 h-min break-inside-avoid-column"
    >
      <CardHeader>
        <div className="relative mb-1 aspect-square max-w-[150px]">
          <Image
            src={component.image}
            alt={component.title}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle>{component.title}</CardTitle>
        <CardDescription>{component.category.title}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          className={twMerge(buttonVariants({ variant: 'outline' }), 'ml-auto')}
          target="_blank"
          href={component.href}
        >
          {t('components.go-to')}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ComponentsClient({ categories, components }: IProps) {
  const t = useI18n();
  const router = useRouter();
  const query = useSearchParams();
  const filteredComponents = useMemo(() => {
    let result = components;
    if (query.get('category')) {
      result = result.filter(
        (e) => e.category.id === Number(query.get('category')),
      );
    }
    if (query.get('search')) {
      result = result.filter((e) =>
        e.title.toLowerCase().includes(query.get('search')!.toLowerCase()),
      );
    }
    if (query.get('sort')) {
      if (query.get('sort') === sortings.title.desc) {
        result = result.sort((a, b) => b.title.localeCompare(a.title));
      }
    } else {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [components, query]);
  const formSchema = useMemo(
    () =>
      z.object({
        search: z.string(),
        category: z.enum(['none', ...categories.map((e) => e.id.toString())]),
      }),
    [categories],
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const current = new URLSearchParams(Array.from(query.entries()));

    if (!values.search) {
      current.delete('search');
    } else {
      current.set('search', values.search);
    }

    if (!values.category || values.category === 'none') {
      current.delete('category');
    } else {
      current.set('category', values.category);
    }

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.push(`/components${newQuery}`);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get('search') || '',
      category: query.get('category') || 'none',
    },
  });

  function changeSorting(sort: string | null) {
    const current = new URLSearchParams(Array.from(query.entries()));
    if (!sort) {
      current.delete('sort');
    } else {
      current.set('sort', sort);
    }

    const filter: string = current.toString();
    const newQuery = filter ? `?${filter}` : '';
    router.push(`/components${newQuery}`);
  }

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="flex w-full flex-col gap-4 py-2 md:w-auto md:min-w-[200px]">
        <h3 className="text-center">{t('components.sorting.title')}</h3>
        <div className="flex flex-row items-center gap-2">
          <p className="block flex-1">{t('components.sorting.by-title')}</p>
          <Button
            variant={!query.get('sort') ? 'default' : 'outline'}
            size="icon"
            className="p-1"
            onClick={() => changeSorting(null)}
          >
            <MdiSortAlphabeticalAscending className="h-5 w-5" />
          </Button>
          <Button
            variant={
              query.get('sort') === sortings.title.desc ? 'default' : 'outline'
            }
            size="icon"
            className="p-1"
            onClick={() => changeSorting(sortings.title.desc)}
          >
            <MdiSortAlphabeticalDescending className="h-5 w-5" />
          </Button>
        </div>
        <Separator className="my-1" />
        <h3 className="text-center">{t('components.filters')}</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-2 flex flex-row gap-2">
              <Button variant="outline" className="flex-1" type="submit">
                {t('components.apply-filters')}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="flex items-center justify-center p-1"
                onClick={() => {
                  window.location.replace('/components');
                }}
              >
                <MdiFilterOffOutline className="h-5 w-5" />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${t('components.search')}...`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="mb-3 w-full">
                  <h4 className="mb-1 text-center">
                    {t('components.categories.title')}
                  </h4>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel id="none" className="flex-1 cursor-pointer">
                        {t('components.categories.none')}
                      </FormLabel>
                    </FormItem>
                    {categories.map((e) => (
                      <FormItem
                        key={e.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={e.id.toString()} />
                        </FormControl>
                        <FormLabel
                          id={e.id.toString()}
                          className="flex-1 cursor-pointer"
                        >
                          {e.title}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <Separator
        orientation="vertical"
        className="hidden h-auto w-[1px] md:block"
      />
      <Separator className="md:hidden" />
      <div className="w-full columns-2 gap-4 py-2 md:flex-1 md:columns-3">
        {filteredComponents.map((e) => (
          <ComponentCard key={e.id} component={e} />
        ))}
      </div>
    </div>
  );
}
