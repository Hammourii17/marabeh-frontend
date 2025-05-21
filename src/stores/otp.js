import { defineStore } from 'pinia'
import { app } from '@/main'

export const useOtpStore = defineStore('otp', {
  actions: {
    async sendVerifyCode(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post('otp/send/', data)
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        }
      })
    },

    async verifyCode(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post('otp/verify/', data)
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        }
      })
    },
  },
})
