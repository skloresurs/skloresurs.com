import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { buttonVariants } from '@/components/ui/button';
import type IComponent from '@/types/Component';
import { useI18n } from '@/utils/i18nClient';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function ComponentCard({
  component,
}: {
  component: IComponent;
}) {
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
