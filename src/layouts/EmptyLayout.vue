<template>
  <div
    class="main-container flex min-h-full"
    style="min-height: 100vh"
  >
    <div class="main-content min-h-full w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  // Пустой компонент без дополнительной логики
</script>

<style lang="scss">
  .main-container {
    box-sizing: border-box;
  }

  .main-content {
    width: 100%;
  }
</style>
