import Image from 'next/image';
import React from 'react';

import type { AllowIcons } from '@/icons/infos';
import InfoIconSet from '@/icons/infos';
import { getI18n } from '@/utils/i18nServer';

interface ITargetItem {
  id: AllowIcons;
  index: number;
  icon: any;
}
async function TargetItem({ icon, index, id }: ITargetItem) {
  const t = await getI18n();
  return (
    <div
      className="flex flex-col gap-4 px-6"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary p-1 text-black">
        <Image src={icon} alt={id} width={28} height={28} />
      </div>
      <p className="text-xl">{t(`home.target.${id}`)}</p>
    </div>
  );
}

export default function Target() {
  return (
    <div id="target" className="mt-6 w-full bg-background-alternative py-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {Object.keys(InfoIconSet).map((e, i) => (
          <TargetItem
            key={e}
            index={i}
            id={e as AllowIcons}
            icon={InfoIconSet[e as AllowIcons]}
          />
        ))}
      </div>
    </div>
  );
}
