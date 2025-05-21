<template>
  <div class="p-8">
    <n-card class="mb-8">
      <div class="flex justify-between items-center">
        <div class="w-full">
          <h2 class="text-xl font-semibold mb-4">Repayment</h2>
          <div class="grid grid-cols-2 gap-5 w-full">
            <n-card class="p-6 text-center border-3 border-gray-500 border-dashed rounded-[20px]">
              <p class="text-gray-500 mb-2">Total Repaid</p>
              <p class="text-4xl font-bold bg-gray-100 rounded-[20px]">{{ totalRepaid }} $</p>
            </n-card>
            <n-card class="p-6 text-center border-3 border-gray-500 border-dashed rounded-[20px]">
              <p class="text-gray-500 mb-2">Remaining payments</p>
              <p class="text-4xl font-bold bg-gray-100 rounded-[20px]">{{ remainingPayments }} $</p>
            </n-card>
          </div>
        </div>
      </div>
    </n-card>

    <n-card class="table-card">
      <h3 class="text-lg font-semibold mb-4">List of repayments</h3>
      <div class="table-wrapper">
        <n-data-table
          v-if="paginatedData.length > 0"
          :max-height="150"
          :columns="columns"
          :data="paginatedData"
          class="data-table"
          style="height: 100%"
        />
        <div v-else>
          <p>No data available</p>
        </div>
      </div>

      <div class="pagination-wrapper">
        <n-pagination
          v-model:page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-count="pageCount"
          show-size-picker
          :page-sizes="[3, 5, 7, 10]"
          style="justify-content: center; display: flex"
        />
      </div>
    </n-card>
  </div>
</template>

<script>
  import { ref, computed, reactive } from 'vue'
  import { NCard, NPagination, NDataTable } from 'naive-ui'

  export default {
    name: 'Repayment',
    components: {
      NCard,
      NPagination,
      NDataTable,
    },
    setup() {
      const totalRepaid = ref(1345534.0)
      const remainingPayments = ref(421053.0)

      const repaymentData = ref([
        {
          name: 'Test campaign 1',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 2',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 3',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 4',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 5',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 6',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 7',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 8',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 9',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
        {
          name: 'Test campaign 10',
          fundedAmount: '45 000.00 USD',
          pendingPayments: 21,
          date: '10 October 2024',
          remainingAmount: '55 000.00 USD',
        },
      ])

      const pagination = reactive({
        page: 1,
        pageSize: 5,
        showSizePicker: true,
        pageSizes: [3, 5, 7, 10],
      })

      const pageCount = computed(() => {
        return Math.ceil(repaymentData.value.length / pagination.pageSize)
      })

      const paginatedData = computed(() => {
        const start = (pagination.page - 1) * pagination.pageSize
        const end = start + pagination.pageSize
        return repaymentData.value.slice(start, end)
      })

      const columns = [
        { title: 'Offering name', key: 'name' },
        { title: 'Funded amount', key: 'fundedAmount' },
        { title: 'Pending payments', key: 'pendingPayments' },
        { title: 'Date', key: 'date' },
        { title: 'Remaining amount', key: 'remainingAmount' },
      ]

      return {
        totalRepaid,
        remainingPayments,
        pagination,
        pageCount,
        paginatedData,
        columns,
      }
    },
  }
</script>

<style scoped>
  .table-card {
    max-height: calc(100vh - 200px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .table-wrapper {
    flex: 1;
    overflow-y: auto;
  }

  .data-table {
    height: 100%;
  }

  .pagination-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
