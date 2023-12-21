import Link from 'next/link';
import React from 'react';

import { cn } from '@/utils/shadcn-utils';

import { NavigationMenuLink } from './ui/navigation-menu';

interface IProps {
  className?: string;
  title: string;
  children: string;
  href: string;
}

export default function NavBarMenuItem({ className, title, children, href }: IProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href ?? '#'}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
