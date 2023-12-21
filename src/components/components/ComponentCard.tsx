import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type IComponent from '@/types/Component';
import { useI18n } from '@/utils/i18n-client';

export default function ComponentCard({
  component,
}: Readonly<{
  component: IComponent;
}>) {
  const t = useI18n();
  return (
    <Link
      className="group flex flex-col gap-1"
      title={t('components.go-to')}
      target="_blank"
      href={component.url}
    >
      <div className="rounded bg-muted p-2">
        <Image
          src={component.image}
          alt={component.title}
          title={component.title}
          width={250}
          height={250}
          className="aspect-square w-full rounded-sm object-cover duration-300 group-hover:scale-110"
        />
      </div>
      <h2 className="px-1 text-base font-normal">{component.title}</h2>
    </Link>
  );
  // return (
  //   <Card
  //     data-aos="fade-down"
  //     data-aos-anchor-placement="top-bottom"
  //     className="mb-4 h-min break-inside-avoid-column"
  //   >
  //     <CardHeader>
  //       <div className="relative mb-1 aspect-square max-w-[150px]">
  //         <Image
  //           src={component.image}
  //           alt={component.title}
  //           title={component.title}
  //           fill
  //           className="object-cover"
  //         />
  //       </div>
  //       <CardTitle className="text-lg leading-5">{component.title}</CardTitle>
  //       <CardDescription className="flex flex-col gap-1">
  //         <p>{component.category?.title ?? '-'}</p>
  //         {component.manufacturer ? (
  //           <Link target="_blank" href={component.manufacturer.url ?? '#'}>
  //             {component.manufacturer.title}
  //           </Link>
  //         ) : (
  //           <p>-</p>
  //         )}
  //       </CardDescription>
  //     </CardHeader>
  //     <CardFooter>
  //       <Link
  //         title={t('components.go-to')}
  //         className={twMerge(buttonVariants({ variant: 'outline' }), 'ml-auto')}
  //         target="_blank"
  //         href={component.url}
  //       >
  //         {t('components.go-to')}
  //       </Link>
  //     </CardFooter>
  //   </Card>
  // );
}
