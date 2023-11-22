// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z
      .string({ required_error: 'NEXT_PUBLIC_BASE_URL is required' })
      .url('NEXT_PUBLIC_BASE_URL must be a valid URL'),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z
      .string({ required_error: 'NEXT_PUBLIC_GA_MEASUREMENT_ID is required' })
      .min(1),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z
      .string({ required_error: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY is required' })
      .min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  onInvalidAccess: () => {
    throw new Error(
      '❌ Attempted to access a server-side environment variable on the client'
    );
  },
  onValidationError: (error) => {
    console.error(
      '❌ Invalid environment variables:',
      error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables');
  },

  server: {
    CMS_API_KEY: z.string({ required_error: 'CMS_API_KEY is required' }).min(1),
    CMS_URL: z.string({ required_error: 'CMS_URL is required' }).url(),
    GOOGLE_PRIVATE_KEY: z
      .string({ required_error: 'GOOGLE_PRIVATE_KEY is required' })
      .min(1),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z
      .string({ required_error: 'GOOGLE_SERVICE_ACCOUNT_EMAIL is required' })
      .email(),
    RECAPTCHA_SECRET: z
      .string({ required_error: 'RECAPTCHA_SECRET is required' })
      .min(1),
    SPREADSHEET_ID: z
      .string({ required_error: 'SPREADSHEET_ID is required' })
      .min(1),
    TELEGRAM_BOT_TOKEN: z
      .string({ required_error: 'TELEGRAM_BOT_TOKEN is required' })
      .min(1),
    TELEGRAM_CHAT_ID: z
      .string({ required_error: 'TELEGRAM_CHAT_ID is required' })
      .min(1),
  },
});
