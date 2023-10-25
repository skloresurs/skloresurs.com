import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(
  Axios.create({
    baseURL: process.env.CMS_URL,
    headers: {
      Authorization: `Bearer ${process.env.CMS_API_KEY}`,
    },
  }),
);

export default axios;
