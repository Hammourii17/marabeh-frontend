import axios from 'axios'
import config from '~/local_config'
import { useMainStore } from '~/stores/main.js'
import { useNotifications } from '@/composables/useNotifications'

export default (app) => {
  const mainStore = useMainStore()
  const { notification } = useNotifications()

  app.config.globalProperties.$http = axios.create({
    baseURL: config.api.baseURL,
  })

  const router = app.config.globalProperties.$router
  const noAuthRequireRoutes = ['token/logout/', 'user/register/', 'token/']

  router.options.routes.forEach((item) => {
    if (!item.meta || !item.meta.authRequired) {
      if (item.path && item.path !== '/') {
        noAuthRequireRoutes.push(item.path)
      }
    }
  })

  const noAuthRequireApis = ['/token/'].map((uri) => config.api.baseURL + uri)

  let isRefreshing = false
  let failedQueue = []

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)))
    failedQueue = []
  }

  app.config.globalProperties.$http.interceptors.request.use(
    async function (config) {
      config.headers['X-API-LANG'] = localStorage.getItem('lang') || 'en'
      let token = localStorage.getItem('token')

      if (!noAuthRequireApis.includes(config.url) && token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  app.config.globalProperties.$http.interceptors.response.use(
    function (response) {
      return transformResponse(response)
    },
    async function (error) {
      const originalRequest = error.config
      const isExpiredToken =
        error.response && error.response.data && error.response.data.code === 'token_not_valid'

      if (
        error.response?.status === 401 &&
        !noAuthRequireApis.includes(error.response.config.url) &&
        error.response.config.url !== 'token/refresh/' &&
        !originalRequest._retry &&
        isExpiredToken
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`

              return app.config.globalProperties.$http(originalRequest)
            })
            .catch((err) => {
              throw err
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        return new Promise((resolve, reject) => {
          mainStore
            .refreshToken()
            .then((accessToken) => {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`

              processQueue(null, accessToken)

              resolve(app.config.globalProperties.$http(originalRequest))
            })
            .catch((error) => {
              processQueue(error, null)

              reject(error)
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      }

      showNotification(error)

      if (error.response && error.response?.data?.code?.code === 'token_not_valid') {
        return Promise.reject()
      } else {
        return Promise.reject(error && error.response ? transformResponse(error.response) : error)
      }
    }
  )

  function showNotification(error) {
    console.log(error.config)
    if (
      error.config?.method !== 'get' &&
      !error.config?.disableNotification &&
      (error.response?.status !== 401 ||
        error.response?.data?.detail === 'No active account found with the given credentials')
    ) {
      notification.create({
        type: 'error',
        title: 'Request failed with status ' + error.response?.status,
        duration: 4000,
        max: 3,
        content: `${error.response?.data?.message || 'Something went wrong'}`,
      })
    }
  }

  function transformResponse(response) {
    return {
      ...response,
      body: response.data,
    }
  }
}

export const http = axios.create({
  baseURL: config.api.baseURL,
})
