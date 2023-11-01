import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

// Create a cache instance for Axios
const axios = setupCache(Axios);

// Set the base URL for Axios in development environment
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000';
}

export default axios;
