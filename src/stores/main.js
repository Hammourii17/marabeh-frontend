import { defineStore } from 'pinia'
import { app } from '@/main'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      user: {},
      isLoggedIn: localStorage.getItem('token'),
      refresh_token_lock: false,
      companies: [],
      loans: [],
      loanDocs: null,
      offers: [],
      loanDetails: {},
      investments: [],
      userCompanies: [],
      balance: 0,
      ibanList: [],
      userType: 'Client',
      role_kind: null,
      logs: [],
    }
  },
  actions: {
    setUserType(res) {
      this.userType = res
    },
    setUser(user) {
      this.user = user
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        app.config.globalProperties.$http
          .post('token/refresh/', {
            refresh: localStorage.getItem('refresh_token') ?? '',
          })
          .then((response) => {
            localStorage.setItem('token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            resolve(response.data.access)
          })
          .catch((e) => {
            this.logout()
            reject(e)
          })
      })
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('role')
      localStorage.removeItem('role_kind')
      this.user = {}
      this.isLoggedIn = false
    },
    async fetchUser() {
      try {
        const response = await app.config.globalProperties.$http.get(`user/profile/`)
        this.user = response.data
        const roleType = response.data.role_type
        const [roleKind, role] = roleType?.split('_') || []

        this.role_kind = roleKind
        this.userType = role

        localStorage.setItem('role', this.userType)
        localStorage.setItem('role_kind', this.role_kind)
      } catch (e) {
        console.log('error', e)
      }
    },
    async login(payload) {
      localStorage.setItem('token', payload.data.access)
      localStorage.setItem('refresh_token', payload.data.refresh)
      await this.fetchUser()
      this.isLoggedIn = true
    },
    async fetchCompanies(params = {}) {
      try {
        const response = await app.config.globalProperties.$http.get('campaign/campaigns/', {
          params: { ...params, limit: 100 },
        })
        this.companies = response.data
      } catch (e) {
        console.error('Error fetching companies:', e)
      }
    },
    async myCampaigns() {
      let response
      try {
        const isInvestor = localStorage.getItem('role')?.toLocaleLowerCase()?.includes('investor')
        if (isInvestor) {
          response = await app.config.globalProperties.$http.get(
            'campaign/campaigns/investor/?limit=100'
          )
        } else {
          response = await app.config.globalProperties.$http.get(
            'campaign/campaigns/borrower/?limit=100'
          )
        }

        return response
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchLoans(page = 0) {
      page = page - 1

      try {
        const response = await app.config.globalProperties.$http.get('loan/loan/', {
          params: { limit: 8, offset: page * 8 },
        })
        this.loans = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchLogs(page = 0) {
      page = page - 1

      try {
        const response = await app.config.globalProperties.$http.get('core/logs/', {
          params: {
            limit: 118,
            offset: page * 118,
          },
        })
        this.logs = (response.data.results || []).sort((a, b) => b.id - a.id) // по убыванию id
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finally')
      }
    },

    async fetchNotifications(page = 0) {
      page = page - 1

      try {
        const response = await app.config.globalProperties.$http.get(
          'notification/notifications/',
          {
            params: { limit: 8, offset: page * 8 },
          }
        )
        this.loans = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchLoanDetails(id) {
      try {
        const response = await app.config.globalProperties.$http.get(`loan/loan/${id}/`)
        this.loanDetails[id] = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchEarlyTerminationAmount(loanId) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.get(
            `loan/loan/${loanId}/early-termination-amount/`
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async performEarlyTermination(loanId) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post(
            `loan/loan/${loanId}/early-termination/`
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async loanPayment(paymentId, amount) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post('loan/loan/pay_manually', {
            schedule: paymentId,
          })
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async fetchLoanDocs(id) {
      try {
        const response = await app.config.globalProperties.$http.get(`loan/loans/${id}/docs/`)
        this.loanDocs = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchOffers() {
      try {
        const response = await app.config.globalProperties.$http.get('campaign/offer/')
        this.offers = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchOffer(id) {
      try {
        const response = await app.config.globalProperties.$http.get(`campaign/offer/${id}/`)
        return response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchOfferCampaigns(id) {
      try {
        const response = await app.config.globalProperties.$http.get(
          `campaign/offer/${id}/campaigns/`
        )
        return response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async updateOfferStatus(id, status) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.patch(
            `campaign/offer/${id}/update_state`,
            { status }
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async updateCampaignStatus(id, status) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post(
            `campaign/campaigns/${id}/sign-campaign/`,
            { status }
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async updateLoanStatus(id, status) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post(
            `loan/loans/${id}/sign-campaign/`,
            { status }
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async updateGuarantorStatus(status) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.patch(
            'organization/organization/guarantor/update_state/',
            {
              status,
            }
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async addIban(iban) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.post(
            `finance/withdrawal-accounts/`,
            { iban }
          )
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async fetchIbanList() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await app.config.globalProperties.$http.get(
            `finance/withdrawal-accounts/`
          )
          this.ibanList = response.data.results
          resolve(response.data)
        } catch (e) {
          console.log('error', e)
          reject(e)
        } finally {
          console.log('finnaly')
        }
      })
    },

    async fetchInvestments(page = 1) {
      page = page - 1

      try {
        const response = await app.config.globalProperties.$http.get('loan/loan/', {
          params: { limit: 8, offset: page * 8 },
        })
        this.investments = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async getBallance() {
      try {
        const response = await app.config.globalProperties.$http.get('finance/wallet/my-wallet/')
        this.balance = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchUserCompanies() {
      try {
        const isInvestor = localStorage.getItem('role')?.toLocaleLowerCase()?.includes('investor')
        let str = `campaign/campaigns/`
        const response = await app.config.globalProperties.$http.get(
          // `campaign/campaigns/?${isInvestor ? "investors=true" : "borrower=true"}`
          `campaign/campaigns/${isInvestor ? 'investor/' : 'borrower/'}`
        )
        this.userCompanies = response.data
      } catch (e) {
        console.log('error', e)
      } finally {
        console.log('finnaly')
      }
    },

    async fetchUserM() {
      return await app.config.globalProperties.$http.get(`user/profile/`)
    },

    async updateInvestorStatus(data) {
      try {
        const response = await app.config.globalProperties.$http.patch(
          `user/profile/update-hnwi-status/`,
          {
            hnwi_results: data,
          }
        )
        return response
      } catch (e) {
        console.log('error', e)
      }
    },

    uploadHNWIFile(formData) {
      return app.config.globalProperties.$http.post('user/profile/add-doc/', formData)
    },
  },
  getters: {
    getUserType(state) {
      return state.userType
    },
    getUser(state) {
      return state.user
    },
    getCompanyById: (state) => (id) => {
      return state.companies.find((item) => item.id === id)
    },
    getUserCompanyById: (state) => (id) => {
      return state.userCompanies.find((item) => item.id === id)
    },
    getLoanById: (state) => (id) => {
      return state.loanDetails[id]
    },
  },
})
