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
      console.log('请求成功的拦截');
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截');
      return err;
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截');
      return res;
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截');
      return err;
    },
  },
});
export default defaultRequest;
