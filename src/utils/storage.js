// 用于封装所有的localstorage的操作
const TOKEN_KEY = 'token-codelearn-pc'

// 设置token
export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token)
}

// 获取token
export const getToken = token => {
  return localStorage.getItem(TOKEN_KEY)
}

// 移除token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

// 有无token
export const hasToken = () => !!getToken()
