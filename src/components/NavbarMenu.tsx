'use client';

import Link from 'next/link';
import React from 'react';

import { useChangeLocale, useCurrentLocale, useI18n } from '@/utils/i18nClient';
import { cn } from '@/utils/shadcnUtils';

import CircleFlagsUa from './icons/CircleFlagsUa';
import CircleFlagsUk from './icons/CircleFlagsUk';
import MdiMenu from './icons/MdiMenu';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Separator } from './ui/separator';

type AllowID =
  | 'components'
  | 'delivery'
  | 'news'
  | 'projects'
  | 'reportings'
  | 'seminars'
  | 'vacancies'
  | 'production'
  | 'contact-us';

interface IMenuItem {
  id: AllowID;
  href: string;
}

const servicesMenu: IMenuItem[] = [
  {
    id: 'components',
    href: '/components',
  },
  {
    id: 'delivery',
    href: '/delivery',
  },
  {
    id: 'vacancies',
    href: '/vacancies',
  },
  {
    id: 'contact-us',
    href: '/#contact-us',
  },
  {
    id: 'production',
    href: '/#production',
  },
];

const postsMenu: IMenuItem[] = [
  {
    id: 'news',
    href: '/news',
  },
  {
    id: 'projects',
    href: '/projects',
  },
  {
    id: 'reportings',
    href: '/reportings',
  },
  {
    id: 'seminars',
    href: '/seminars',
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function NavBarMenu() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const t = useI18n();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            {t('navbar.menu.home')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>
            {t('navbar.menu.services')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {servicesMenu.map((e) => (
                <ListItem
                  key={e.id}
                  href={e.href}
                  title={t(`navbar.menu.${e.id}.title`)}
                >
                  {t(`navbar.menu.${e.id}.description`)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>
            {t('navbar.menu.posts')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {postsMenu.map((e) => (
                <ListItem
                  key={e.id}
                  href={e.href}
                  title={t(`navbar.menu.${e.id}.title`)}
                >
                  {t(`navbar.menu.${e.id}.description`)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {locale === 'uk' ? (
              <CircleFlagsUa width={24} height={24} />
            ) : (
              <CircleFlagsUk width={24} height={24} />
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-row items-center gap-3 p-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-2"
              onClick={() => changeLocale('uk')}
            >
              <CircleFlagsUa width={36} height={36} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-2"
              onClick={() => changeLocale('en')}
            >
              <CircleFlagsUk width={36} height={36} />
            </Button>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="md:hidden">
          <NavigationMenuTrigger>
            <MdiMenu width={24} height={24} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex w-max flex-col gap-3 p-2">
            <Link
              href="/"
              className="flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted"
            >
              {t(`navbar.menu.home`)}
            </Link>
            <Separator />
            {servicesMenu.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted"
              >
                {t(`navbar.menu.${item.id as AllowID}.title`)}
              </Link>
            ))}
            <Separator />
            {postsMenu.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted"
              >
                {t(`navbar.menu.${item.id as AllowID}.title`)}
              </Link>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
