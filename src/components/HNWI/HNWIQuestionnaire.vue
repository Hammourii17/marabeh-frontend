<template>
  <div class="hnwi-questionnaire__container">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-800">{{ content.title }}</h1>
    </div>
    <p class="text-gray-600 mb-8">{{ content.description }}</p>

    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col"
    >
      <div class="flex flex-col justify-center w-[100%] hnwi-questionnaire__questions">
        <div
          v-for="question in questions"
          :key="question.input"
          class="hnwi-questionnaire__item"
        >
          <n-form-item
            :label="question.label"
            :path="question.input"
            class="hnwi-questionnaire__question"
          >
            <TToggle
              v-if="question.type === 'toggle'"
              v-model="formValue[question.input]"
            />
          </n-form-item>
          <n-form-item
            v-if="formValue[question.input]"
            :ref="(el) => (fileInputRefs[question.fileInput].value = el)"
            :path="question.fileInput"
          >
            <!-- :on-success="handleUploadSuccess"
          :on-change="(data) => handleFieldTouch('certificateFile', data)" -->
            <n-upload
              v-model:file-list="formValue[question.fileInput]"
              :custom-request="(options) => handleCustomRequest(question.fileInput, options)"
              :on-remove="(data) => handleFieldRemove(question.fileInput, data)"
              :on-change="(data) => handleFieldTouch(question.fileInput, data)"
              :accept="acceptedFormats"
              :data="{ document_type: question.documentType }"
              :max="5"
              directory-dnd
            >
              <n-upload-dragger>
                <div style="margin-bottom: 12px">
                  <n-icon
                    size="28"
                    :depth="3"
                  >
                    <ArchiveIcon />
                  </n-icon>
                </div>
                <n-text style="font-size: 16px">Drop a file here</n-text>
                <n-p
                  depth="3"
                  style="margin: 8px 0 0 0"
                >
                  Strictly prohibit from uploading sensitive information. For example, your bank
                  card PIN or your credit card expiry date. You can upload files in the following
                  formats: .pdf, .png, .jpg, .jpeg with a size not exceeding 30 MB.
                </n-p>
              </n-upload-dragger>
            </n-upload>
          </n-form-item>
        </div>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <n-button
          :disabled="isFormInvalid || isLoading"
          :loading="isLoading"
          class="w-[100%] border rounded-[12px] hnwi-questionnaire__button"
          size="large"
          type="success"
          @click="sendEvent"
        >
          Send
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NButton, NUpload, NUploadDragger, NText, NP, NIcon } from 'naive-ui'
  import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
  import { ref, computed, nextTick } from 'vue'
  import useModals from '@/components/modal/modal'
  import TToggle from '../../components/ui/TToggle.vue'

  const props = defineProps({
    submitCallback: {
      type: Function,
      default: null,
    },
  })
  const formRef = ref(null)

  const content = computed(() => {
    return {
      title: 'HNWI Questionnaire',
      description: 'Please answer the questions to upgrade your status',
    }
  })
  const MAX_FILE_SIZE = 30 * 1024 * 1024
  const isLoading = ref(false)

  const formValue = ref({
    assetsValue: null,
    workedInFinance: null,
    professionalCertificate: null,
    annualIncome: null,
    assetsValueFile: [],
    workedInFinanceFile: [],
    professionalCertificateFile: [],
    annualIncomeFile: [],
  })

  const fileLists = ref({
    assetsValueFile: [],
    workedInFinanceFile: [],
    professionalCertificateFile: [],
    annualIncomeFile: [],
  })

  const fileInputRefs = {
    assetsValueFile: ref(null),
    workedInFinanceFile: ref(null),
    professionalCertificateFile: ref(null),
    annualIncomeFile: ref(null),
  }

  const acceptedFormats = '.pdf,.png,.jpg,.jpeg'

  const questions = computed(() => {
    return [
      {
        type: 'toggle',
        label:
          'Do you have assets with a net value of at least SAR 3,000,000 (three million Saudi riyals)?',
        input: 'assetsValue',
        fileInput: 'assetsValueFile',
        documentType: 'ASSETS_VALUE',
      },
      {
        type: 'toggle',
        label:
          'Are you currently working or have worked for at least three years in the financial sector in a position related to finance or investment?',
        input: 'workedInFinance',
        fileInput: 'workedInFinanceFile',
        documentType: 'WORKED_IN_FINANCE',
      },
      {
        type: 'toggle',
        label:
          'Do you have a professional certificate in finance or investment approved by an internationally recognized establishment?',
        input: 'professionalCertificate',
        fileInput: 'professionalCertificateFile',
        documentType: 'PROFESSIONAL_CERTIFICATE',
      },
      {
        type: 'toggle',
        label:
          'Do you have an annual income of at least SAR 600,000 (six hundred thousand Saudi riyals) in the past two years?',
        input: 'annualIncome',
        fileInput: 'annualIncomeFile',
        documentType: 'ANNUAL_INCOME',
      },
    ]
  })

  const toggleRule = {
    required: true,
    type: 'boolean',
    message: 'This field is required',
    trigger: ['blur'],
  }

  // if some of values from formValue have been selected as true then file input is required
  const getFileRule = (fieldName) => {
    return {
      required: true,
      validator: (rule, value) => {
        if (formValue.value[fieldName]) {
          if (!value || value.length === 0) {
            return new Error('This field is required')
          }

          for (const file of value) {
            if (file.file.size > MAX_FILE_SIZE) {
              return new Error('Max file size is 30MB')
            }
          }
        }
        return true
      },
      trigger: ['change', 'input'],
    }
  }

  const rules = {
    assetsValue: [toggleRule],
    workedInFinance: [toggleRule],
    professionalCertificate: [toggleRule],
    annualIncome: [toggleRule],
    assetsValueFile: [getFileRule('assetsValue')],
    workedInFinanceFile: [getFileRule('workedInFinance')],
    professionalCertificateFile: [getFileRule('professionalCertificate')],
    annualIncomeFile: [getFileRule('annualIncome')],
  }

  const truncateFileName = (fileName) => {
    const maxLength = 80 // Максимальная длина имени
    if (fileName.length <= maxLength) return fileName

    const baseName = fileName.slice(0, 20) // -3 для "..."
    const extension = fileName.slice(-6)

    return `${baseName}...${extension}`
  }

  const handleFieldTouch = (field, data) => {
    fileLists.value[field] = data.fileList.map((file) => {
      file.name = truncateFileName(file.name)
      return file
    })

    nextTick(() => {
      fileInputRefs[field].value.validate()
    })
  }

  const handleCustomRequest = (fieldName, options) => {
    const actualFile = options.file.file || options.file

    if (!(actualFile instanceof File)) {
      if (typeof options.onError === 'function') {
        options.onError('Provided data is not a valid file')
      }

      return
    }

    // Проверка размера файла
    if (actualFile.size > MAX_FILE_SIZE) {
      options.onError('File size must be less than 30MB')

      return
    }
  }

  const handleFieldRemove = (field, data) => {
    fileLists.value[field] = null
  }

  const isFormInvalid = computed(() => {
    return Object.values(formValue.value).some((value) => value === null || value === '')
  })

  const sendEvent = () => {
    formRef.value.validate((errors) => {
      if (!errors) {
        isLoading.value = true

        props
          ?.submitCallback(formValue.value)
          .then(() => {
            useModals.close()
          })
          .catch(() => {
            isLoading.value = false
          })
      }
    })
  }
</script>

<style scoped>
  .hnwi-questionnaire__container {
    display: flex;
    flex-direction: column;
    padding: 48px;
    width: 100%;
    gap: 12px;
  }

  .hnwi-questionnaire__questions {
    display: flex;
    gap: 12px;
  }

  .hnwi-questionnaire__item {
    padding: 16px;
    border-radius: 16px;
    background: #f3f8fd;
  }

  .hnwi-questionnaire__question {
    display: flex;
    justify-content: space-between;
    gap: 0 12px;
  }

  .hnwi-questionnaire__item :deep(.n-form-item-label) {
    display: inline;
  }

  .hnwi-questionnaire__item-button {
    width: 70px;
  }

  .hnwi-questionnaire__select {
    width: 240px;
    margin: 0;
  }

  .hnwi-questionnaire__button {
    margin-top: 12px;
  }
</style>
