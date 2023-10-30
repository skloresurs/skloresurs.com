'use client';

import axios from 'axios';
import Link from 'next/link';
import { useReCaptcha } from 'next-recaptcha-v3';
import { type FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useI18n } from '@/utils/i18nClient';

import MdiEmailNewsletter from '../icons/MdiEmailNewsletter';
import MdiPhone from '../icons/MdiPhone';
import MdiSend from '../icons/MdiSend';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from '../ui/alert-dialog';
import { Button, buttonVariants } from '../ui/button';

interface FormSchema {
  username: string;
  email: string;
  phone: string | null;
  message: string;
  additional: string | null;
}

type AlertData = 'successfully' | 'error' | 'captcha';

export default function ContactUsForm() {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { executeRecaptcha } = useReCaptcha();

  const [formData, setFormData] = useState<FormSchema>({
    username: '',
    email: '',
    phone: null,
    message: '',
    additional: null,
  });

  const [alertData, setAlertData] = useState<AlertData>('successfully');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    const token = await executeRecaptcha('form_submit').catch((_) => null);
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
      .then(() => {
        setAlertData('successfully');
      })
      .catch(() => setAlertData('error'))
      .finally(() => {
        setIsLoading(false);
        setIsOpen(true);
      });
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
          data-aos-delay="100"
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
          data-aos-delay="100"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <input
          name="phone"
          id="phone"
          className="rounded-md border-[1px] border-border bg-[transparent] px-4 py-2"
          placeholder={t('home.contact-us.form.phone.placeholder')}
          data-aos="fade-right"
          data-aos-delay="100"
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
          data-aos-delay="100"
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
          data-aos-delay="100"
          onChange={(e) => {
            setFormData({ ...formData, additional: e.target.value });
          }}
        />
        <Button
          className="flex flex-row items-center gap-1"
          type="submit"
          data-aos="fade-right"
          data-aos-delay="200"
          disabled={isLoading}
        >
          {t(
            `home.contact-us.form.submit-button.${
              isLoading ? 'loading' : 'default'
            }`,
          )}
          <MdiSend />
        </Button>
        <div
          className="flex flex-col justify-between gap-2 lg:flex-row"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <div className="flex flex-row items-center gap-1">
            <MdiPhone width={42} height={42} />
            <div className="flex flex-col">
              <p className="font-medium">{t('home.contact-us.telephone')}</p>
              <Link
                href="tel:+38 (044) 355-05-99"
                className={twMerge(
                  buttonVariants({ variant: 'link' }),
                  'p-0 m-0 h-min',
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
                href="mailto:office@skloresurs.com"
                className={twMerge(
                  buttonVariants({ variant: 'link' }),
                  'p-0 m-0 h-min',
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
