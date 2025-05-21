<template>
  <div class="flex gap-4 p-5 m-5 bg-white rounded-md">
    <div class="w-1/3">
      <div class="text-3xl">Wallet</div>
      <div>Your income to date</div>

      <label>
        Amount
        <br />
        <input
          v-model="amount"
          style="border: 1px solid #3c437a; border-radius: 5px; font-size: 16px; padding: 5px"
        />
      </label>
      <br />
      <br />
      <n-button
        type="warning"
        @click="topup"
      >
        Topup
      </n-button>
    </div>
    <div class="w-1/3">
      <div class="mb-4 font-bold">Wallet balance</div>
      <div class="text-5xl p-5 rounded-lg bg-[#F3F5F8] text-[#3C437A] text-center">
        {{ formatCurrency(balance.balance) }}
        {{ balance.currency }}
      </div>
    </div>
    <div class="w-1/3">
      <div class="mb-4 font-bold">Bank account</div>

      <div
        v-if="ibanList?.length > 0"
        class="mb-4"
      >
        <ul class="iban-list">
          <li
            v-for="(iban, index) in ibanList"
            :key="index"
            class="iban-list__item mb-1"
          >
            {{ index + 1 }}) {{ iban.iban }}
          </li>
        </ul>
      </div>
      <div
        v-else
        class="mb-4"
      >
        No bank accounts
      </div>

      <n-button
        type="primary"
        size="large"
        @click="showAddAccountModal"
      >
        Add account
      </n-button>

      <div class="mt-6">vIBAN: {{ balance.viban }}</div>
    </div>
  </div>
  <div class="p-5 m-5 bg-white rounded-md">
    <div class="text-3xl">Last transactions</div>
    <table
      v-if="transations?.length"
      class="w-full"
    >
      <tbody>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Id</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Operation</th>
          <th class="text-left">Status</th>
        </tr>
        <tr
          v-for="transaction in transations"
          :key="transaction.id"
          class="odd:bg-gray-100"
        >
          <td>{{ getDate(transaction.created_at) }}</td>
          <td>{{ transaction.id }}</td>
          <td>{{ formatCurrency(transaction.amount) }} SAR</td>
          <td>
            {{ operationsList[transaction.transaction_type] ?? transaction.transaction_type }}
          </td>
          <td>{{ transaction.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { NButton } from 'naive-ui'
  import { computed, onMounted, ref } from 'vue'
  import { useMainStore } from '~/stores/main'
  import { app } from '@/main'
  import AddAccount from '@/modals/client/AddAccount.vue'
  import useModals from '@/components/modal/modal'
  import { formatCurrency } from '@/utils/format'

  const mainStore = useMainStore()

  const balance = computed(() => mainStore.balance)
  const ibanList = computed(() => mainStore.ibanList)
  const amount = ref(0)
  const operationsList = {
    TOP_UP: 'Top up',
    WITHDRAWAL: 'Withdrawal',
    INVEST_FROM_ORGANIZATION: 'Invest from organization',
    INVEST_FROM_INDIVIDUAL: 'Invest from individual',
    INVEST_TO_CAMPAIGN: 'Invest to campaign',
    LOAN_FROM_CAMPAIGN: 'Loan from campaign',
    LOAN_TO_WALLET: 'Loan to wallet',
    PAYMENT_FROM_BORROWER: 'Payment from borrower',
    PAYMENT_TO_INVESTOR: 'Payment to investor',
    COMMISSION_FROM_CAMPAIGN: 'Commission from campaign',
    COMMISSION_TO_PLATFORM: 'Commission to platform',
    PAID_WITHOUT_PROFIT: 'Paid without profit',
    EARLY_PAYMENT_FROM_BORROWER: 'Early payment from borrower',
  }

  onMounted(async () => {
    await Promise.all([mainStore.getBallance(), mainStore.fetchIbanList()])
  })

  // TODO костыль на время демо
  const transations = computed(() => {
    const list = [...(balance.value?.transactions ?? [])] ?? []

    return list.sort((i, b) => b.id - i.id)
  })

  const topup = async () => {
    try {
      await app.config.globalProperties.$http.post(`finance/wallet/top-up/`, {
        amount: amount.value,
        viban: balance.value.viban,
      })
      amount.value = 0
      await mainStore.getBallance()
    } catch (e) {
      console.log(e)
    }
  }

  const showAddAccountModal = () => {
    useModals.show({
      a: AddAccount,
      c: {
        clickToClose: true,
      },
    })
  }

  const getDate = (d) => {
    return d ? new Date(d).toLocaleDateString() : '-'
  }
</script>
