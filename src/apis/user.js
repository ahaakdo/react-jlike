//用户相关
import { request } from "@/utils";

//登录请求
export function loginAPI (data) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}

//获取用户信息
export function getProfileAPI () {
  return request({
    url: '/user/profile',
    method: 'GET',
  })
}

