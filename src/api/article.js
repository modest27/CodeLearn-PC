// 封装和文章相关的接口

import request from 'utils/request'

// 获取文章列表数据
export function getArticles(params) {
  return request({
    method: 'GET',
    url: '/mp/articles',
    params
  })
}
