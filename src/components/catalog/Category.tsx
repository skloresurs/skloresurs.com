import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ICategory } from '@/types/Catalog';

interface IProps {
  category: ICategory;
}

export default function Category({ category }: IProps) {
  return (
    <Link
      className='flex flex-col items-center justify-center gap-4 rounded-md bg-muted p-8 duration-300 hover:bg-muted/50'
      href={`/catalog/${category.slug}`}
    >
      <Image src={category.image} alt={category.title} width={250} height={250} />
      <h2>{category.title}</h2>
    </Link>
  );
}
