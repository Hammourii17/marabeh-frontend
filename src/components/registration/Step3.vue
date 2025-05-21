<template>
  <div class="upload-container">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Upload Docs</h1>
    </div>
    <p class="text-gray-600 mb-6">
      The required documents for upload are needed by us to verify the data you entered in the
      previous stages of registration on our platform.
    </p>
    <p class="text-gray-600 mb-6">
      Upload the documents that are required to verify your company. Supported document formats -
      JPG, PNG, PDF.
    </p>
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col flex-1"
    >
      <div class="upload-wrapper">
        <n-form-item
          :ref="validateRefs.certificateFile"
          label="Company Registration Certificate (CR):"
          first
          path="certificateFile"
          class="register-step-3-upload"
        >
          <n-upload
            v-model:file-list="fileLists.certificateFile"
            :custom-request="handleCustomRequest"
            :accept="acceptedFormats"
            :data="{ document_type: 'COMPANY_REGISTRATION_CERTIFICATE' }"
            :on-success="handleUploadSuccess"
            :on-change="(data) => handleFieldTouch('certificateFile', data)"
            :on-remove="(data) => handleFieldRemove('certificateFile', data)"
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
                Strictly prohibit from uploading sensitive information. For example, your bank card
                PIN or your credit card expiry date. You can upload files in the following formats:
                .pdf, .png, .jpg, .jpeg with a size not exceeding 30 MB.
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>

        <n-form-item
          v-if="!isSolo"
          :ref="validateRefs.aoaFile"
          label="Articles of association (AoA):"
          first
          path="aoaFile"
          class="register-step-3-upload"
        >
          <n-upload
            v-model:file-list="fileLists.aoaFile"
            :custom-request="handleCustomRequest"
            :accept="acceptedFormats"
            :data="{ document_type: 'ARTICLES_OF_ASSOCIATION' }"
            :on-success="handleUploadSuccess"
            :on-change="(data) => handleFieldTouch('aoaFile', data)"
            :on-remove="(data) => handleFieldRemove('aoaFile', data)"
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
                Strictly prohibit from uploading sensitive information. For example, your bank card
                PIN or your credit card expiry date. You can upload files in the following formats:
                .pdf, .png, .jpg, .jpeg with a size not exceeding 30 MB.
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>

        <n-form-item
          :ref="validateRefs.otherFile"
          label="Other files:"
          first
          path="otherFiles"
          class="register-step-3-upload"
        >
          <n-upload
            v-model:file-list="fileLists.otherFiles"
            :custom-request="handleCustomRequest"
            :accept="acceptedFormats"
            :data="{ document_type: 'OTHER_ORGANIZATION_FILES' }"
            :on-success="handleUploadSuccess"
            :on-change="(data) => handleFieldTouch('otherFiles', data)"
            :on-remove="(data) => handleFieldRemove('otherFiles', data)"
            :max="5"
            directory-dnd
            multiple
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
              <n-text style="font-size: 16px">drop a file here</n-text>
              <n-p
                depth="3"
                style="margin: 8px 0 0 0"
              >
                Strictly prohibit from uploading sensitive information. For example, your bank card
                PIN or your credit card expiry date. You can upload files in the following formats:
                .pdf, .png, .jpg, .jpeg with a size not exceeding 30 MB.
              </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <n-button
          text
          @click="handlePreviousStep"
          >← Previous Step</n-button
        >
        <n-button
          class="w-[50%] border rounded-[12px]"
          size="large"
          type="success"
          @click="handleSubmit"
        >
          Next Step →
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import {
    NForm,
    NFormItem,
    NButton,
    NUpload,
    NUploadDragger,
    NText,
    NP,
    NIcon,
    useMessage,
  } from 'naive-ui'
  import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
  import localConfig from '../../local_config'
  import { storeToRefs } from 'pinia'
  import { useRegistrationStore } from '@/stores/registration'

  const message = useMessage()
  const apiBaseURL = localConfig.api.baseURL
  const registrationStore = useRegistrationStore()
  const { formData, createdCompanyId } = storeToRefs(registrationStore)

  const props = defineProps({
    isSolo: {
      type: Boolean,
      default: null,
    },
  })

  const formRef = ref(null)
  const formValue = ref({
    certificateFile: [],
    aoaFile: [],
    otherFiles: [],
  })

  const touchedFields = ref({
    certificateFile: false,
    aoaFile: false,
    otherFiles: false,
  })

  const fileLists = ref({
    certificateFile: [],
    aoaFile: [],
    otherFiles: [],
  })

  const validateRefs = {
    certificateFile: ref(null),
    aoaFile: ref(null),
    otherFiles: ref(null),
  }

  const token = ref(localStorage.getItem('token') || '')
  const isFileUploading = ref(false)
  const acceptedFormats = '.pdf,.png,.jpg,.jpeg'
  const MAX_FILE_SIZE = 30 * 1024 * 1024

  // Валидатор пока не работает т.к. из-за реактивности не вызывается валидация формы
  const fileSizeValidator = (rule, value) => {
    if (!value) {
      return Promise.resolve()
    }
    if (value.some((file) => file.size > MAX_FILE_SIZE)) {
      return Promise.reject(new Error('Max file size is 30MB'))
    }

    return Promise.resolve()
  }

  const rules = {
    certificateFile: [
      {
        required: true,
        message: 'Certificate file is required',
        trigger: ['blur', 'change'],
        validator(rule, value) {
          return value && value.length > 0
        },
      },
      {
        message: 'File size must be less than 30MB',
        validator: fileSizeValidator,
        trigger: ['blur', 'change', 'before-upload'],
      },
    ],
    aoaFile: [
      {
        required: !props.isSolo,
        message: 'Articles of association file is required',
        trigger: ['blur', 'change'],
        validator(rule, value) {
          return props.isSolo || (value && value.length > 0)
        },
      },
      {
        message: 'File size must be less than 30MB',
        validator: fileSizeValidator,
        trigger: ['blur', 'change', 'before-upload'],
      },
    ],
    otherFiles: [
      {
        required: false,
        message: 'Other files are optional',
        trigger: ['blur', 'change'],
        validator(rule, value) {
          return true
        },
      },
      {
        message: 'File size must be less than 30MB',
        validator: fileSizeValidator,
        trigger: ['blur', 'change', 'before-upload'],
      },
    ],
  }

  // Функция для сокращения длинных названий файлов
  const truncateFileName = (fileName) => {
    const maxLength = 60 // Максимальная длина имени
    if (fileName.length <= maxLength) return fileName

    const baseName = fileName.slice(0, 6) // -3 для "..."
    const extension = fileName.slice(-6)

    return `${baseName}...${extension}`
  }

  const handleFieldTouch = (field, data) => {
    fileLists.value[field] = data.fileList.map((file) => {
      file.name = truncateFileName(file.name)
      return file
    })

    touchedFields.value[field] = true
  }

  const handleFieldRemove = (field, data) => {
    formValue.value[field] = fileLists.value[field].filter((file) => file.name !== data.file.name)
    validateRefs[field].value.validate()
  }

  // TODO переделать метод т.к. из-за костыля для сокращенных названий
  // некорректно работает валидация, он вызывается только при изменении formValue и удачном заливе файла
  // необходимо пересмотреть всю работу с файлами т.к. она не совсем корректна
  const handleCustomRequest = (options) => {
    const authToken = localStorage.getItem('token') || ''
    const actualFile = options.file.file || options.file

    if (!(actualFile instanceof File)) {
      if (typeof options.onError === 'function') {
        options.onError('Provided data is not a valid file')
      }

      return
    }

    // Проверка размера файла
    if (actualFile.size > MAX_FILE_SIZE) {
      options.onError('File size must be less than 36MB')
      message.error('File size must be less than 36MB')

      return
    }

    const formData = new FormData()
    formData.append('file', actualFile)
    formData.append('document_type', options.data.document_type)

    isFileUploading.value = true

    fetch(`${apiBaseURL}organization/organizations/${createdCompanyId.value}/docs/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken.trim()}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errData) => {
            throw errData
          })
        }
        return response.json()
      })
      .then((data) => {
        handleUploadSuccess(data, actualFile, options.data.document_type)
        isFileUploading.value = false
      })
      .catch(() => {
        isFileUploading.value = false
      })
  }

  const handleUploadSuccess = (response, file, documentType) => {
    file.url = response.url

    const field =
      documentType === 'COMPANY_REGISTRATION_CERTIFICATE'
        ? 'certificateFile'
        : documentType === 'ARTICLES_OF_ASSOCIATION'
          ? 'aoaFile'
          : 'otherFiles'

    formValue.value[field] = [...formValue.value[field], file]

    validateRefs[field].value.validate()
    touchedFields.value[field] = true
  }

  const emit = defineEmits(['nextStep', 'nextStep2', 'save-data', 'previousStep'])

  const dataToSend = ref([])
  const dataToSend2 = ref({})

  // TODO под большим вопросом история с файлами
  const handleSubmit = () => {
    validateFields()

    formRef.value.validate((errors) => {
      if (!errors) {
        const dataToSend = {
          certificateFile: formValue.value.certificateFile,
          aoaFile: props.isSolo ? [] : formValue.value.aoaFile,
        }

        emit('nextStep', dataToSend)
        emit('nextStep2', dataToSend)
      }
    })
  }

  const validateFields = () => {
    if (formRef.value) {
      dataToSend.value = []
      dataToSend2.value = {}

      formRef.value.validate((valid) => {
        if (valid) {
          dataToSend2.value['certificateFile'] = formValue.value.certificateFile
          dataToSend2.value['aoaFile'] = formValue.value.aoaFile

          formValue.value.certificateFile.forEach((file) => {
            dataToSend.value.push({
              document_type: 'COMPANY_REGISTRATION_CERTIFICATE',
              file: file,
              description: 'Company registration certificate',
            })
          })

          formValue.value.aoaFile.forEach((file) => {
            dataToSend.value.push({
              document_type: 'ARTICLES_OF_ASSOCIATION',
              file: file,
              description: 'Articles of association file',
            })
          })

          formValue.value.otherFiles.forEach((file) => {
            dataToSend.value.push({
              document_type: 'OTHER_ORGANIZATION_FILES',
              file: file,
              description: 'Other files',
            })
          })

          emit('nextStep', dataToSend.value)

          if (typeof callback === 'function') {
            callback()
          }
        }
      })
    }
  }

  const handlePreviousStep = () => {
    emit('previousStep')
  }

  watch(
    () => formData.value,
    () => {
      const data = formData.value?.step3

      if (data) {
        ;(fileLists.value = data.fileLists),
          (formValue.value = {
            ...(data ? data.formValue : formValue.value.formValue),
          })
      }
    },
    { immediate: true }
  )

  watch(
    () => formValue,
    () => {
      const formValueObject = {}

      Object.keys(formValue.value).forEach((key) => {
        formValueObject[key] = formValue.value[key].map((file) => {
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            url: file.url,
          }
        })
      })
      emit('save-data', {
        fileLists: fileLists.value,
        formValue: formValueObject,
      })
    },
    { deep: true }
  )
</script>

<style scoped>
  .upload-container {
    padding: 64px;
  }

  .upload-wrapper {
    display: flex;
    gap: 32px;
    align-items: flex-start;
  }
</style>
