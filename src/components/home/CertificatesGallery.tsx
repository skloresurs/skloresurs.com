'use client';

import Autoplay from 'embla-carousel-autoplay';
import { map } from 'lodash';
import Image from 'next/image';
import React from 'react';

import type ICertificate from '@/types/Certificate';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface IProps {
  images: ICertificate[];
}

export default function CertificatesGallery({ images }: Readonly<IProps>) {
  return (
    <div className='md:absolute md:-bottom-16 md:right-4'>
      <Carousel
        className='relative max-w-[300px] lg:max-w-[400px]'
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {map(images, (image) => (
            <CarouselItem key={image.original}>
              <Image
                src={image.original}
                alt='Certificate'
                title='Certificate'
                width='400'
                height='700'
                className='object-contain object-center'
                loading='eager'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4' />
        <CarouselNext className='right-4' />
      </Carousel>
    </div>
  );
}
