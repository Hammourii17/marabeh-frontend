<template>
  <div class="input-container">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      ref="inputRefs"
      :value="digit"
      maxlength="1"
      class="digit-input"
      type="text"
      @input="onInput($event, index)"
      @keydown.backspace="onBackspace($event, index)"
    />
  </div>
</template>

<script setup>
  import { ref, watch, nextTick } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [Number, String, Array],
      required: true,
      default: 0,
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const digits = ref(['', '', '', ''])
  const inputRefs = ref([])

  const initializeDigits = () => {
    const valueAsString = String(props.modelValue || '')
    digits.value = Array(4)
      .fill('')
      .map((_, index) => valueAsString[index] || '')
  }

  watch(
    () => props.modelValue,
    () => {
      initializeDigits()
    },
    { immediate: true }
  )

  const focusNext = (currentIndex) => {
    nextTick(() => {
      if (inputRefs.value[currentIndex + 1]) {
        inputRefs.value[currentIndex + 1].focus()
      }
    })
  }

  // Перемещаем фокус на предыдущий input
  const focusPrevious = (currentIndex) => {
    nextTick(() => {
      if (inputRefs.value[currentIndex - 1]) {
        inputRefs.value[currentIndex - 1].focus()
      }
    })
  }

  const onInput = (event, index) => {
    const value = event.target.value

    if (/^\d$/.test(value)) {
      digits.value[index] = value
      emitValue()

      if (index < digits.value.length - 1) {
        focusNext(index)
      }
    } else {
      event.target.value = ''
    }
  }

  const onBackspace = (event, index) => {
    if (!digits.value[index] && index > 0) {
      // Стираем предыдущее значение
      digits.value[index - 1] = ''
      emitValue()

      focusPrevious(index)
    } else {
      digits.value[index] = ''
      emitValue()
    }
  }

  const emitValue = () => {
    const numericValue = digits.value.join('') || ''
    emit('update:modelValue', numericValue)
  }
</script>

<style scoped>
  .input-container {
    display: flex;
    gap: 8px;
  }

  .digit-input {
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 24px;
    border-radius: 8px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color 0.3s;
  }

  .digit-input:focus {
    border-color: #4caf50;
  }
</style>
