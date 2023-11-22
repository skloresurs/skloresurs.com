import type { AxiosInstance } from 'axios';
import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

import { env } from '@/env.mjs';

/**
 * Creates an Axios instance for the CMS API.
 *
 * @return {AxiosInstance} The created Axios instance.
 */
const createCmsAxiosInstance = (): AxiosInstance =>
  Axios.create({
    baseURL: env.CMS_URL,
    headers: {
      Authorization: `Bearer ${env.CMS_API_KEY}`,
      'Cache-Control': 'no-cache',
    },
  });

/**
 * Creates an Axios instance based on the current environment.
 * If the environment is development, it uses createCmsAxiosInstance.
 * Otherwise, it uses setupCache(createCmsAxiosInstance).
 *
 * @returns {AxiosInstance} The Axios instance.
 */
const axios =
  process.env.NODE_ENV === 'development'
    ? createCmsAxiosInstance()
    : setupCache(createCmsAxiosInstance());

export default axios;
