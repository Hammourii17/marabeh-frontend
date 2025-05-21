import { useGoogleRecaptcha } from '@/composables/useRecaptcha'
import { useOtpStore } from '@/stores/otp'

export default () => {
  const { getRecaptchaToken } = useGoogleRecaptcha()
  const otpStore = useOtpStore()

  const sendCode = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await getRecaptchaToken('send_otp')
        data.recaptcha_token = token

        resolve(await otpStore.sendVerifyCode(data))
      } catch (error) {
        console.error('Error sending OTP:', error)
        reject(error)
      }
    })
  }

  const verifyOtp = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await getRecaptchaToken('verify_otp')
        data.recaptcha_token = token

        resolve(await otpStore.verifyCode(data))
      } catch (error) {
        console.error('Error verifying OTP:', error)
        reject(error)
      }
    })
  }

  return { sendCode, verifyOtp }
}
