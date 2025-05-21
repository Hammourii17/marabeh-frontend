<template>
  <div class="header">
    <div
      v-if="!isGuarantor"
      class="header-balance"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_424_2319)">
          <path
            d="M17.5 15V15.8333C17.5 16.75 16.75 17.5 15.8333 17.5H4.16667C3.24167 17.5 2.5 16.75 2.5 15.8333V4.16667C2.5 3.25 3.24167 2.5 4.16667 2.5H15.8333C16.75 2.5 17.5 3.25 17.5 4.16667V5H10C9.075 5 8.33333 5.75 8.33333 6.66667V13.3333C8.33333 14.25 9.075 15 10 15H17.5ZM10 13.3333H18.3333V6.66667H10V13.3333ZM13.3333 11.25C12.6417 11.25 12.0833 10.6917 12.0833 10C12.0833 9.30833 12.6417 8.75 13.3333 8.75C14.025 8.75 14.5833 9.30833 14.5833 10C14.5833 10.6917 14.025 11.25 13.3333 11.25Z"
            fill="url(#paint0_linear_424_2319)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_424_2319"
            x1="25"
            y1="-3.75"
            x2="3.33333"
            y2="23.75"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#4da4a6" />
            <stop
              offset="0.48"
              stop-color="#4da4a6"
            />
            <stop
              offset="1"
              stop-color="#4da4a6"
            />
          </linearGradient>
          <clipPath id="clip0_424_2319">
            <rect
              width="20"
              height="20"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
      <span>Balance: {{ formatCurrency(balance?.balance) }} SAR</span>
    </div>

    <HNWIBadge
      v-if="isShowHNWIBadge"
      class="main-status-badge"
      @refresh="$emit('fetch-user')"
    />

    <div class="flex items-center gap-4 ml-auto">
      <div
        v-if="user"
        class="flex flex-col"
      >
        <span>{{ user.email }}</span>
        <span>{{ user.role_type }}</span>
        <span>{{ user.full_name }}</span>
      </div>
      <div
        ref="dropdownRef"
        class="breadcrumbs__switch flex items-center"
        @click="toggleDropdown"
      >
        <span>{{ selectedLanguage }}</span>
        <span :class="{ 'breadcrumbs__rotate-180': isOpen }">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.23332 0.741797L4.99998 3.97513L1.76665 0.741797C1.44165 0.416797 0.91665 0.416797 0.59165 0.741797C0.26665 1.0668 0.26665 1.5918 0.59165 1.9168L4.41665 5.7418C4.74165 6.0668 5.26665 6.0668 5.59165 5.7418L9.41665 1.9168C9.74165 1.5918 9.74165 1.0668 9.41665 0.741797C9.09165 0.42513 8.55832 0.416797 8.23332 0.741797Z"
              fill="#3A4347"
            />
          </svg>
        </span>
        <div
          v-if="isOpen"
          class="breadcrumbs__dropdown"
        >
          <div
            class="breadcrumbs__dropdown-item"
            @click.stop="selectLanguage('EN')"
          >
            EN
          </div>
          <div
            class="breadcrumbs__dropdown-item"
            @click.stop="selectLanguage('AR')"
          >
            AR
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import HNWIBadge from '@/components/HNWI/HNWIBadge.vue'
  import { formatCurrency } from '@/utils/format'
  // Определение props
  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
    isGuarantor: {
      type: Boolean,
      default: false,
    },
    isShowHNWIBadge: {
      type: Boolean,
      default: false,
    },
    balance: {
      type: [Number, Object],
      default: 0,
    },
  })

  // Определение emit events
  const emit = defineEmits(['fetch-user', 'toggle-language'])

  // Состояние для выпадающего списка и выбранного языка
  const isOpen = ref(false)
  const selectedLanguage = ref('EN')
  const dropdownRef = ref(null)

  // Логика открытия/закрытия выпадающего списка
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }

  // Логика выбора языка
  const selectLanguage = (language) => {
    selectedLanguage.value = language
    isOpen.value = false
    emit('toggle-language', language)
  }

  // Закрытие выпадающего списка при клике вне его области
  onClickOutside(dropdownRef, () => {
    if (isOpen.value) {
      isOpen.value = false
    }
  })
</script>

<style lang="scss">
  .header {
    height: 111px;
    background: #fff;
    padding: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .header-balance {
    padding: 14px 12px;
    display: flex;
    align-items: center;
    color: var(--primary-color);
    font-size: 14px;
    gap: 5px;
    border: 1px solid var(--primary-color);
    border-radius: 16px;
  }

  .header-balance span {
    font-size: 16px;
  }

  .main-status-badge {
    align-self: center;
    margin-left: auto;
    margin-right: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .breadcrumbs__switch {
    height: 36px;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 12px;
    border: 1px solid var(--primary-color);
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
  }

  .breadcrumbs__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid var(--primary-color);
    border-radius: 12px;
    margin-top: 5px;
    z-index: 1000;
  }

  .breadcrumbs__dropdown-item {
    border-radius: 12px;
    width: 60px;
    padding: 5px 12px;
    cursor: pointer;
  }

  .breadcrumbs__dropdown-item:hover {
    background-color: #f0f0f0;
  }

  .breadcrumbs__rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
</style>
