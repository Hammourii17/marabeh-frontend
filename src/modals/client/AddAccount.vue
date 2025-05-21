<template>
  <div class="add-account-modal__container w-[500px]">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-800">Add bank account</h1>
    </div>

    <NForm
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col"
    >
      <div class="flex flex-col justify-center w-[100%]">
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
          :disabled="isFormInvalid"
          class="w-[100%] border rounded-[12px] company-modal__button"
          size="large"
          type="success"
          @click="sendEvent"
        >
          Add Account
        </n-button>
      </div>
    </NForm>
  </div>
</template>

<script setup>
  import { vMaska } from 'maska/vue'
  import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import useModals from '@/components/modal/modal'
  // import eventBus from '@/utils/eventBus';
  import Otp from '@/modals/registration/Otp.vue'
  import { useMainStore } from '~/stores/main'
  import { useRegistrationStore } from '@/stores/registration'
  import useOtp from '@/composables/useOtp'

  const mainStore = useMainStore()
  const registrationStore = useRegistrationStore()
  const { sendCode, verifyOtp } = useOtp()
  const { user } = storeToRefs(mainStore)
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

  const sendEvent = () => {
    formRef.value.validate((errors) => {
      if (!errors) {
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

              await verifyOtp(data).then(async () => {
                await mainStore.addIban(formValue.value.iban)
                await mainStore.fetchIbanList()
                useModals.close()
              })
            },
            resendFunction: () => {
              const data = {
                phone_number: user.value.phone_number,
              }

              return sendCode(data)
            },
          },
        })
      }
    })
  }

  const isFormInvalid = computed(() => {
    return Object.values(formValue.value).some((value) => value === null || value === '')
  })
</script>

<style scoped>
  .add-account-modal__container {
    display: flex;
    flex-direction: column;
    padding: 48px;
    width: 100%;
    gap: 12px;
  }
</style>
