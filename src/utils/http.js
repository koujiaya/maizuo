// 1- 对于数据请求的封装

// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=1236076',
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649078075294411418206209","bc":"110100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }

// function httpForInfo (params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=950124`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649078075294411418206209","bc":"110100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }

// export default {
//   httpForList,
//   httpForInfo
// }

// 2- 对于数据请求的封装

import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649078075294411418206209","bc":"110100"}',
    'X-Host': 'mall.film-ticket.film.info'
  }
})

// 在发请求之前拦截 - showLoading
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功后拦截 - hideLoading
// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return {
    ...response,
    name: 'kou'
  }
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default http
