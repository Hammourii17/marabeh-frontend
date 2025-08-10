import { load } from 'recaptcha-v3'
import localConfig from '@/local_config'

export const useGoogleRecaptcha = () => {
  const isEnabled = (import.meta.env.VITE_ENABLE_RECAPTCHA ?? 'true') !== 'false'
  let recaptcha = null

  const loadRecaptcha = async () => {
    if (!isEnabled) return
    recaptcha = await load(localConfig.recaptchaSiteKey, {
      autoHideBadge: false,
      useRecaptchaNet: true,
    })
  }

  const getRecaptchaToken = async (action) => {
    try {
      if (!isEnabled) return null
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
