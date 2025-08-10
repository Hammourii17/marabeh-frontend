const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/'

const localConfig = {
  api: {
    baseURL: apiBaseURL,
  },

  // recaptchaSiteKey: '6LdIIcAqAAAAAGyd4XSn5VN5H8a9YA7USV-Cs-Kf',
  recaptchaSiteKey: '6LfbEcEqAAAAAEFTrzT8uc65k_z5nvplJsVxupWo',
  title: 'TEMMATHEL',
}

export default localConfig
