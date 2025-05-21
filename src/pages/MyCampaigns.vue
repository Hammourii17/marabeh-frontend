<template>
  <div class="p-5 m-5 rounded-md">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardItem
        v-for="inv in invs.body"
        :key="inv.id"
        :data="inv"
        @view-details="handleViewDetails(inv.id)"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useMainStore } from '~/stores/main'
  import CardItem from '../components/pages/marketplace/CardItem.vue'
  import { useRouter, useRoute } from 'vue-router'
  const mainStore = useMainStore()
  const router = useRouter()
  const route = useRoute()
  const invs = ref({})
  onMounted(async () => {
    invs.value = await mainStore.myCampaigns()
    console.log(invs.value)
  })

  const handleViewDetails = (id) => {
    router.push(`/company/${id}`)
  }
</script>
