<template>
  <div class="flex flex-col items-center justify-center min-h-screen login-page">
    <n-card class="pt-10 pb-0 login-container">
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        class="flex flex-col items-center mb-7"
      >
        <img
          src="@/assets/icons/logo.png"
          alt="Esage"
          width="180"
          class="object-cover login-logo"
        />

        <h1 class="mb-7 login-title">Authorization</h1>

        <n-form-item
          class="w-[60%]"
          label="Login"
          path="username"
        >
          <n-input
            v-model:value="formValue.username"
            placeholder="Enter your email"
            size="large"
          />
        </n-form-item>

        <n-form-item
          class="w-[60%]"
          label="Password"
          path="password"
        >
          <n-input
            v-model:value="formValue.password"
            size="large"
            type="password"
            show-password-on="click"
            placeholder="Enter password"
          />
        </n-form-item>

        <n-form-item class="w-[43%]">
          <n-button
            :loading="isLoading"
            :disabled="isLoading"
            class="w-full border rounded-[12px]"
            size="large"
            type="success"
            @click="handleSubmit"
          >
            Login
          </n-button>
        </n-form-item>

        <n-button
          class="login-forgot"
          quaternary
          round
          type="warning"
        >
          I forgot my password
        </n-button>
      </n-form>

      <div class="flex justify-center">
        <p
          class="px-4 py-2 border rounded-full text-gray-600 border-[1px] border-[rgba(60,67,122,0.5)]"
        >
          Don't have an account yet?
          <RouterLink
            :to="{ name: 'Registration' }"
            class="text-teal-600 font-semibold hover:underline"
          >
            Sign up!
          </RouterLink>
        </p>
      </div>
    </n-card>
  </div>
</template>

<script>
  import { NCard, NFormItem, NForm, NInput, NButton } from 'naive-ui'
  import { defineComponent, ref, getCurrentInstance } from 'vue'
  import { useMainStore } from '~/stores/main'
  import { useRouter } from 'vue-router'
  import { useGoogleRecaptcha } from '@/composables/useRecaptcha'

  export default defineComponent({
    name: 'Login',
    components: {
      NCard,
      NFormItem,
      NForm,
      NInput,
      NButton,
    },
    setup() {
      const router = useRouter()
      const mainStore = useMainStore()
      const { getRecaptchaToken, loadRecaptcha } = useGoogleRecaptcha()
      const instance = getCurrentInstance()
      const $http = instance.appContext.config.globalProperties.$http
      const formRef = ref(null)
      const isLoading = ref(false)
      const formValue = ref({
        username: '',
        password: '',
      })
      const rules = {
        password: [
          {
            required: true,
            message: 'Password is required',
            trigger: ['blur'],
          },
        ],
        username: [
          {
            required: true,
            message: 'Username is required',
            trigger: ['blur'],
          },
        ],
      }

      loadRecaptcha()

      const handleSubmit = async (e) => {
        e.preventDefault()
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            try {
              isLoading.value = true
              const token = await getRecaptchaToken('login')

              const payload = {
                email: formValue.value.username,
                username: formValue.value.username,
                password: formValue.value.password,
              }
              if (token) {
                payload.recaptcha_token = token
              }

              const response = await $http.post('token/', payload)
              await mainStore.login(response)

              mainStore.getBallance()

              const savedRoute = localStorage.getItem('savedRoute')

              if (savedRoute) {
                router.push(savedRoute)
                localStorage.removeItem('savedRoute')
              } else {
                router.push({ name: 'Dashboard' })
              }
            } catch (e) {
              console.log('error', e)
            } finally {
              isLoading.value = false
              console.log('finnaly')
            }
          }
        })
      }
      return {
        formRef,
        formValue,
        isLoading,
        rules,
        handleSubmit,
      }
    },
  })
</script>

<style scoped>
  .n-card {
    width: 39%;
    max-width: 750px;
    box-shadow: 0px 3px 5px 0px rgba(151, 151, 151, 0.1);
    border-radius: 20px;
  }

  .n-button {
  }

  .login-page {
    background: #ecf4fd;
  }

  .login-container {
    width: 520px;
    background: #ffffff;
    border-radius: 48px;
  }

  .login-logo {
    position: fixed;
    top: 32px;
  }

  .login-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: #1e293b;
  }
</style>
