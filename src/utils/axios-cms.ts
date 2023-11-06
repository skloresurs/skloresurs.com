import type { AxiosInstance } from 'axios';
import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

import { env } from '@/env.mjs';

/**
 * Creates an Axios instance for CMS access.
 *
 * @returns {AxiosInstance} The Axios instance for CMS access.
 */
const createCmsAxiosInstance = (): AxiosInstance => {
  // Configure the base URL and headers for CMS access
  // Return the configured instance
  return Axios.create({
    baseURL: env.CMS_URL,
    headers: {
      Authorization: `Bearer ${env.CMS_API_KEY}`,
      'Cache-Control': 'no-cache',
    },
  });
};

// Determine whether to use the cache interceptor based on the environment
const axios =
  process.env.NODE_ENV === 'development'
    ? createCmsAxiosInstance()
    : setupCache(createCmsAxiosInstance());

export default axios;
