'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import Icons from '@/components/icons/circleFlags';
import { MdiMenu } from '@/components/icons/mdi';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { useChangeLocale, useCurrentLocale, useI18n } from '@/utils/i18n-client';

import NavBarMenuItem from './NavBarMenuItem';

type AllowID =
  | 'components'
  | 'delivery'
  | 'news'
  | 'projects'
  | 'reportings'
  | 'seminars'
  | 'vacancies'
  | 'catalog'
  | 'production'
  | 'contact-us';

interface IMenuItem {
  id: AllowID;
  href: string;
}

const servicesMenu: IMenuItem[] = [
  {
    href: '/components',
    id: 'components',
  },
  {
    href: '/delivery',
    id: 'delivery',
  },
  {
    href: '/vacancies',
    id: 'vacancies',
  },
  {
    href: '/#contact-us',
    id: 'contact-us',
  },
];

const postsMenu: IMenuItem[] = [
  {
    href: '/news',
    id: 'news',
  },
  {
    href: '/projects',
    id: 'projects',
  },
  {
    href: '/reportings',
    id: 'reportings',
  },
  {
    href: '/seminars',
    id: 'seminars',
  },
];

export default function NavBarMenu() {
  const changeLocale = useChangeLocale();
  const pathname = usePathname();
  const locale = useCurrentLocale();
  const t = useI18n();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className='hidden md:block'>
          <NavigationMenuLink href='/' className={navigationMenuTriggerStyle()}>
            {t('navbar.menu.home')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className='hidden md:block'>
          <NavigationMenuLink href='/productions' className={navigationMenuTriggerStyle()}>
            {t('navbar.menu.production.title')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className='hidden md:block'>
          <NavigationMenuLink href='/catalog' className={navigationMenuTriggerStyle()}>
            {t('navbar.menu.catalog.title')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className='hidden md:block'>
          <NavigationMenuTrigger>{t('navbar.menu.services')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              {servicesMenu.map((e) => (
                <NavBarMenuItem key={e.id} href={e.href} title={t(`navbar.menu.${e.id}.title`)}>
                  {t(`navbar.menu.${e.id}.description`)}
                </NavBarMenuItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className='hidden md:block'>
          <NavigationMenuTrigger>{t('navbar.menu.posts')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              {postsMenu.map((e) => (
                <NavBarMenuItem key={e.id} href={e.href} title={t(`navbar.menu.${e.id}.title`)}>
                  {t(`navbar.menu.${e.id}.description`)}
                </NavBarMenuItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {!pathname.includes('/news/') && !pathname.includes('/vacancies/') && (
          <NavigationMenuItem>
            <NavigationMenuTrigger title='Language'>{Icons[locale as keyof typeof Icons].small}</NavigationMenuTrigger>
            <NavigationMenuContent className='flex flex-row items-center gap-3 p-2'>
              {['uk', 'en'].map((e) => (
                <Button
                  key={e}
                  variant='ghost'
                  size='icon'
                  className='p-2'
                  onClick={() => {
                    changeLocale(e as 'uk' | 'en');
                  }}
                >
                  {Icons[e as keyof typeof Icons].big}
                </Button>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem className='md:hidden'>
          <NavigationMenuTrigger title='Menu'>
            <MdiMenu width={24} height={24} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='flex w-max flex-col gap-3 p-2'>
            <NavigationMenuLink
              href='/'
              className='flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted'
            >
              {t(`navbar.menu.home`)}
            </NavigationMenuLink>
            <NavigationMenuLink
              href='/productions'
              className='flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted'
            >
              {t(`navbar.menu.production.title`)}
            </NavigationMenuLink>
            <NavigationMenuLink
              href='/catalog'
              className='flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted'
            >
              {t(`navbar.menu.catalog.title`)}
            </NavigationMenuLink>
            <Separator />
            {servicesMenu.map((item) => (
              <NavigationMenuLink
                key={item.id}
                href={item.href}
                className='flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted'
              >
                {t(`navbar.menu.${item.id as AllowID}.title`)}
              </NavigationMenuLink>
            ))}
            <Separator />
            {postsMenu.map((item) => (
              <NavigationMenuLink
                key={item.id}
                href={item.href}
                className='flex w-full min-w-max flex-row items-center gap-2 rounded-md px-3 py-2 duration-300 hover:bg-muted'
              >
                {t(`navbar.menu.${item.id as AllowID}.title`)}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
