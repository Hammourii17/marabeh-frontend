<template>
  <div
    class="main-container flex min-h-full"
    style="min-height: 100vh"
  >
    <SideBar
      class="w-[210px] min-h-full"
      @collapsed="changeCollapsed"
    />

    <div
      class="main-content min-h-full w-full"
      style="width: calc(100% - 210px)"
    >
      <HeaderComponent
        :balance="balance"
        :user="user"
        :is-guarantor="isGuarantor"
        :is-show-hnwi-badge="isShowHNWIBadge"
        @fetch-user="fetchUser"
        @toggle-language="toggleLanguage"
      />

      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import SideBar from '@/components/layout/SideBar.vue'
  import HeaderComponent from '@/components/layout/HeaderComponent.vue'
  import { useMainStore } from '@/stores/main'

  const mainStore = useMainStore()
  const changeCollapsed = ref(false)

  // Вычисляемые свойства из хранилищ с безопасной проверкой
  const isGuarantor = computed(() => mainStore.user?.role_type?.includes('GUARANTOR'))
  const user = computed(() => mainStore.user)
  const balance = computed(() => mainStore.balance)
  const isShowHNWIBadge = computed(() => user.value?.role_type === 'INDIVIDUAL_INVESTOR')

  // Обновление данных пользователя только если явно запрошено
  const fetchUser = async () => {
    try {
      await mainStore.fetchUser()

      if (!isGuarantor.value) {
        await mainStore.getBallance()
      }
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error)
    }
  }

  const toggleLanguage = (language) => {
    // Реализация переключения языка
    console.log('Language toggled to:', language)
  }
</script>

<style lang="scss">
  .main-container {
    box-sizing: border-box;
  }

  .main-content {
    transition: width 0.3s ease;
  }
</style>
