import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const instanse = Axios.create({
  baseURL: process.env.CMS_URL,
  headers: {
    Authorization: `Bearer ${process.env.CMS_API_KEY}`,
    'Cache-Control': 'no-cache',
  },
});

const axios =
  process.env.NODE_ENV === 'development' ? instanse : setupCache(instanse);

export default axios;
