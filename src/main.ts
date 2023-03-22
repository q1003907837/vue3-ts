import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import keRequest from './service/index'
import './assets/index.less'
import 'normalize.css'
createApp(App).use(store).use(router).mount('#app')
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// keRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的config')
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response')
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res)
//     console.log(res.data)
//     console.log(res.data.returnCode)
//     console.log(res.success)
//   })
