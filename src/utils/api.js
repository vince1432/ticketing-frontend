import http from './axios'

export const login = (data) => {
  return http.post('/login', data)
}
