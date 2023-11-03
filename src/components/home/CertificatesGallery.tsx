'use client';

import Image from 'next/image';
import React from 'react';
import ImageGallery from 'react-image-gallery';

import type ICertificate from '@/types/Certificate';

interface IProps {
  images: ICertificate[];
}

export default function CertificatesGallery({ images }: IProps) {
  return (
    <ImageGallery
      additionalClass="mx-auto md:absolute md:-bottom-16 md:right-4 max-w-[300px] lg:max-w-[400px] relative"
      items={images}
      lazyLoad
      autoPlay
      showIndex
      showBullets
      showThumbnails={false}
      slideInterval={5000}
      renderItem={(item) => (
        <Image
          src={item.original}
          loading="lazy"
          alt="Certificate"
          title="Certificate"
          width="400"
          height="900"
          className="object-contain"
        />
      )}
    />
  );
}
