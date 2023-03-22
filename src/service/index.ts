import KERequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const keRequest = new KERequest({
  baseURL:BASE_URL,
  timeout:TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求拦截成功');
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('请求拦截失败');
      return error
    },
    responseInterceptor: (res) => {
      console.log('响应拦截成功');
      return res
    },
    responseInterceptorCatch:(err) => {
      console.log('响应拦截失败');
      return err
    }
  }
})

export default keRequest

//如果要base_url不止一个
// export const keRequst1 = new KERequest({})
