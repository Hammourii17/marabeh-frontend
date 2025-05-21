<template>
  <div class="p-5 m-5 bg-white rounded-md">
    <div class="text-3xl">Dashboard</div>
    <!-- <div class="w-[300px]">
      <TInput v-model="companyName" title="Company name" hint="text" />
      <br /><br />
      <TSelect v-model="selectedOption" title="Choose an option" :options="dropdownOptions" />
      {{ selectedOption }}
      <TToggle v-model="value" trueText="Yes" falseText="No" />
      {{ value }}
      <TCheckbox v-model="isChecked" label="I agree to the terms and conditions" />
      {{ isChecked }}
      <TNumbers v-model="digits" />
      {{ digits }}
    </div> -->

    <!-- <div class="flex gap-4 mb-4">
      <div class="rounded-lg bg-[#57607D] text-white px-4 py-9 w-1/2">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Wallet total balance</div>
      </div>
      <div class="rounded-lg bg-[#57607D] text-white px-4 py-9 w-1/2">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Total repaid</div>
      </div>
    </div>

    <div class="flex gap-4 mb-4">
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Debt crowdfunding</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Debt total raised due date</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Number of donation investments</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Number of donation offerings</div>
      </div>
    </div>

    <div class="flex gap-4 mb-4">
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Donation crowdfunding</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Donation total raised due date</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Number of equity offerings</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Equity crowdfunding</div>
      </div>
    </div>

    <div class="flex gap-4">
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Equity total raised due date</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Total paid dividends</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">1 500 000 $</div>
        <div class="text-gray-500">Number of debt offerings</div>
      </div>
      <div class="rounded-lg bg-[#F7F7FA]  px-4 py-9 w-1/4">
        <div class="text-2xl">0 $</div>
        <div class="text-gray-500">Remaining payments</div>
      </div>
    </div> -->
  </div>
  <!-- <TSteps v-model="currentStep" />
  <div>Выбранный шаг: {{ currentStep }}</div> -->
</template>
<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useMainStore } from '@/stores/main'
  import { storeToRefs } from 'pinia'
  import { useNotification } from 'naive-ui'

  const mainStore = useMainStore()
  const { user } = storeToRefs(mainStore)
  const router = useRouter()
  const route = useRoute()

  if (route.query?.welcome) {
    const notification = useNotification()

    notification.create({
      type: 'success',
      content: `Hello ${user.value.full_name}, welcome to the Platform!`,
      duration: 8000,
    })

    router.replace({
      query: {
        ...route.query,
        welcome: undefined,
      },
    })
  }
</script>
