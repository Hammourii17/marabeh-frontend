import { load } from 'recaptcha-v3'
import localConfig from '@/local_config'

export const useGoogleRecaptcha = () => {
  let recaptcha = null

  const loadRecaptcha = async () => {
    recaptcha = await load(localConfig.recaptchaSiteKey, {
      autoHideBadge: false,
      useRecaptchaNet: true,
    })
  }

  const getRecaptchaToken = async (action) => {
    try {
      if (!recaptcha) {
        await loadRecaptcha()
      }

      const token = await recaptcha?.execute(action)

      return token
    } catch (error) {
      console.error('Error getting recaptcha token:', error)
      return null
    }
  }

  return { getRecaptchaToken, loadRecaptcha }
}
