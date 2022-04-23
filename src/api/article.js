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

// 删除文章接口
export function delArticle(id) {
  return request.delete(`/mp/articles/${id}`)
}
