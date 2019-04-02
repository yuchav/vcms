import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/',
    method: 'get',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/',
    method: 'get'
  })
}
