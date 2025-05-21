<template>
  <div class="terms-container">
    <Agreement
      :type="type"
      checkbox-text="I agree and accept Terms of Use"
      button-text="Next Step →"
      @accept="openVerifyModalPhone"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import useModals from '@/components/modal/modal'
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '@/stores/main'
  import { useRegistrationStore } from '@/stores/registration'
  import Otp from '@/modals/registration/Otp.vue'
  import Agreement from '@/components/Agreement/Agreement.vue'
  import useOtp from '@/composables/useOtp'

  const mainStore = useMainStore()
  const registrationStore = useRegistrationStore()
  const { sendCode, verifyOtp } = useOtp()
  const { user } = storeToRefs(mainStore)
  const props = defineProps({
    guarantor: {
      type: Object,
      default: null,
    },
  })

  const isInvestor = computed(() => true)

  const emit = defineEmits(['next-step', 'save-data'])
  const type = computed(() => {
    const types = {
      INSTITUTIONAL_INVESTOR: 'signupInvestor',
      INSTITUTIONAL_BORROWER: 'signupBorrower',
      INDIVIDUAL_INVESTOR: 'signupInvestor',
      INDIVIDUAL_BORROWER: 'signupBorrower',
      INSTITUTIONAL_GUARANTOR: 'signupGuarantor',
      INDIVIDUAL_GUARANTOR: 'signupGuarantor',
    }

    const guarantorRole = props.guarantor?.role_type || props.guarantor?.role

    return types[guarantorRole] ?? types[user.value.role_type]
  })

  const openVerifyModalPhone = async () => {
    if (registrationStore.formData?.step5?.isOTPSigned) {
      emit('next-step')
      return
    }

    await mainStore.fetchUser()
    sendCode({ phone_number: user.value.phone_number })
    useModals.show({
      a: Otp,
      b: {
        data: user.value.phone_number,
        type: 'sms',
        verifyCodeFunction: async (code) => {
          const data = {
            phone_number: user.value.phone_number,
            code,
          }

          await verifyOtp(data).then(() => {
            emit('save-data', {
              isOTPSigned: true,
            })
            emit('next-step')
          })
        },
        resendFunction: () => {
          const data = {
            phone_number: user.value.phone_number,
          }

          return sendCode(data)
        },
      },
      c: { clickToClose: true },
    })
  }
</script>

<style scoped>
  .terms-container {
    padding: 64px;
  }

  .terms-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
