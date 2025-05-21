<template>
  <div class="p-5 m-5">
    <div class="grid gap-4 md:gap-5">
      <!-- Card Item -->
      <div
        v-for="inv in data"
        :key="inv.id"
        class="bg-white rounded-lg shadow-sm p-4 md:p-5"
      >
        <div class="flex justify-between items-start mb-4 gap-3">
          <h3 class="flex gap-2 text-[#1E293B] font-bold truncate text-lg">
            <Notifications
              v-if="inv.status === 'SIGNING_AGREEMENT_OTP'"
              width="20"
              color="#5AC175"
            />
            {{ inv.title }}
          </h3>
          <router-link
            :to="`/loans/${inv.id}`"
            class="invest-btn"
          >
            View Details
          </router-link>
        </div>

        <div class="flex-1 flex gap-2 overflow-x-auto">
          <div class="data-item">
            <span class="data-label">Status</span>
            <span class="data-value">{{ STATUS[inv.status] ?? inv.status }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Finance Amount</span>
            <span class="data-value">{{ formatCurrency(inv.finance_amount) }} SAR</span>
          </div>
          <div class="data-item">
            <span class="data-label">Collateral</span>
            <span class="data-value">{{ inv.collateral_coverage_percentage ?? 0 }}%</span>
          </div>
          <div class="data-item">
            <span class="data-label">Tenure</span>
            <span class="data-value">{{ inv.tenure }} {{ inv.period }}</span>
          </div>
          <div class="data-item">
            <span class="data-label">Return</span>
            <span class="data-value">{{ inv.profit_rate }} %</span>
          </div>
        </div>
      </div>
    </div>

    <NPagination
      v-if="data"
      :default-page="page"
      :page="page"
      :page-size="8"
      :page-count="pageCount"
      :on-update:page="updatePage"
      size="large"
      class="flex justify-center mt-10"
    />
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { NPagination } from 'naive-ui'
  import { useMainStore } from '@/stores/main'
  import { Notifications } from '@vicons/ionicons5'
  import { STATUS } from '@/utils/status'
  import { formatCurrency } from '@/utils/format'
  const mainStore = useMainStore()
  const router = useRouter()
  const route = useRoute()
  const data = computed(() => mainStore.loans.results)
  const page = ref(Number(route.query.page) || 1)
  const pageCount = computed(() => Math.ceil(mainStore.loans.count / 8))

  onMounted(async () => {
    await mainStore.fetchLoans(page.value)
  })

  const updatePage = (currentPage) => {
    page.value = currentPage
    mainStore.fetchLoans(page.value)
    router.push({ query: { page: currentPage > 1 ? currentPage : undefined } })
  }
</script>

<style lang="scss">
  .invest-btn {
    padding: 12px;
    /* background: linear-gradient(90deg, #53bef1 0%, #34a6e8 52.5%, #127dd0 100%); */
    background: #80ba7a;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0px 2px 10px 0px #53bef180;
    box-shadow: 0px 2px 10px 0px #50c5f880;
  }

  .data-item {
    @apply bg-[#F3F8FD] rounded-lg p-3 flex flex-col;
    flex: 1 1 auto;

    &:first-child {
      max-width: 350px;
    }
  }

  .data-label {
    @apply text-[#477285] text-xs font-medium mb-1 truncate;
  }

  .data-value {
    @apply text-[#63A1A4] font-semibold;
  }
</style>
