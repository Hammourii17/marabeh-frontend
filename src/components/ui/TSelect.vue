<template>
  <div class="input-container">
    <label
      :class="{ 'label-floating': isFocused || selectedOption }"
      class="input-label"
    >
      <div class="flex items-center text-[#1E293B]">
        {{ title }}
      </div>
    </label>
    <!-- Выпадающий список -->
    <div
      class="select-box"
      tabindex="0"
      @click="toggleDropdown"
    >
      <div class="selected-option">
        {{ selectedOption ? selectedOption.text : 'Select an option' }}
      </div>
      <div class="dropdown-icon">
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="#A9B0BB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <ul
      v-if="isDropdownOpen"
      class="dropdown"
    >
      <li
        v-for="option in options"
        :key="option.id"
        class="dropdown-item"
        @click.stop="selectOption(option)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number, Object], // Значение может быть строкой, числом или объектом
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [], // Список вариантов
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const isFocused = ref(false)
  const isDropdownOpen = ref(false)
  const selectedOption = ref(null)

  // Инициализация выбранного значения
  watch(
    () => props.modelValue,
    (newValue) => {
      selectedOption.value = newValue
    },
    { immediate: true }
  )

  // Открытие/закрытие выпадающего списка
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  const closeDropdown = () => {
    isDropdownOpen.value = false
  }

  // Выбор варианта
  const selectOption = (option) => {
    selectedOption.value = option
    emit('update:modelValue', option) // Обновляем значение через v-model
    closeDropdown()
  }
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
    top: -12px;
    font-size: 12px;
    color: #2563eb;
  }

  .select-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
  }

  .select-box:focus {
    border: 1px solid #5dc855;
  }

  .selected-option {
    flex: 1;
  }

  .dropdown-icon {
    margin-left: 10px;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    margin-top: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
  }

  .dropdown-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }

  .dropdown-item:active {
    background: #e5e7eb;
  }
</style>
