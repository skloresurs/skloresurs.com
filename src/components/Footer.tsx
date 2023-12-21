'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import LogosFacebook from '@/components/icons/LogosFacebook';
import SkillIconsInstagram from '@/components/icons/SkillIconsInstagram';
import { buttonVariants } from '@/components/ui/button';
import { useI18n } from '@/utils/i18n-client';

export default function Footer() {
  const pathname = usePathname();
  const t = useI18n();
  if (pathname.includes('/productions')) {
    return null;
  }

  return (
    <div id='footer' className='mx-auto mt-12 flex w-full max-w-6xl flex-col gap-2 px-6 text-muted-foreground'>
      <div className='flex flex-col items-center justify-between gap-2 md:flex-row'>
        <div className='flex flex-col items-center gap-4 md:flex-row'>
          <Image src='/logo.png' width={150} height={60} alt={t('meta.logo')} title={t('meta.logo')} loading='lazy' />
          <Image src='/gualos-logo.png' width={150} height={60} alt='Gualos' title='Gualos' loading='lazy' />
        </div>
        <div className='mt-6 flex flex-col items-start gap-2 md:mt-0 md:flex-row md:gap-20'>
          <div className='min-w-[100px]'>
            <h2 className='mb-2 text-base font-semibold uppercase'>{t('footer.contact.title')}</h2>
            <p>
              E-mail:
              <Link
                title='office@skloresurs.com'
                className={twMerge(buttonVariants({ variant: 'link' }), 'p-0 m-0 h-min ml-1')}
                href='mailto:office@skloresurs.com'
              >
                office@skloresurs.com
              </Link>
            </p>
            <p>
              {t('footer.contact.telephone')}:
              <Link
                title='+38 (044) 355-05-99'
                className={twMerge(buttonVariants({ variant: 'link' }), 'p-0 m-0 h-min ml-1')}
                href='tel:+38 (044) 355-05-99'
              >
                +38 (044) 355-05-99
              </Link>
            </p>
          </div>
          <div className='min-w-[100px]'>
            <h2 className='mb-2 text-base font-semibold uppercase'>{t('footer.address.title')}</h2>
            <p className='inline'>
              {t('footer.address.p1')}, {t('footer.address.p2')}
            </p>
            <p>{t('footer.address.p3')}</p>
          </div>
        </div>
      </div>
      <div className='my-2 h-0.5 w-full rounded-lg border-[1px] border-border' />
      <div className='flex flex-row items-center justify-between gap-2'>
        <p className='text-xs text-muted-foreground'>Skloresurs | Gualos</p>
        <div className='flex flex-row items-center gap-4'>
          <Link href='https://www.facebook.com/skloresurs' title='Facebook' target='_blank'>
            <LogosFacebook width={28} height={28} />
          </Link>
          <Link href='https://www.instagram.com/skloresurs' title='Instagram' target='_blank'>
            <SkillIconsInstagram width={28} height={28} />
          </Link>
        </div>
      </div>
    </div>
  );
}
