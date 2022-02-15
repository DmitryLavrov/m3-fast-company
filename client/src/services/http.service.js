import axios from 'axios'
// import * as Sentry from '@sentry/react'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()

    if (refreshToken && expiresDate > Date.now()) {
      const data = await authService.refresh()
      localStorageService.setToken(data)
    } else {
      localStorageService.removeAuthData()
    }

    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + accessToken
      }
    }

    return config
  }, function (err) {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(res => {
    res.data = {content: res.data}
    return res
  },
  err => {
    const expectedError = err.response && err.response.status >= 400 && err.response.status < 500
    if (!expectedError) {
      toast.info('Unexpected error. Try it later.')
    }
    return Promise.reject(err)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default httpService
