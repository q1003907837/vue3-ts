import type { AxiosRequestConfig, AxiosResponse } from 'axios'

//自定义拦截器   因为可能创建不同的axios需要配置不同的拦截
export interface KERequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
//在原有的AxiosRequestConfig上扩展interceptors
export interface KERequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: KERequestInterceptors<T>
  showLoading?: boolean
}
