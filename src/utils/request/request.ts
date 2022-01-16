import axios from 'axios';
import NProgress from 'nprogress';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestConfig, RequestInterceptors } from './type';

class request {
  private instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 默认拦截器
    this.instance.interceptors.request.use(
      (config) => {
        NProgress.start();
        return config;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        NProgress.done();
        const data = res.data;
        if (data.returnCode === '-1001') {
          console.log('请求失败');
        } else {
          return data;
        }
      },
      (err) => {
        NProgress.done();
        if (err.response.status === 404) {
          console.log('404');
        }
        return err;
      },
    );
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, AxiosResponse<T>>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  put<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }
}

export default request;
