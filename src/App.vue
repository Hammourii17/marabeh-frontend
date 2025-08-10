<template>
  <NConfigProvider :theme-overrides="customTheme">
    <NMessageProvider>
      <NNotificationProvider>
        <BaseLayoutWrapper>
          <router-view />
        </BaseLayoutWrapper>
        <modal-root />
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup>
  import { NMessageProvider, NNotificationProvider, NConfigProvider } from 'naive-ui'
  import ModalRoot from './components/modal/ModalRoot.vue'
  import { themeOverrides } from './plugins/naive-ui.js'
  import BaseLayoutWrapper from './components/base/BaseLayoutWrapper.vue'

  const customTheme = themeOverrides
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
</style>
