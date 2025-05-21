<template>
  <div class="flex gap-4 p-5 m-5 bg-white rounded-md">
    <div class="w-1/3">
      <div class="text-3xl">History</div>
      <div>Full transaction history</div>

      <n-button type="warning">Withdrawal</n-button>
    </div>
    <div class="w-1/3">
      <div class="mb-4">Total balance</div>
      <div class="text-5xl p-5 rounded-lg bg-[#F3F5F8] text-[#3C437A] text-center">1000 $</div>
    </div>
    <div class="w-1/3">
      <div class="mb-4">Free balance</div>
      <div class="text-5xl p-5 rounded-lg bg-[#F3F5F8] text-[#3C437A] text-center">1000 $</div>
    </div>
  </div>
  <div class="p-5 m-5 bg-white rounded-md">
    <div class="text-3xl">Transaction History</div>
    <table class="w-full">
      <tbody>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Id</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Operation</th>
          <th class="text-left">Status</th>
        </tr>
        <tr
          v-for="transaction in transactions"
          :key="transaction.id"
          class="odd:bg-gray-100"
        >
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.id }}</td>
          <td>{{ formatCurrency(transaction.amount) }}</td>
          <td>{{ transaction.operation }}</td>
          <td>{{ transaction.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { NButton } from 'naive-ui'
  import { formatCurrency } from '@/utils/format'

  const transactions = ref([
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
    {
      date: '21.09.2024',
      id: 123,
      amount: 1000,
      operation: 'Fee',
      status: 'Success',
    },
  ])
</script>
