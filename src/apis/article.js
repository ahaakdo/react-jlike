//封装和文章相关
import { request } from "@/utils";

//获取频道列表
export function getChannelAPI () {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

//新增文章
export function createArticleAPI (data) {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

//获取文章列表
export function getArticleAPI (params) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

//删除文章
export function deleteArticleAPI (id) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  })
}

//获取指定文章详情
export function getArticleByIdAPI (target) {
  return request({
    url: `/mp/articles/${target}`,
    method: 'GET',
  })
}

//更新文章
export function putArticleByIdAPI (data) {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}