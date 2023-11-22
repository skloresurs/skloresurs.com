'use client';

import axios from 'axios';
import Link from 'next/link';
import { useReCaptcha } from 'next-recaptcha-v3';
import React, { type FormEvent, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { useI18n } from '@/utils/i18n-client';

import { MdiEmailNewsletter, MdiPhone, MdiSend } from '../icons/mdi';

interface FormSchema {
  username: string;
  email: string;
  phone: string;
  message: string;
  additional: string;
}

type AlertData = 'successfully' | 'error' | 'captcha';

export default function ContactUsForm() {
  const missingRef = useRef<HTMLInputElement>(null);
  const t = useI18n();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { executeRecaptcha } = useReCaptcha();

  const [formData, setFormData] = useState<FormSchema>({
    additional: '',
    email: '',
    message: '',
    phone: '',
    username: '',
  });

  const [alertData, setAlertData] = useState<AlertData>('successfully');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (missingRef.current?.value) {
      setAlertData('error');
      setIsOpen(true);
      return;
    }

    setIsLoading(true);
    const token = await executeRecaptcha('form_submit').catch(() => null);
    if (!token) {
      setAlertData('captcha');
      setIsLoading(false);
      setIsOpen(true);
    }

    axios
      .post('/api/contact-us', {
        ...formData,
        captcha: token,
      })
      .then(() => setAlertData('successfully'))
      .catch(() => setAlertData('error'));
    setIsLoading(false);
    setIsOpen(true);
  }
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {t(`home.contact-us.form.alerts.${alertData}.title`)}
          </AlertDialogHeader>
          <AlertDialogDescription>
            {t(`home.contact-us.form.alerts.${alertData}.description`)}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button onClick={() => setIsOpen(false)}>
              {t('home.contact-us.form.alert-button')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <form
        className="flex w-full max-w-[600px] flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="uppercase" data-aos="fade-right">
          {t('home.contact-us.title.default')}
          <span className="text-primary">
            {t('home.contact-us.title.primary')}
          </span>
        </h2>
        <input
          name="firstname"
          id="firstname"
          className="rounded-md border-[1px] border-border bg-[transparent] px-4 py-2"
          placeholder={t('home.contact-us.form.username.placeholder')}
          required
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <input
          name="email"
          id="email"
          type="email"
          className="rounded-md border-[1px] border-border bg-[transparent] px-4 py-2"
          placeholder={t('home.contact-us.form.email.placeholder')}
          required
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <input
          name="phone"
          id="phone"
          pattern="^(?:\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
          className="rounded-md border-[1px] border-border bg-[transparent] px-4 py-2"
          placeholder={t('home.contact-us.form.phone.placeholder')}
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
          value={formData.phone}
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
        />
        <textarea
          name="message"
          id="message"
          className="rounded-md border-[1px] border-border bg-[transparent] px-4 py-2"
          placeholder={t('home.contact-us.form.message.placeholder')}
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
        />
        <input
          name="additional"
          id="additional"
          className="rounded-md border-[1px] border-border bg-[transparent] px-4 py-2"
          placeholder={t('home.contact-us.form.additional.placeholder')}
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
          value={formData.additional}
          onChange={(e) => {
            setFormData({ ...formData, additional: e.target.value });
          }}
        />
        <input
          tabIndex={-1}
          autoComplete="new-password"
          ref={missingRef}
          name="password"
          id="password"
          className="absolute right-[9999px]"
        />
        <Button
          className="flex flex-row items-center gap-1"
          type="submit"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="200"
          disabled={isLoading}
        >
          {t(
            `home.contact-us.form.submit-button.${
              isLoading ? 'loading' : 'default'
            }`
          )}
          <MdiSend />
        </Button>
        <div
          className="flex flex-col justify-between gap-2 lg:flex-row"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="300"
        >
          <div className="flex flex-row items-center gap-1">
            <MdiPhone width={42} height={42} />
            <div className="flex flex-col">
              <p className="font-medium">{t('home.contact-us.telephone')}</p>
              <Link
                title="Telephone"
                href="tel:+38 (044) 355-05-99"
                className={twMerge(
                  buttonVariants({ variant: 'link' }),
                  'p-0 m-0 h-min'
                )}
              >
                +38 (044) 355-05-99
              </Link>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <MdiEmailNewsletter width={42} height={42} />
            <div className="flex flex-col">
              <p className="font-medium">E-mail</p>
              <Link
                title="E-mail"
                href="mailto:office@skloresurs.com"
                className={twMerge(
                  buttonVariants({ variant: 'link' }),
                  'p-0 m-0 h-min'
                )}
              >
                office@skloresurs.com
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
