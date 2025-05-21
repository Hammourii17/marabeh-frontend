<template>
  <div class="p-5 m-5 bg-white rounded-md">
    <div class="text-3xl">Logs</div>
    <table
      v-if="data?.length"
      class="w-full"
    >
      <tbody>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">User agent</th>
          <th class="text-left">Ip</th>
          <th class="text-left">Type</th>
        </tr>
        <tr
          v-for="item in data"
          :key="item.id"
          class="odd:bg-gray-100"
        >
          <td>{{ getDate(item.created_at) }}</td>
          <td>{{ item.user_agent }}</td>
          <td>{{ item.ip }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import moment from 'moment'
  import { useMainStore } from '~/stores/main'

  const mainStore = useMainStore()
  const getDate = (d) => {
    return d ? moment(d).format('DD.MM.YYYY') : '-'
  }
  onMounted(async () => {
    await Promise.all([mainStore.fetchLogs()])
  })

  const data = computed(() => mainStore?.logs)
</script>
