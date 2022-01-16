import localCache from '@/utils/local-cache';
import request from './request';

const defaultRequest = new request({
  baseURL: import.meta.env.VITE_APP_BASE_URL as string,
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});
export default defaultRequest;
