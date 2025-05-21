<template>
  <div class="toggle-buttons">
    <button
      :class="['button', { active: modelValue === true }]"
      @click="updateValue(true)"
    >
      {{ trueText }}
    </button>
    <button
      :class="['button', { active: modelValue === false }]"
      @click="updateValue(false)"
    >
      {{ falseText }}
    </button>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [Boolean, null],
      default: null,
    },
    trueText: {
      type: String,
      default: 'Yes',
    },
    falseText: {
      type: String,
      default: 'No',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const updateValue = (value) => {
    if (props.modelValue !== value) {
      emit('update:modelValue', value)
    }
  }
</script>

<style scoped>
  .toggle-buttons {
    display: flex;
    gap: 10px;
  }

  .button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #f5f5f5;
    color: #333;
    min-width: 114px;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .button.active {
    background-color: #5ec9d6;
    color: white;
    font-weight: bold;
  }

  .button:not(.active):hover {
    background-color: #e0e0e0;
  }
</style>
