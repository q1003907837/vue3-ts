import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { KERequestInterceptors, KERequestConfig } from './type'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
const DEFAULT_LOADING = true
class KERequest {
  instance: AxiosInstance
  interceptors?: KERequestInterceptors
  showLoading: boolean
  loading?: any
  constructor(config: KERequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING // ?? 当前面的值为null和undefined的时候执行后面
    this.interceptors = config.interceptors
    //从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求拦截成功')
        //请求加loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应拦截成功')
        //移除loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        return res
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应拦截失败')
        //移除loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        if (err.response.status === '401') {
          //跳转首页   假如401为token过期
        }
        return err
      }
    )
  }

  request<T>(config: KERequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //请求单独的请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //请求单独的响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: KERequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }

  post<T>(config: KERequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }

  delete<T>(config: KERequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }

  patch<T>(config: KERequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}

export default KERequest
