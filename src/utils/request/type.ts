import type { AxiosRequestConfig, AxiosResponse } from 'axios';
interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: Error) => void;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: Error) => void;
}
interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}

export { RequestInterceptors, RequestConfig };
