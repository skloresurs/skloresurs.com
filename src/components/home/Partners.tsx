'use client';

import 'keen-slider/keen-slider.min.css';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import React from 'react';

import type IPartner from '@/types/Partner';

interface IProps {
  partners: IPartner[];
}

export default function Partners({ partners }: Readonly<IProps>) {
  const animation = {
    duration: partners.length * 500,
    easing: (t: number) => t,
  };
  const [sliderRef] = useKeenSlider({
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      '(min-width: 1024px)': {
        slides: {
          perView: 7,
          spacing: 10,
        },
      },
      '(min-width: 1280px)': {
        slides: {
          perView: 8,
          spacing: 10,
        },
      },
      '(min-width: 768px)': {
        slides: {
          perView: 5,
          spacing: 10,
        },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    drag: false,
    loop: true,
    renderMode: 'performance',
    slides: {
      perView: 3,
      spacing: 10,
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div ref={sliderRef} className='keen-slider'>
      {partners.map((e) => (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <div key={e.id} className='keen-slider__slide'>
          <Image
            src={e.url}
            alt={e.title}
            title={e.title}
            width={512}
            height={512}
            loading='lazy'
            className='select-none rounded-md object-contain'
          />
        </div>
      ))}
    </div>
  );
}
