<template>
  <div class="flex h-full flex-col otp-modal">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-800">
        {{ content.title }}
      </h1>
    </div>
    <p class="text-gray-600">
      {{ content.message }}
    </p>
    <br />
    <div class="flex items-center justify-between">
      <n-button
        class="w-[40%] border rounded-[12px]"
        size="large"
        @click="closeModal"
      >
        Cancel
      </n-button>

      <router-link
        v-if="isInsufficientBalance"
        v-slot="{ navigate }"
        :to="{ name: 'Wallet' }"
        custom
      >
        <n-button
          class="border rounded-[12px]"
          size="large"
          type="success"
          @click="topUpWallet(navigate)"
        >
          Top Up Wallet
        </n-button>
      </router-link>

      <n-button
        v-else
        class="w-[40%] border rounded-[12px]"
        size="large"
        type="success"
        @click="sendEvent"
      >
        Confirm
      </n-button>
    </div>
  </div>
</template>

<script setup>
  import { NButton } from 'naive-ui'
  import { ref, computed } from 'vue'
  import useModals from '@/components/modal/modal'

  const props = defineProps({
    wallet: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    confirmCallback: {
      type: Function,
      required: true,
    },
  })

  const isInsufficientBalance = computed(
    () => Number(props.data.amount_due) > Number(props.wallet.balance)
  )

  const content = computed(() => {
    if (isInsufficientBalance.value) {
      return {
        title: 'Insufficient Balance',
        message: `You have insufficient balance to proceed with the payment. Please top up your wallet to proceed.`,
      }
    } else {
      return {
        title: 'Confirm Payment',
        message: `Are you sure you want to proceed with the payment?`,
      }
    }
  })

  const sendEvent = async () => {
    await props.confirmCallback()
    useModals.close()
  }

  const topUpWallet = (navigate) => {
    useModals.close()
    navigate()
  }

  const closeModal = () => {
    useModals.close()
  }
</script>

<style scoped>
  .otp-modal {
    padding: 48px;
    width: 400px;
  }
</style>
