import { request } from './request'

export function getDetail(iid) {
  return request({
    url: 'api/v1/detail',
    params: {
      iid
    }
  })
}
