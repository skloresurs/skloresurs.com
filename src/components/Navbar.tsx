import Image from 'next/image';
import React from 'react';

import I18nProvider from '@/components/I18nProvider';
import { getI18n } from '@/utils/i18nServer';

import NavBarMenu from './NavbarMenu';

export default async function NavBar() {
  const t = await getI18n();
  return (
    <div
      id="navbar"
      className="mx-auto my-8 flex w-full max-w-6xl flex-row items-center justify-between px-6"
    >
      <a href="/" title={t('meta.logo')}>
        <Image src="/logo.png" alt={t('meta.logo')} width={157} height={60} />
      </a>
      <I18nProvider>
        <NavBarMenu />
      </I18nProvider>
    </div>
  );
}
