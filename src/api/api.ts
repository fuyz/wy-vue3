import axios from 'axios'
import { HttpResponse } from '@/types/index'
// const axios = require('axios')
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url: any, params?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then((res: HttpResponse) => {
      resolve(res.data)
    }).catch((err: any) => {
      reject((err && err.data) || err)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export const post = (url: any, params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res: HttpResponse) => {
      resolve(res.data)
    }).catch((err: any) => {
      reject((err && err.data) || err)
    })
  })
}

/**
 * jsonp方法，对应jsonp请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const jsonp = (url: any, params?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.jsonp({
      url, params,
      jsonpCallbackParameter: 'callback', // 服务器端用于回调函数名的参数名，默认为 'callback'
      jsonpCallbackFunction: 'callbackName' // 回调函数名
    }).then((res: HttpResponse) => {
      debugger
      resolve(res.data)
    }).catch((err: any) => {
      reject((err && err.data) || err)
    })
  })
}
