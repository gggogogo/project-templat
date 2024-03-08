import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export class API {
  api: AxiosInstance
  constructor(baseURL: string, timeout: number) {
    // 创建axios实例
    this.api = axios.create({
      baseURL: baseURL,
      timeout: timeout || 5000,
    })
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    this.api.interceptors.request.use(this.reqInterceptorSuc)

    // 响应拦截器
    this.api.interceptors.response.use(
      this.resInterceptorSuc,
      // 请求失败
      this.resInterceptorFail,
    )
  }
  //   AxiosInterceptorManager<InternalAxiosRequestConfig>
  reqInterceptorSuc(config: InternalAxiosRequestConfig) {
    return config
  }

  resInterceptorSuc(res: AxiosResponse) {
    if (res.status === 200) {
      //   if (res.data.error_no == -10 || res.data.errorNo == -10) {
      //     return new Promise((resolve, reject) => {})
      //   } else {
      //     return Promise.resolve(res.data)
      //   }
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  }
  resInterceptorFail(error: any) {
    console.log('----请求失败：', error)
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response)
    } else {
      var err = error
      var message = '网路服务异常，请稍后再试！'
      if (!window.navigator.onLine) {
        console.log('----网路异常----')
        message = '网络异常，请检查网络是否连接正常！'
        err.message = message
      } else if (error.message == 'Network Error') {
        message = '网络异常，请检查网络是否连接正常！'
        err.message = message
        console.log(err.message)
      }
      return Promise.reject(err)
    }
  }

  getInstace() {
    return this.api
  }

  get(url: string, params: any) {
    return this.api.get(url, { params })
  }

  post(url: string, data: any) {
    return this.api.post(url, data)
  }
}

export interface TztServiceConfig {
  action: string | number
  reqlinkType: number
}

export const tztAPI = async (
  query: Record<string, any> = {},
  config = {},
  tztServiceConfig: TztServiceConfig = {
    action: '1237',
    reqlinkType: 2,
  },
) => {
  let params = {
    action: tztServiceConfig.action || '1237',
    reqlinkType: tztServiceConfig.reqlinkType || 2,
    param: JSON.stringify({ ...query }),
  }
  return new Promise((resolve, reject) => {
    $ &&
      $.getData(
        config,
        params,
        (res: any) => {
          resolve(res)
        },
        (err: Error) => {
          reject(err)
        },
      )
  })
}
