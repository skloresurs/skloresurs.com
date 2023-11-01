'use client';

import React from 'react';
import ImageGallery from 'react-image-gallery';

import type ICertificate from '@/types/Certificate';

interface IProps {
  images: ICertificate[];
}

export default function CertificatesGallery({ images }: IProps) {
  return (
    <ImageGallery
      additionalClass="mx-auto object-cover md:absolute md:-bottom-16 md:right-4 max-w-[300px] lg:max-w-[400px]"
      items={images}
      lazyLoad
      autoPlay
      showIndex
      showBullets
      showThumbnails={false}
      slideInterval={5000}
    />
  );
}
