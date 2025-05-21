<template>
  <div
    class="inline-block animate-spin rounded-full border-solid border-current border-t-transparent"
    :class="[sizeClasses, borderClasses]"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v),
    },
    border: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v),
    },
  })

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[props.size]

  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4',
  }[props.border]
</script>
