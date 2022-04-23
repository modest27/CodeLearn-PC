// 封装和判断相关的接口
import request from 'utils/request'

export function getChannels() {
  return request({
    method: 'GET',
    url: '/channels'
  })
}
