<template>
  <div class="registration-step__container">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Registration</h1>
    </div>
    <p class="text-gray-600 mb-4">
      <template v-if="guarantor">
        This is the initial and quick step to confirm your role as a guarantor on our platform.
        Please prepare your email and create a secure password. These credentials will be used to
        access your guarantor account.
      </template>

      <template v-else>
        Registration is the initial and fairly quick step to start working with our platform. For
        the this step, please prepare your email and create a secure password. You will need this
        data later to log in to our platform.
      </template>
    </p>
    <p class="text-gray-600 mb-4">All fields are required.</p>
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col flex-1"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <n-form-item
          label="Full Name"
          first
          path="fullName"
        >
          <n-input
            v-model:value="formValue.fullName"
            placeholder="Enter your Full Name"
            class="w-full"
            size="large"
          />
        </n-form-item>

        <n-form-item
          label="National ID"
          first
          path="nationalId"
        >
          <n-input
            v-model:value="formValue.nationalId"
            v-maska
            placeholder="Enter the National ID"
            class="w-full"
            size="large"
            :input-props="{
              'data-maska': '##########',
            }"
          />
        </n-form-item>

        <n-form-item
          label="Job Title"
          first
          path="jobTitle"
        >
          <n-select
            v-model:value="formValue.jobTitle"
            placeholder="Select the Job Title"
            :options="jobTitles"
            class="w-full col-span-2"
            size="large"
          />
        </n-form-item>

        <n-form-item
          label="Password"
          first
          path="password"
        >
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="Enter password"
            class="w-full"
            size="large"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-form-item
          label="Confirm Password"
          first
          path="confirmPassword"
        >
          <n-input
            v-model:value="formValue.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="w-full"
            show-password-on="click"
            size="large"
          />
        </n-form-item>

        <n-form-item
          ref="emailRef"
          label="E-mail Address"
          first
          path="email"
        >
          <n-input-group>
            <n-input
              v-model:value="formValue.email"
              type="email"
              placeholder="Enter your email address"
              class="w-full"
              size="large"
              @change="formValue.emailVerified = false"
            />

            <n-button
              :loading="isLoadingVerifyEmail"
              :disabled="isLoadingVerifyEmail || formValue.emailVerified"
              type="primary"
              size="large"
              @click="verifyEmail"
            >
              {{ formValue.emailVerified ? 'Verified' : 'Verify' }}
            </n-button>
          </n-input-group>
        </n-form-item>

        <n-form-item
          ref="phoneNumberRef"
          label="Phone Number"
          first
          path="phoneNumber"
          class="w-full"
        >
          <n-input-group>
            <n-input
              v-model:value="formValue.phoneNumber"
              v-maska
              default-value="+"
              placeholder="Enter your Phone Number"
              class="w-full"
              size="large"
              :input-props="{
                'data-maska': '+966#########',
              }"
              @change="formValue.phoneVerified = false"
            />

            <n-button
              :loading="isLoadingVerifyPhone"
              :disabled="isLoadingVerifyPhone || formValue.phoneVerified"
              type="primary"
              size="large"
              @click="verifyPhone"
            >
              {{ formValue.phoneVerified ? 'Verified' : 'Verify' }}
            </n-button>
          </n-input-group>
        </n-form-item>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <n-button
          v-if="!disablePreviousStep"
          text
          @click="handlePreviousStep"
          >← Previous Step</n-button
        >
        <n-form-item class="w-[43%]">
          <n-button
            :loading="isLoading"
            :disabled="isLoading"
            class="w-[100%] border rounded-[12px]"
            size="large"
            type="success"
            @click="handleSubmit"
          >
            Next Step →
          </n-button>
          <!-- <n-button @click="openIndividualRegistrationModal" class="w-[100%] border rounded-[12px]" size="large"
            type="success">
            Next Step →
          </n-button> -->
        </n-form-item>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NInput, NButton, NSelect, NInputGroup } from 'naive-ui'
  import { ref, computed, watch, inject } from 'vue'
  import { vMaska } from 'maska/vue'
  import { storeToRefs } from 'pinia'
  import Otp from '@/modals/registration/Otp.vue'
  import { useRegistrationStore } from '@/stores/registration'
  import useModals from '@/components/modal/modal'
  import useOtp from '@/composables/useOtp'

  const props = defineProps({
    guarantor: {
      type: Object,
      default: null,
    },
    disablePreviousStep: {
      type: Boolean,
      default: false,
    },
  })

  const registrationStore = useRegistrationStore()
  const { formData } = storeToRefs(registrationStore)
  const { sendCode, verifyOtp } = useOtp()

  const isLoading = inject('isLoading')
  const isLoadingVerifyEmail = ref(false)
  const isLoadingVerifyPhone = ref(false)

  const formRef = ref(null)
  const emailRef = ref(null)
  const phoneNumberRef = ref(null)
  const emailServerError = ref('')

  const formValue = ref({
    email: props.guarantor?.email || '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    fullName: props.guarantor?.full_name || '',
    jobTitle: null,
    nationalId: '',
    dateBirth: null,
    phoneNumber: '',
    emailVerified: !!props.guarantor?.email || false,
    phoneVerified: false,
  })

  const phoneServerError = ref(null)

  const validatePasswordSame = (rule, value) => {
    return value === formValue.value.password
  }

  const validatePassword = (rule, value) => {
    const lengthCheck = value.length >= 12
    const uppercaseCheck = /[A-Z]/.test(value)
    const numberCheck = /\d/.test(value)
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(value)

    if (!value) {
      return new Error('Password is required')
    }
    if (!lengthCheck) {
      return new Error('The password must contain a minimum of 12 characters.')
    }
    if (!uppercaseCheck) {
      return new Error('The password must contain at least one capital letter.')
    }
    if (!numberCheck) {
      return new Error('The password must contain at least one digit.')
    }
    if (!specialCharCheck) {
      return new Error('The password must contain at least one special character.')
    }

    return true
  }

  const rules = {
    fullName: [
      {
        required: true,
        message: 'Full Name is required',
        trigger: ['blur'],
      },
    ],
    nationalId: [
      {
        required: true,
        message: 'National ID is required',
        trigger: ['blur'],
      },
      {
        message: 'Please enter a valid National ID',
        trigger: ['blur'],
        validator: (rule, value) => {
          return value.length === 10
        },
      },
    ],
    jobTitle: [
      {
        required: true,
        message: 'Job title is required',
        trigger: ['blur'],
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: 'Phone Number is required',
        trigger: ['blur'],
      },
      {
        validator: () => {
          return formValue.value.phoneVerified
        },
        message: 'Your phone number is not verified',
        trigger: ['check-verify'],
      },
      {
        message: 'Please enter a valid phone number',
        validator: () => {
          return phoneServerError.value ? false : true
        },
        trigger: ['server-error'],
      },
    ],
    email: [
      {
        required: true,
        message: 'Email is required',
        trigger: ['blur'],
      },
      {
        validator: () => {
          return formValue.value.emailVerified
        },
        message: 'Your email is not verified',
        trigger: ['check-verify'],
      },
      {
        validator: () => {
          return emailServerError.value === ''
        },
        message: 'Email already exists',
        trigger: ['server-error'],
      },
    ],
    password: [
      {
        required: true,
        validator: validatePassword,
        trigger: ['blur', 'input'],
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: 'Password is required',
        trigger: ['blur'],
      },
      {
        validator: validatePasswordSame,
        message: 'Password is not same as re-entered password!',
        trigger: ['blur', 'input'],
      },
    ],
  }

  const jobTitles = computed(() => {
    return registrationStore.employeerRoles
      ? registrationStore.employeerRoles.results.map((item) => {
          return {
            label: item.name_en,
            value: item.name_en,
          }
        })
      : []
  })

  const emit = defineEmits(['nextStep', 'previousStep', 'save-data'])

  const handleSubmit = (e) => {
    e.preventDefault()

    formRef.value?.validate((errors) => {
      if (!errors) {
        const combinedData = {
          ...formValue.value,
          // questionnaire_results: modalData,
        }
        emit('nextStep', combinedData)
        // emit('modalData', combinedData);
      } else {
        console.log('errors', errors)
      }
    })
    // emit('modalData', combinedData);
  }

  const handlePreviousStep = () => {
    emit('previousStep')
  }

  const openVerifyModalEmail = () => {
    useModals.show({
      a: Otp,
      b: {
        data: formValue.value.email,
        type: 'email',
        verifyCodeFunction: async (code) => {
          const data = {
            email: formValue.value.email,
            code,
          }

          await verifyOtp(data).then(() => {
            formValue.value.emailVerified = true
            emailRef.value?.restoreValidation()
          })
        },
        resendFunction: () => {
          const data = {
            email: formValue.value.email,
          }

          return sendCode(data)
        },
      },
      c: { clickToClose: true },
    })
  }

  const openVerifyModalPhone = () => {
    useModals.show({
      a: Otp,
      b: {
        data: formValue.value.phoneNumber,
        type: 'phone',
        verifyCodeFunction: async (code) => {
          const data = {
            phone_number: formValue.value.phoneNumber,
            code,
          }

          await verifyOtp(data).then(() => {
            formValue.value.phoneVerified = true
            phoneNumberRef.value?.restoreValidation()
          })
        },
        resendFunction: () => {
          const data = {
            phone_number: formValue.value.phoneNumber,
          }

          return sendCode(data)
        },
      },
      c: { clickToClose: true },
    })
  }

  const verifyEmail = () => {
    if (!formValue.value.email) {
      return
    }

    isLoadingVerifyEmail.value = true

    sendCode({
      email: formValue.value.email,
    })
      .then(() => {
        openVerifyModalEmail()
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        isLoadingVerifyEmail.value = false
      })
  }

  const verifyPhone = () => {
    if (!formValue.value.phoneNumber) {
      return
    }

    isLoadingVerifyPhone.value = true

    sendCode({
      phone_number: formValue.value.phoneNumber,
    })
      .then(() => {
        phoneServerError.value = false
        openVerifyModalPhone()
      })
      .catch((err) => {
        phoneServerError.value = true
        phoneNumberRef.value?.validate({ trigger: 'server-error' })
      })
      .finally(() => {
        isLoadingVerifyPhone.value = false
      })
  }

  watch(
    () => formValue.value,
    () => {
      emit('save-data', formValue.value)
    },
    { deep: true }
  )

  watch(
    () => formData.value,
    () => {
      const data = formData.value?.step4

      console.log(data)

      if (data) {
        formValue.value = {
          ...(data ? data : formValue.value),
        }
      }
    },
    { immediate: true }
  )

  defineExpose({
    setEmailError(value) {
      emailServerError.value = value
      emailRef.value?.validate({ trigger: 'server-error' })
    },
  })
</script>

<style scoped>
  .registration-step__container {
    padding: 64px;
  }
</style>
