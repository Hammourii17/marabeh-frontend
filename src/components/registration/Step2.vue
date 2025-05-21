<template>
  <div class="company-container">
    <div class="company-content__wrapper">
      <div class="flex items-center justify-between">
        <h1 class="company-title">Company Info</h1>
      </div>

      <p class="company-desc">
        This is the initial verification stage of your company to determine whether it meets the
        conditions of work on our platform. Fill in the name of your company, its identification
        number, and indicate the type of company. Also, take the survey, answering all the questions
        provided.
      </p>

      <p class="text-gray-600 mb-6">All fields are required.</p>

      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        class="flex flex-col flex-1"
      >
        <div class="flex flex-col gap-4">
          <n-form-item
            label="Company Name"
            path="companyName"
          >
            <n-input
              v-model:value="formValue.companyName"
              placeholder="Enter company name"
              class="w-full"
              size="large"
            />
          </n-form-item>

          <n-form-item
            label="Company CR Number"
            path="companyNumber"
          >
            <n-input
              v-model:value="formValue.companyNumber"
              placeholder="Enter company number"
              class="w-full"
              size="large"
              @change="phoneServerError = false"
            />
          </n-form-item>

          <n-form-item
            ref="phoneNumberRef"
            label="Company phone"
            path="companyPhone"
          >
            <n-input
              v-model:value="formValue.companyPhone"
              v-maska
              default-value="+"
              placeholder="Enter company phone"
              class="w-full"
              size="large"
              :input-props="{
                'data-maska': '+966#########',
              }"
            />
          </n-form-item>

          <n-form-item
            label="Type of company"
            path="companyType"
          >
            <n-select
              v-model:value="formValue.companyType"
              placeholder="Select the type of company"
              :options="options"
              class="w-full col-span-2"
              size="large"
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
            :loading="isLoading"
            :disabled="!isFormValid || isLoading"
            class="w-[43%] border rounded-[12px]"
            size="large"
            type="success"
            @click="openCompanyInfo"
          >
            Next Step →
          </n-button>
        </div>
      </n-form>
    </div>
    <div class="company-image__wrapper">
      <img
        src="@/assets/img/companyInfo.png"
        alt="Esage"
        class="object-cover company-img"
      />
    </div>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NInput, NButton, NSelect } from 'naive-ui'
  import { ref, onMounted, watch, computed, inject } from 'vue'
  import { storeToRefs } from 'pinia'
  import { vMaska } from 'maska/vue'
  import CompanyInfo from '@/modals/registration/CompanyInfo.vue'
  import useModals from '@/components/modal/modal'
  import eventBus from '@/utils/eventBus'
  import { useRegistrationStore } from '@/stores/registration'
  const registrationStore = useRegistrationStore()
  const { formData, role } = storeToRefs(registrationStore)
  const phoneNumberRef = ref(null)
  const phoneServerError = ref(false)

  const isLoading = inject('isLoading')

  const openCompanyInfo = () => {
    useModals.show({
      a: CompanyInfo,
      b: {
        role: role.value,
      },
      c: { clickToClose: true },
    })
  }

  const formRef = ref(null)
  const formValue = ref({
    companyName: '',
    companyNumber: '',
    companyPhone: '',
    companyType: null,
  })

  const rules = {
    companyName: [
      {
        required: true,
        message: 'Company name is required',
        trigger: ['blur'],
      },
    ],
    companyNumber: [
      {
        required: true,
        message: 'Company number is required',
        trigger: ['blur'],
      },
    ],
    companyPhone: [
      {
        required: true,
        message: 'Company phone is required',
        trigger: ['blur'],
      },
      {
        message: 'Please enter a valid phone number',
        validator: () => {
          return phoneServerError.value ? false : true
        },
        trigger: ['server-error'],
      },
    ],
    companyType: [
      {
        required: true,
        message: 'Company type is required',
        trigger: ['blur'],
      },
    ],
  }

  const options = [
    {
      label: 'Solo owner',
      value: 'SOLO',
    },
    {
      label: 'Corporate',
      value: 'CORPORATE',
    },
  ]

  const emit = defineEmits(['modalData', 'previousStep', 'save-data'])

  const isFormValid = computed(() => {
    return (
      formValue.value.companyName.trim() !== '' &&
      formValue.value.companyNumber.trim() !== '' &&
      formValue.value.companyType !== null
    )
  })

  const handleSubmit = (modalData) => {
    if (isFormValid.value) {
      const combinedData = {
        ...formValue.value,
        questionnaire_results: modalData,
      }
      emit('modalData', combinedData)
    }
  }

  const handlePreviousStep = () => {
    emit('previousStep')
  }

  watch(formValue.value, () => {
    emit('save-data', formValue.value)
  })

  watch(
    () => formData.value,
    (value) => {
      if (value.step2) {
        formValue.value = {
          companyName: formData.value.step2?.companyName || '',
          companyNumber: formData.value.step2?.companyNumber || '',
          companyPhone: formData.value.step2?.companyPhone || '',
          companyType: formData.value.step2?.companyType || null,
        }
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    eventBus.on('continue', (modalData) => {
      handleSubmit(modalData)
    })
  })

  defineExpose({
    setPhoneError: (error) => {
      if (error.data?.phone) {
        phoneServerError.value = true
        phoneNumberRef.value?.validate({ trigger: 'server-error' })
      }
    },
  })
</script>

<style scoped>
  .company-container {
    display: flex;
    justify-content: space-between;
  }

  .company-content__wrapper {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 64px;
  }

  .company-image__wrapper {
    position: relative;
    height: 740px;
    padding: 24px;
  }

  .company-img {
    width: 100%;
    height: 100%;
  }

  .company-title {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    color: #1e293b;
    margin-bottom: 12px;
  }

  .company-desc {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #1e293b;
    margin-bottom: 32px;
  }
</style>
