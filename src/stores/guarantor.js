import { defineStore } from 'pinia'
import { app } from '@/main'

export const useGuarantorStore = defineStore('guarantor', {
  state: () => {
    return {
      guarantor: null,
      isUrlExpired: false,
    }
  },
  actions: {
    fetchGuarantorInfoByToken(token) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.get(
            `organization/organization/guarantor/verify-link/${token}/`
          )
          this.guarantor = response.data.data
          // localStorage.setItem('token', this.guarantor.access_token)
          resolve(response.data.data)
        } catch (e) {
          console.log('error', e)
          this.isUrlExpired = true
          reject(e)
        }
      })
    },
  },
})
