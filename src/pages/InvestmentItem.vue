<template>
  <div class="flex gap-4 p-[33px] bg-[#EEF4FB]">
    <template v-if="data">
      <div class="w-1/4">
        <div class="rounded-[16px] bg-white px-[16px] py-[23px] mb-[26px] shadow-sm">
          <div class="block-title text-center">
            {{ data.title }}
          </div>
          <div class="rounded-[16px] overflow-hidden mb-4">
            <img src="@/assets/img/image.png" />
          </div>

          <div class="block-subtitle2 text-center">Loan info:</div>

          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4">
            <div class="text-[#477285] font-bold">
              Tenure:
              <span class="text-[#63A1A4]">{{ data.tenure }} {{ data.period }}</span>
            </div>
          </div>
          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4">
            <div class="text-[#477285] font-bold">
              Installment Amount:
              <span class="text-[#63A1A4]">{{ formatCurrency(data.installment_amount) }} SAR</span>
            </div>
          </div>
          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4">
            <div class="text-[#477285] font-bold">
              Interest Rate:
              <span class="text-[#63A1A4]">{{ data.profit_rate }} %</span>
            </div>
          </div>
          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4">
            <div class="text-[#477285] font-bold">
              Effective Rate:
              <span class="text-[#63A1A4]">{{ data.effective_rate }} %</span>
            </div>
          </div>
          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4">
            <div class="text-[#477285] font-bold">
              Finance amount:
              <span class="text-[#63A1A4]">{{ formatCurrency(data.finance_amount) }} SAR</span>
            </div>
          </div>
          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
            <div class="text-[#477285] font-bold">
              Status:
              <span class="text-[#63A1A4]">{{ STATUS[data.status] ?? data.status }}</span>
            </div>
          </div>
        </div>
        <div class="w-3/4 rounded-[16px] bg-white px-[16px] py-[23px] shadow-sm w-full">
          <div class="block-subtitle text-center">Documents</div>
          <div
            v-if="docs?.length"
            class="flex flex-col gap-3"
          >
            <span
              v-for="doc in docs"
              :key="doc.id"
              :href="doc.file"
              class="flex items-center gap-2 cursor-pointer"
              @click="handleDownload(doc)"
            >
              <Document width="20" />
              <span>{{ doc.document_type }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="w-3/4 rounded-[16px] bg-white px-[16px] py-[23px] shadow-sm">
        <div class="block-subtitle">Payment schedule</div>
        <div class="table">
          <div class="table-header">
            <div class="table-cell">Type</div>
            <div class="table-cell">Date</div>
            <div class="table-cell">Amount</div>
            <div class="table-cell">Principal</div>
            <div class="table-cell">Profit</div>
            <div class="table-cell">Status</div>
          </div>
          <div
            v-for="sched in schedule"
            :key="sched.id"
            class="table-row"
          >
            <div class="table-cell">Payment</div>
            <div class="table-cell">
              {{ getDate(sched.investor_payment_date) }}
            </div>
            <div class="table-cell amount">{{ formatCurrency(sched.amount_due) }} SAR</div>
            <div class="table-cell">{{ formatCurrency(sched?.principal ?? 0) }} SAR</div>
            <div class="table-cell">{{ formatCurrency(sched?.profit ?? 0) }} SAR</div>
            <div
              :class="{ 'status--paid': sched.status === 'PAID' }"
              class="table-cell status"
            >
              <span class="status-badge">{{ STATUS[sched.status] ?? sched.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import moment from 'moment'
  import { STATUS } from '@/utils/status'
  import { useMainStore } from '@/stores/main'
  import { Document } from '@vicons/ionicons5'
  import { formatCurrency } from '@/utils/format'

  const route = useRoute()
  const mainStore = useMainStore()
  const loanId = route.params.id

  const fetchData = async () => {
    await Promise.all([mainStore.fetchLoanDetails(loanId), mainStore.fetchLoanDocs(loanId)])
  }

  const data = computed(() => mainStore.getLoanById(loanId))
  const docs = computed(() => mainStore.loanDocs)

  const getDate = (d) => {
    return moment(d).format('DD.MM.YYYY')
  }

  onMounted(async () => {
    await fetchData()
  })

  const schedule = computed(() => {
    const list = data.value?.payment_schedules ?? []

    return list.sort((a, b) => {
      const dateA = new Date(a.investor_payment_date.split('.').reverse().join('-'))
      const dateB = new Date(b.investor_payment_date.split('.').reverse().join('-'))
      return dateA - dateB // Сравнение дат
    })
  })

  const handleDownload = async (doc) => {
    try {
      const response = await app.config.globalProperties.$http.get(`document/${doc.id}/download/`, {
        responseType: 'blob',
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url

      let fileName = 'document'

      const contentDisposition = response.headers['content-disposition']
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
          /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/i
        )
        if (fileNameMatch?.[1]) {
          fileName = fileNameMatch[1]
        }
      }

      if (!fileName.includes('.')) {
        const getExtensionFromUrl = (url) => {
          try {
            const cleanUrl = url.split('?')[0].split('#')[0]
            return cleanUrl.substring(cleanUrl.lastIndexOf('.') + 1).toLowerCase()
          } catch {
            return null
          }
        }

        const extension = doc.file ? getExtensionFromUrl(doc.file) : null
        if (extension) {
          fileName = `${fileName}.${extension}`
        }
      }

      if (doc.document_type) {
        fileName = `${doc.document_type.toLowerCase()}_${fileName}`
      }

      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 100)
    } catch (error) {
      console.error('Download error:', error)
    }
  }
</script>

<style scoped>
  .card-btn {
    border: 1px solid #1e8ad8;
    color: #1e8ad8;
    border-radius: 12px;
    font-size: 14px;
    padding: 5px;
    text-align: center;
    margin-bottom: 8px;
  }

  .card-btn.yellow {
    color: #ffb22f;
    border: 1px solid #ffb22f;
  }

  .card-btn.green {
    color: #0dc65e;
    border: 1px solid #0dc65e;
  }

  .card-btn.light {
    color: #53bef1;
    border: 1px solid #53bef1;
  }

  .table {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Расстояние между строками */
  }

  .table-header,
  .table-row {
    display: flex;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    gap: 30px;
  }

  .table-header {
    background-color: #f3f4f6;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10px;
  }

  .table-row {
    background-color: #f9fbfc;
    margin-bottom: 10px;
  }

  .table-cell {
    flex: 1;
    text-align: left;
  }

  .table-cell.amount {
    color: #10b981;
    font-weight: bold;
  }

  .table-cell.status {
    flex: 0.8;
  }

  .status {
    color: #ffffff;
    background: linear-gradient(90deg, #a6def5 0%, #50c5f8 100%);
    padding: 5px 10px;
    border-radius: 20px;
    text-align: center;
  }

  .status--paid {
    background: linear-gradient(90deg, #0bb9ab 0%, #0cc17a 52.5%, #0dc94c 100%);
  }

  .pay-button {
    color: #ffffff;
    background: linear-gradient(90deg, #0bb9ab 0%, #0cc17a 52.5%, #0dc94c 100%);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    font-weight: bold;
    min-width: 150px;
  }

  .pay-button:hover {
    opacity: 0.9;
  }

  .amount {
    color: #10b981;
    font-weight: bold;
  }
</style>
