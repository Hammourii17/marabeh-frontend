<template>
  <div class="input-container">
    <label
      :class="{ 'label-floating': isFocused || modelValue }"
      class="input-label"
    >
      <div class="flex items-center text-[#1E293B]">
        {{ title }}
        <!-- <span v-if="hint" class="hint-icon" @mouseover="showHint" @mousemove="moveHint" @mouseout="hideHint">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="8" fill="#A9B0BB" />
            <path
              d="M7.00392 11.3C6.81917 11.4863 6.71502 11.7377 6.71392 12C6.71418 12.134 6.74138 12.2667 6.79392 12.39C6.88419 12.6019 7.04484 12.7762 7.24873 12.8833C7.45263 12.9904 7.68726 13.0239 7.91298 12.9781C8.1387 12.9322 8.34168 12.8099 8.48761 12.6317C8.63354 12.4534 8.71348 12.2303 8.71392 12C8.71281 11.7377 8.60866 11.4863 8.42392 11.3C8.33095 11.2063 8.22035 11.1319 8.09849 11.0811C7.97664 11.0303 7.84593 11.0042 7.71392 11.0042C7.58191 11.0042 7.4512 11.0303 7.32934 11.0811C7.20748 11.1319 7.09688 11.2063 7.00392 11.3ZM7.71392 4C7.18698 3.99966 6.66925 4.13812 6.21283 4.40144C5.7564 4.66477 5.37739 5.04366 5.11392 5.5C4.99436 5.72854 4.96774 5.99444 5.0396 6.24215C5.11146 6.48986 5.27626 6.70022 5.49956 6.82929C5.72286 6.95837 5.9874 6.99617 6.23791 6.93481C6.48843 6.87345 6.70555 6.71767 6.84392 6.5C6.9316 6.34813 7.05768 6.22199 7.20951 6.13423C7.36134 6.04647 7.53358 6.00018 7.70895 6.00001C7.88432 5.99984 8.05665 6.04578 8.20865 6.13324C8.36065 6.2207 8.48698 6.34659 8.57497 6.49829C8.66295 6.64999 8.7095 6.82216 8.70994 6.99752C8.71037 7.17289 8.66468 7.34529 8.57745 7.49742C8.49022 7.64956 8.36452 7.77608 8.21295 7.86429C8.06138 7.9525 7.88928 7.9993 7.71392 8C7.4487 8 7.19435 8.10536 7.00681 8.29289C6.81927 8.48043 6.71392 8.73478 6.71392 9C6.71392 9.26522 6.81927 9.51957 7.00681 9.70711C7.19435 9.89464 7.4487 10 7.71392 10C8.50957 10 9.27263 9.68393 9.83524 9.12132C10.3978 8.55871 10.7139 7.79565 10.7139 7C10.7139 6.20435 10.3978 5.44129 9.83524 4.87868C9.27263 4.31607 8.50957 4 7.71392 4Z"
              fill="white" />
          </svg>
        </span> -->
      </div>
    </label>
    <input
      v-model="internalValue"
      class="input-field"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <!-- Абсолютный блок подсказки -->
    <div
      v-if="showTooltip"
      class="tooltip"
      :style="{ top: tooltipPosition.y + 'px', left: tooltipPosition.x + 'px' }"
    >
      {{ hint }}
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    hint: {
      type: String, // Подсказка передается как текст
      default: '',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const internalValue = ref(props.modelValue)
  const isFocused = ref(false)

  const showTooltip = ref(false)
  const tooltipPosition = ref({ x: 0, y: 0 })

  const handleFocus = () => {
    isFocused.value = true
  }

  const handleBlur = () => {
    isFocused.value = false
  }

  const showHint = () => {
    showTooltip.value = true
  }

  const hideHint = () => {
    showTooltip.value = false
  }

  const moveHint = (event) => {
    tooltipPosition.value = {
      x: event.clientX + 10, // Смещение по горизонтали
      y: event.clientY + 10, // Смещение по вертикали
    }
  }

  watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue)
  })
</script>

<style scoped>
  .input-container {
    position: relative;
    margin: 1rem 0;
  }

  .input-label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s;
    background: white;
    padding: 0 5px;
    pointer-events: none;
  }

  .label-floating {
    top: 1px;
    font-size: 12px;
    color: #2563eb;
  }

  .hint-icon {
    margin-left: 5px;
    font-size: 12px;
    color: #9ca3af;
    cursor: pointer;
    position: relative;
  }

  .input-field {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s;
  }

  .input-field:focus {
    border: 1px solid #5dc855;
  }

  .tooltip {
    position: absolute;
    background-color: #fff;
    border: 1px solid #d1d5db;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    z-index: 1000;
  }
</style>
