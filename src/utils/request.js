//axios封装处理
import axios from "axios";
import { message } from "antd";
import { getToken, removeToken } from "./token";
import router from "@/router";
// import { UseSelector } from "react-redux";
//1.根域名配置+超时时间
// const [messageApi, contextHolder] = message.useMessage();
//2.请求拦截器/响应拦截器
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// const token = UseSelector(state => state.token)
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error);

  return Promise.reject(error);
});

// 添加响应拦截器
//响应返回客户端做拦截，处理返回数据
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error);
  if (error.response.status === 400) {
    removeToken()
    return message.error(error.response.data.message)
  }
  if (error.response.status === 401) {
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }
  return Promise.reject(error);
});

export { request }