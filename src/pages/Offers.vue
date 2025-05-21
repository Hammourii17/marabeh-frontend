<template>
  <div class="p-5 m-5">
    <div class="flex flex-col gap-6">
      <template v-for="inv in data">
        <div
          v-if="
            inv.status !== 'DRAFT' ||
            mainStore.user.role_type === 'INSTITUTIONAL_GUARANTOR' ||
            mainStore.user.role_type === 'INDIVIDUAL_GUARANTOR'
          "
          :key="inv.id"
          class="rounded-lg flex bg-white py-[30px] px-[17px] items-center justify-between"
        >
          <div class="text-[#1E293B] text-[16px] font-bold w-[200px]">
            {{ inv.title }}
          </div>

          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
            <div class="text-[#477285] font-bold">
              Funding Amount:
              <span class="text-[#63A1A4]">{{ formatCurrency(inv.finance_amount) }} SAR</span>
            </div>
          </div>

          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
            <div class="text-[#477285] font-bold">
              Interest Rate:
              <span class="text-[#63A1A4]">{{ inv.profit_rate }} %</span>
            </div>
          </div>

          <!-- <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
            <div class="text-[#477285] font-bold">Installment Amount: <span class="text-[#63A1A4]">
                {{ inv.monthly_payment }} SAR</span></div>
          </div> -->

          <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
            <div class="text-[#477285] font-bold">
              Status:
              <span class="text-[#63A1A4]">{{ STATUS[inv.status] ?? inv.status }}</span>
            </div>
          </div>

          <router-link
            :to="getUrl(inv.id)"
            class="invest-btn"
            >View Details</router-link
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useMainStore } from '~/stores/main'
  import { STATUS } from '@/utils/status'
  import { formatCurrency } from '@/utils/format'

  const mainStore = useMainStore()
  const data = computed(() => mainStore.offers.results)

  onMounted(async () => {
    await mainStore.fetchOffers()
  })

  const getUrl = (id) => {
    return mainStore.user.role_type.includes('GUARANTOR') ? `/guarantees/${id}` : `/offers/${id}`
  }
</script>

<style>
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
</style>
