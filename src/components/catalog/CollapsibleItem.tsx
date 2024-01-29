import React from 'react';

import { MdiChevronDown } from '../icons/mdi';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface IProps {
  item: {
    title: string;
    children: string[];
  };
}

export default async function CollapsibleItem({ item }: IProps) {
  return (
    <Collapsible key={item.title}>
      <CollapsibleTrigger className='flex w-full flex-row items-center justify-center gap-2 duration-300 hover:text-muted-foreground'>
        <h3 className='m-0 p-0 text-xl' data-aos='fade-left'>
          {item.title}
        </h3>
        <MdiChevronDown className='text-xl' />
      </CollapsibleTrigger>
      <CollapsibleContent className='CollapsibleContent'>
        <ul className='ml-3 flex flex-col gap-1 text-sm text-muted-foreground'>
          {item.children.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
