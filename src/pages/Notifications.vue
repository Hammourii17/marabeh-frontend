<template>
  <div class="p-5 m-5">
    <div class="flex flex-col gap-6">
      <div
        v-for="inv in data"
        :key="inv.id"
        class="rounded-lg flex bg-white py-[30px] px-[17px] items-center justify-between"
      >
        <div class="flex gap-2 text-[#1E293B] text-[16px] font-bold w-[23%]">
          <Notifications
            v-if="inv.status === 'SIGNING_AGREEMENT_OTP'"
            width="20"
            color="#5AC175"
          />

          {{ inv.title }}
        </div>

        <div
          class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 w-[23%]"
        >
          <div class="text-[#477285] font-bold">
            Type:
            <span class="text-[#63A1A4]">{{ inv.type }}</span>
          </div>
        </div>

        <div
          class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 w-[23%]"
        >
          <div class="text-[#477285] font-bold">
            Email:
            <span class="text-[#63A1A4]">{{ inv.email }}</span>
          </div>
        </div>

        <div
          class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 w-[23%]"
        >
          <div class="text-[#477285] font-bold">
            Created:
            <span class="text-[#63A1A4]">{{ getDate(inv.created_at) }}</span>
          </div>
        </div>

        <!-- <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
          <div class="text-[#477285] font-bold">
            Return to Investors:
            <span class="text-[#63A1A4]">{{ inv.profit_rate }} %</span>
          </div>
        </div> -->

        <!-- <router-link
          :to="`/loans/${inv.id}`"
          class="invest-btn"
          >View Details</router-link
        > -->
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
  const mainStore = useMainStore()
  const router = useRouter()
  const route = useRoute()
  const data = computed(() => mainStore.loans.results)
  const page = ref(Number(route.query.page) || 1)
  const pageCount = computed(() => Math.ceil(mainStore.loans.count / 8))

  onMounted(async () => {
    await mainStore.fetchNotifications(page.value)
  })

  const updatePage = (currentPage) => {
    page.value = currentPage
    mainStore.fetchNotifications(page.value)
    router.push({ query: { page: currentPage > 1 ? currentPage : undefined } })
  }

  const getDate = (d) => {
    return d ? new Date(d).toLocaleDateString() : '-'
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
