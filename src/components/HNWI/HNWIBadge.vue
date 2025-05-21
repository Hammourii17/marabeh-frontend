<template>
  <div class="hnwi-badge">
    {{ currentStatus }}

    <NButton
      v-if="currentStatus === 'HNWI status not confirmed'"
      type="success"
      secondary
      @click="upgradeStatus"
    >
      Upgrade status
    </NButton>
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useMainStore } from '@/stores/main'
  import { computed } from 'vue'
  import { NButton } from 'naive-ui'
  import useModals from '@/components/modal/modal'
  import HNWIQuestionnaire from '@/components/HNWI/HNWIQuestionnaire.vue'

  const emit = defineEmits(['refresh'])
  const mainStore = useMainStore()
  const { user } = storeToRefs(mainStore)

  const currentStatus = computed(() => {
    if (!user.value.status || user.value.status === 'NEW') {
      return 'HNWI status not confirmed'
    }

    if (user.value.status === 'HNWI_RM_REVIEW') {
      return 'HNWI status under review'
    }

    return 'HNWI status confirmed'
  })

  const upgradeStatus = () => {
    const modal = useModals.show({
      a: HNWIQuestionnaire,
      b: {
        submitCallback: async (data) => {
          return new Promise(async (resolve, reject) => {
            try {
              const fileObj = Object.entries(data).reduce((acc, [key, value]) => {
                if (key.includes('File')) {
                  acc[key] = value
                }
                return acc
              }, {})

              const filedData = Object.entries(data).reduce((acc, [key, value]) => {
                if (!key.includes('File')) {
                  acc[key] = value
                }
                return acc
              }, {})

              const fileUploadRequests = []

              Object.entries(fileObj).forEach(([key, value]) => {
                if (value.length) {
                  value.forEach((file) => {
                    fileUploadRequests.push(uploadFile(file, key))
                  })
                }
              })

              await Promise.all(fileUploadRequests).then(async () => {
                await mainStore.updateInvestorStatus(filedData)
                resolve()
                emit('refresh')
              })
            } catch (error) {
              console.error(error)
              reject(error)
            }
          })
        },
      },
      c: { clickToClose: true },
    })
  }

  const uploadFile = (file) => {
    const formData = new FormData()
    formData.append('file', file.file)
    formData.append('document_type', 'HNWI_FILES')

    return mainStore.uploadHNWIFile(formData)
  }
</script>
