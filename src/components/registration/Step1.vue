<template>
  <div class="flex h-full flex-col category-container">
    <div class="category-header">
      <h1 class="category-title">Registration</h1>
      <p class="category-desc">
        Please choose one of the categories that applies to you by clicking the appropriate button
        below.
      </p>
    </div>

    <div class="category-list">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category-item flex items-center border border-gray-200 rounded-lg hover:border-blue-500 transition-colors justify-between"
      >
        <div class="flex category-wrapper">
          <div class="category-img__wrapper">
            <img
              :src="category.icon"
              :alt="category.label"
              class="category-img"
            />
          </div>
          <div class="category-details flex-grow">
            <h2 class="text-center text-lg font-medium category-details__desc">
              {{ category.label }}
            </h2>
            <p class="text-center text-gray-500 category-details__desc">
              {{ category.description }}
            </p>
          </div>

          <div
            class="min-w-[50px] h-[43px] rounded-[10px] bg-[#f2f5f8] ml-4 border-2 transition-colors duration-300 cursor-pointer relative"
            :class="[selectedRole === category.value ? 'border-[#00856a]' : 'border-transparent']"
            @click="selectRole(category.value)"
          >
            <transition
              name="fade"
              mode="out-in"
            >
              <img
                v-if="selectedRole === category.value"
                src="@/assets/img/check.png"
                alt="check"
                class="w-full h-full absolute top-[-13px] left-[9px]"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <p
        class="px-4 py-2 border rounded-full text-gray-600 border-[1px] border-[rgba(60,67,122,0.5)]"
      >
        Already have an account?
        <button
          class="text-teal-600 font-semibold hover:underline"
          @click="goToLogin"
        >
          Log In!
        </button>
      </p>

      <n-form-item class="w-[43%]">
        <n-button
          class="w-[100%] border rounded-[12px]"
          size="large"
          type="success"
          @click="handleSubmit"
        >
          Next Step →
        </n-button>
      </n-form-item>
    </div>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NButton } from 'naive-ui'
  import { ref, watch } from 'vue'
  import { format } from 'date-fns'
  import { useRouter } from 'vue-router'
  import { useMainStore } from '@/stores/main'
  import { useRegistrationStore } from '@/stores/registration'

  const router = useRouter()
  const mainStore = useMainStore()
  const registrationStore = useRegistrationStore()
  const formRef = ref(null)
  const formValue = ref({
    selectedRole: 'INDIVIDUAL_INVESTOR',
  })

  const selectedRole = ref('INDIVIDUAL_INVESTOR')

  const categories = ref([
    {
      label: 'Individual Investor',
      description:
        'You plan to invest using your own personal account rather than an account of an organization.',
      icon: new URL('@/assets/img/avatar3d.png', import.meta.url).href,
      value: 'INDIVIDUAL_INVESTOR',
    },
    {
      label: 'Institutional Investor',
      description:
        'You plan to invest using your own personal account rather than an account of an organization.',
      icon: new URL('@/assets/img/avatarGroup3d.png', import.meta.url).href,
      value: 'INSTITUTIONAL_INVESTOR',
    },
    // {
    //   label: "Individual Borrower",
    //   description: "You plan to raise funds for your project.",
    //   icon: new URL('@/assets/img/donation.png', import.meta.url).href,
    //   value: "INDIVIDUAL_BORROWER"
    // },
    {
      label: 'Institutional Borrower',
      description: 'You plan to raise funds for your project.',
      icon: new URL('@/assets/img/fundraiser3d.png', import.meta.url).href,
      value: 'INSTITUTIONAL_BORROWER',
    },
  ])

  const emit = defineEmits(['nextStep', 'change-role'])

  const selectRole = (role) => {
    selectedRole.value = role
    emit('change-role', role)
  }

  watch(selectedRole, (newValue, oldValue) => {
    formValue.value.selectedRole = newValue
  })

  watch(
    () => registrationStore.role,
    (newValue, oldValue) => {
      formValue.value.selectedRole = newValue
      selectedRole.value = newValue
    },
    { immediate: true }
  )

  const goToLogin = () => {
    mainStore.logout()
    registrationStore.reset()
    router.push({ name: 'Login' })
  }

  const handleSubmit = () => {
    emit('nextStep', formValue.value)
  }
</script>

<style scoped>
  .category-container {
    gap: 32px;
    justify-content: space-between;
    padding: 24px;
  }

  .category-title {
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
    color: #1e293b;
    margin-bottom: 12px;
  }

  .category-desc {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    color: #1e293b;
  }

  .category-list {
    display: flex;
    justify-content: space-between;
  }

  .category-item {
    display: flex;
    flex-direction: column;
    width: 316px;
    padding: 32px;
    border: 1px solid #c5d4e2;
  }

  .category-img__wrapper {
    padding: 6px 26px;
    margin-bottom: 30px;
  }

  .category-img {
    width: 168px;
    height: 168px;
  }

  .category-details {
    height: 118px;
    margin-bottom: 24px;
  }

  .category-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
