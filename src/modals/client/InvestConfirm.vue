<template>
  <div class="flex h-full flex-col invest-modal">
    <template v-if="isInsufficientBalance">
      <div class="flex items-center justify-between mb-2">
        <h1 class="text-2xl font-bold text-gray-800">Insufficient Balance</h1>
      </div>
      <p class="text-gray-600">
        You have insufficient balance to proceed with the payment. Please top up your wallet to
        proceed.
      </p>

      <div class="flex items-center justify-between">
        <n-button
          class="w-[40%] border rounded-[12px]"
          size="large"
          @click="closeModal"
        >
          Cancel
        </n-button>

        <router-link
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
      </div>
    </template>

    <Agreement
      title="Invest agreement"
      type="invest"
      checkbox-text="I agree to the terms"
      button-text="Confirm"
      @accept="sendEvent"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import useModals from '@/components/modal/modal'
  import Agreement from '../../components/Agreement/Agreement.vue'

  const props = defineProps({
    wallet: {
      type: Object,
      required: true,
    },
    amount: {
      type: Object,
      required: true,
    },
    confirmCallback: {
      type: Function,
      required: true,
    },
  })

  const isInsufficientBalance = computed(() => Number(props.amount) > Number(props.wallet.balance))

  const sendEvent = async () => {
    await props.confirmCallback()
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
  .invest-modal {
    padding: 48px;
    width: 600px;
  }
</style>
