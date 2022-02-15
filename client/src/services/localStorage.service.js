const ACCESS_KEY = 'jwt-access-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'

export function setToken({refreshToken, accessToken, userId, expiresIn = 3600}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(ACCESS_KEY, accessToken)
  localStorage.setItem(USERID_KEY, userId)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}

export function removeAuthData() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
}

const localStorageService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserId,
  removeAuthData
}

export default localStorageService
