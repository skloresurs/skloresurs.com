import React from 'react';

import { MdiChevronDown } from '../icons/mdi';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface IProps {
  item: {
    title: string;
    children: string[];
  };
  index: number;
}

export default async function CollapsibleItem({ item, index }: IProps) {
  return (
    <Collapsible key={item.title}>
      <CollapsibleTrigger className='flex w-full flex-row items-center justify-between gap-2 duration-300 hover:text-muted-foreground'>
        <h3 className='m-0 p-0 text-xl' data-aos='fade-left' data-aos-delay={50 + 50 * Math.ceil(index / 2)}>
          {item.title}
        </h3>
        <MdiChevronDown className='text-xl' />
      </CollapsibleTrigger>
      <CollapsibleContent className='CollapsibleContent'>
        <ul className='ml-3 flex list-disc flex-col gap-1 text-sm text-muted-foreground'>
          {item.children.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
