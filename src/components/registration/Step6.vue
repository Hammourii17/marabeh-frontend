<template>
  <div class="congratulations-container">
    <div class="congratulations-content">
      <h1 class="text-2xl font-bold">Adding a Bank Account for Withdrawals</h1>

      <p class="company-desc">
        You need to add your bank account to the platform to enable withdrawing funds from the
        platform back to your account.
      </p>

      <p class="text-gray-600">All fields are required.</p>

      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        class="flex flex-col flex-1"
      >
        <div class="flex flex-col gap-4">
          <n-form-item
            first
            label="Enter IBAN"
            path="iban"
          >
            <n-input
              v-model:value="formValue.iban"
              v-maska
              type="tel"
              placeholder="Enter IBAN"
              class="w-full"
              size="large"
              :input-props="{
                'data-maska': 'SA######################',
              }"
            />
          </n-form-item>

          <n-form-item
            first
            label="Confirm IBAN"
            path="ibanConfirm"
          >
            <n-input
              v-model:value="formValue.ibanConfirm"
              v-maska
              type="tel"
              placeholder="Confirm IBAN"
              class="w-full"
              size="large"
              :input-props="{
                'data-maska': 'SA######################',
              }"
            />
          </n-form-item>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <n-button
            text
            @click="handlePreviousStep"
            >← Previous Step</n-button
          >
          <n-button
            :disabled="!isFormValid"
            class="w-[43%] border rounded-[12px]"
            size="large"
            type="success"
            @click="sendEvent"
          >
            Next Step →
          </n-button>
        </div>
      </n-form>
    </div>
    <div class="congratulations-image__wrapper">
      <img
        src="@/assets/img/applause.png"
        alt="Esage"
        class="object-cover congratulations-img"
      />
    </div>
  </div>
</template>

<script setup>
  import { vMaska } from 'maska/vue'
  import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
  import { ref, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import useModals from '@/components/modal/modal'
  import Otp from '@/modals/registration/Otp.vue'
  import { useMainStore } from '~/stores/main'
  import { useRegistrationStore } from '@/stores/registration'
  import useOtp from '@/composables/useOtp'

  const emit = defineEmits(['previous-step', 'next-step', 'save-data', 'previous-step'])
  const mainStore = useMainStore()
  const registrationStore = useRegistrationStore()
  const { sendCode, verifyOtp } = useOtp()
  const { user } = storeToRefs(mainStore)
  const { role, formData } = storeToRefs(registrationStore)
  const formRef = ref(null)
  const formValue = ref({
    iban: '',
    ibanConfirm: '',
  })

  const rules = {
    iban: [
      {
        required: true,
        message: 'This field is required',
        trigger: ['blur'],
      },
      {
        validator: (rule, value) => {
          return value.length === 24
        },
        message: 'IBAN must be 24 characters',
        trigger: ['blur'],
      },
    ],
    ibanConfirm: [
      {
        required: true,
        message: 'This field is required',
        trigger: ['blur'],
      },
      {
        validator: (rule, value) => {
          return value.length === 24
        },
        message: 'IBAN must be 24 characters',
        trigger: ['blur'],
      },
      {
        validator: (rule, value) => {
          return value === formValue.value.iban
        },
        message: 'IBAN does not match',
        trigger: ['blur', 'input'],
      },
    ],
  }

  const isFormValid = computed(() => {
    return formValue.value.iban.trim() !== '' && formValue.value.ibanConfirm.trim() !== ''
  })

  const sendEvent = () => {
    formRef.value.validate((errors) => {
      const phoneNumber =
        role.value === 'INSTITUTIONAL_INVESTOR'
          ? user.value.organization.phone
          : user.value.phone_number
      if (!errors) {
        sendCode({ phone_number: phoneNumber })

        useModals.show({
          a: Otp,
          b: {
            data: phoneNumber,
            type: 'sms',
            verifyCodeFunction: async (code) => {
              const data = {
                phone_number: phoneNumber,
                code,
              }

              await verifyOtp(data).then(async () => {
                await mainStore.addIban(formValue.value.iban)
                useModals.close()
                emit('next-step')
              })
            },
            resendFunction: () => {
              const data = {
                phone_number: phoneNumber,
              }

              return sendCode(data)
            },
          },
        })
      }
    })
  }

  const handlePreviousStep = () => {
    emit('previous-step')
  }

  watch(formValue.value, () => {
    emit('save-data', formValue.value)
  })

  watch(
    () => formData.value,
    (value) => {
      if (value.step6) {
        formValue.value = {
          iban: formData.value.step6?.iban || '',
          ibanConfirm: formData.value.step6?.ibanConfirm || '',
        }
      }
    },
    { immediate: true }
  )
</script>

<style scoped>
  .congratulations-container {
    display: flex;
    justify-content: space-between;
  }

  .congratulations-content {
    padding: 64px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 500px;
  }

  .congratulations-image__wrapper {
    position: relative;
    height: 740px;
    padding: 24px;
    padding: 24px;
  }

  .congratulations-img {
    width: 100%;
    height: 100%;
  }
</style>
