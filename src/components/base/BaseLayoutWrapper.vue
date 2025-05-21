<template>
  <div
    v-if="isLoading"
    class="flex justify-center items-center h-screen"
  >
    <BaseLoader />
  </div>

  <component
    :is="currentLayout"
    v-else
  >
    <slot />
  </component>
</template>

<script setup>
  import { ref, watchEffect, shallowRef } from 'vue'
  import { useRoute } from 'vue-router'
  import MainLayout from '@/layouts/MainLayout.vue'
  import BaseLoader from '@/components/base/BaseLoader.vue'

  const route = useRoute()
  const isLoading = ref(false)
  const currentLayout = shallowRef(MainLayout)

  const layouts = {
    main: MainLayout,
    empty: () => import('@/layouts/EmptyLayout.vue'),
  }

  // Проверяем layout в meta сразу при монтировании компонента
  if (import.meta.env.DEV) {
    const layoutName = route.meta?.layout
    if (layoutName && !layouts[layoutName]) {
      throw new Error(
        `[BaseLayoutWrapper] Критическая ошибка: Лейаут "${layoutName}" не найден в конфигурации layouts.\nДоступные лейауты: ${Object.keys(layouts).join(', ')}`
      )
    }
  }

  const setLayout = async (name = 'main') => {
    try {
      if (name !== 'main') {
        isLoading.value = true
      }

      const layout = layouts[name]
      currentLayout.value = typeof layout === 'function' ? (await layout()).default : layout
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    const layoutName = route.meta?.layout || 'main'
    setLayout(layoutName)
  })
</script>
