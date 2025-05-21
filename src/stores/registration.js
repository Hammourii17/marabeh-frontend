import { defineStore } from 'pinia'
import { app } from '@/main'

export const useRegistrationStore = defineStore('registration', {
  state: () => {
    return {
      industries: null,
      financePurposes: null,
      employeerRoles: null,
      step: 1,
      companyType: null,
      role: 'INDIVIDUAL_INVESTOR',
      roleGuarantor: 'INDIVIDUAL_GUARANTOR',
      formData: {},
      isRegisterAuth: false,
      createdCompanyId: null,
    }
  },
  actions: {
    async fetchIndustries() {
      if (this.industries) {
        return
      }

      try {
        const response = await app.config.globalProperties.$http.get('organization/industries/')

        this.industries = response.data
      } catch (e) {
        console.log('error', e)
      }
    },
    async fetchFinancePurposes() {
      if (this.financePurposes) {
        return
      }

      try {
        const response = await app.config.globalProperties.$http.get(
          'organization/financepurposes/'
        )

        this.financePurposes = response.data
      } catch (e) {
        console.log('error', e)
      }
    },
    async fetchEmployeerRoles() {
      if (this.employeerRoles) {
        return
      }

      try {
        const response = await app.config.globalProperties.$http.get('user/employeeroles/')

        this.employeerRoles = response.data
      } catch (e) {
        console.log('error', e)
      }
    },

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

    async verifyKYBNumber() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post(
            'user/profile/confirm-verification/'
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        }
      })
    },

    setAuthKey(isAuth) {
      localStorage.setItem('isRegisterAuth', isAuth)
      this.isRegisterAuth = isAuth
    },
    setCompanyId(id) {
      this.createdCompanyId = id
    },
    setStep(newStep) {
      this.step = newStep

      if (newStep === 1) {
        this.reset()
      } else {
        this.saveToLocalStorage()
      }
    },
    setFormData(step, data) {
      this.formData[step] = {
        ...this.formData[step],
        ...data,
      }
      this.saveToLocalStorage()
    },
    reset() {
      this.step = 1
      this.companyType = null
      this.role = 'INDIVIDUAL_INVESTOR'
      this.isRegisterAuth = false
      this.createdCompanyId = null
      this.formData = {}
      this.clearLocalStorage()
    },
    resetRegestireAuth() {
      if (this.isRegisterAuth) {
        this.reset()
      }
    },
    setCompanyType(companyType) {
      // changed from setType to setCompanyType
      this.companyType = companyType
      this.saveToLocalStorage()
    },
    setRole(role) {
      this.role = role
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem(
        'registration',
        JSON.stringify({
          step: this.step,
          companyType: this.companyType,
          companyId: this.createdCompanyId,
          role: this.role,
          formData: this.formData,
          time: Date.now(),
        })
      )
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('registration')

      if (data) {
        const parsedData = JSON.parse(data)
        const timeDiff = Date.now() - parsedData.time

        if (timeDiff > 60 * 60 * 1000) {
          this.clearLocalStorage()
          return
        }

        this.step = parsedData.step
        this.companyType = parsedData.companyType
        this.createdCompanyId = parsedData.companyId
        this.role = parsedData.role
        this.formData = parsedData.formData
      }

      const isRegisterAuth = localStorage.getItem('isRegisterAuth')

      if (isRegisterAuth) {
        this.isRegisterAuth = isRegisterAuth === 'true'
      }
    },
    clearLocalStorage() {
      localStorage.removeItem('registration')
      localStorage.removeItem('isRegisterAuth')
    },
  },
})
