import Image from 'next/image';
import Link from 'next/link';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import React from 'react';

import I18nProvider from '@/components/I18nProvider';
import { env } from '@/env.mjs';

import ContactUsForm from './ContactUsForm';

export default async function ContactUs() {
  return (
    <div
      id='contact-us'
      className='mx-auto mt-6 flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row'
    >
      <I18nProvider>
        <ReCaptchaProvider>
          <ContactUsForm />
        </ReCaptchaProvider>
      </I18nProvider>
      <Link
        className='relative h-[500px] w-full md:pl-20'
        data-aos='fade-left'
        data-aos-anchor-placement='top-bottom'
        target='_blank'
        // eslint-disable-next-line no-secrets/no-secrets
        href='https://www.google.com/maps/place/%D0%A1%D0%9A%D0%9B%D0%9E%D0%A0%D0%95%D0%A1%D0%A3%D0%A0%D0%A1,+%D0%A2%D0%9E%D0%92/@50.393348,25.7766678,15z/data=!4m2!3m1!1s0x0:0x647fedd3239403?sa=X&ved=2ahUKEwi0qeqo_JCDAxUr7LsIHXaXD0oQ_BJ6BAhAEAA'
      >
        <Image
          // eslint-disable-next-line no-secrets/no-secrets
          src={`https://maps.googleapis.com/maps/api/staticmap?center=Склоресурс&zoom=13&scale=2&size=400x400&maptype=roadmap&format=png&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&markers=size:mid%7Ccolor:0x9ddbe2%7Clabel:%7CСклоресурс`}
          alt='map'
          fill
          className='aspect-square object-contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </Link>
    </div>
  );
}
