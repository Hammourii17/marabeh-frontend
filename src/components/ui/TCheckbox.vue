<template>
  <div class="checkbox-container">
    <label class="checkbox-wrapper">
      <input
        type="checkbox"
        :checked="modelValue"
        class="checkbox-input"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="checkbox-custom">
        <svg
          v-if="modelValue"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L4 7L10 1"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="checkbox-label">{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'

  // Свойства
  defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: 'I agree and accept Terms of Use',
    },
  })

  // Эмиссия событий
  defineEmits(['update:modelValue'])
</script>

<style scoped>
  .checkbox-container {
    display: flex;
    align-items: center;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .checkbox-input {
    display: none;
  }

  .checkbox-custom {
    width: 24px;
    height: 24px;
    background-color: #e0f4e8;
    border: 2px solid #34c759;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s,
      box-shadow 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .checkbox-input:checked + .checkbox-custom {
    background: linear-gradient(90deg, #0dcb40 0%, #0bb8b1 100%);
    box-shadow: 0 6px 8px rgba(52, 199, 89, 0.4);
  }

  .checkbox-custom svg {
    display: none;
  }

  .checkbox-input:checked + .checkbox-custom svg {
    display: block;
  }

  .checkbox-label {
    margin-left: 8px;
    font-size: 16px;
    color: #333;
  }
</style>
