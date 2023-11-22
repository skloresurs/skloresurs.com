import type { ReactNode } from 'react';
import React from 'react';

import type { InfoIconsType } from '@/components/icons/info';
import InfoIcons from '@/components/icons/info';
import { getI18n } from '@/utils/i18n-server';

interface ITargetItem {
  id: InfoIconsType;
  index: number;
  icon: ReactNode;
}
async function TargetItem({ icon, index, id }: Readonly<ITargetItem>) {
  const t = await getI18n();
  return (
    <div
      className="flex flex-col gap-4 px-6"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-delay={index * 50}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary p-1 text-black">
        {icon}
      </div>
      <p className="text-xl">{t(`home.target.${id}`)}</p>
    </div>
  );
}

export default function Target() {
  return (
    <div id="target" className="mt-6 w-full bg-background-alternative py-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {Object.keys(InfoIcons).map((e, i) => (
          <TargetItem
            key={e}
            index={i}
            id={e as InfoIconsType}
            icon={InfoIcons[e as InfoIconsType]}
          />
        ))}
      </div>
    </div>
  );
}
