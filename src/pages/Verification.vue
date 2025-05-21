<template>
  <div class="verification">
    <div class="bg-white p-10 rounded-lg shadow-lg w-1/2">
      <Argeement
        :verification-text="user.organization?.phone"
        type="verification"
        checkbox-text="I consent to the use of the number"
        button-text="Confirm"
        @accept="openVerifyModalPhone"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import Otp from '@/modals/registration/Otp.vue'
  import Argeement from '@/components/Agreement/Agreement.vue'
  import useModals from '@/components/modal/modal'
  import { useMainStore } from '@/stores/main'
  import { useRegistrationStore } from '@/stores/registration'
  import useOtp from '@/composables/useOtp'

  const router = useRouter()
  const mainStore = useMainStore()
  const registrationStore = useRegistrationStore()
  const { sendCode, verifyOtp } = useOtp()
  const { user } = storeToRefs(mainStore)

  const verifiedPhones = JSON.parse(localStorage.getItem('verifiedPhones')) || []

  const openVerifyModalPhone = () => {
    const phone = user.value.organization.phone
    sendCode({ phone_number: phone })

    useModals.show({
      a: Otp,
      b: {
        data: phone,
        type: 'phone',
        verifyCodeFunction: async (code) => {
          const data = {
            phone_number: phone,
            code,
          }

          // TODO проверить перед тем как отдавать
          await verifyOtp(data).then(async () => {
            verifiedPhones.push(phone)
            localStorage.setItem('verifiedPhones', JSON.stringify(verifiedPhones))

            try {
              await registrationStore.verifyKYBNumber().then(async () => {
                await mainStore.fetchUser()
              })
            } catch (e) {
              console.log(e)
            }

            router.push({ name: 'Dashboard' })
          })
        },
        resendFunction: () => {
          const data = {
            phone_number: phone,
          }

          return sendCode(data)
        },
      },
      c: { clickToClose: true },
    })
  }

  onMounted(() => {
    if (
      verifiedPhones.includes(user.value.organization?.phone) ||
      user.value?.status !== 'KYB_OTP'
    ) {
      router.push({ name: 'Dashboard' })
    }
  })
</script>

<style lang="scss" scoped>
  .verification {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
