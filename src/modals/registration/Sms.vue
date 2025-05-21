<template>
  <div class="flex h-full flex-col otp-modal">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-800">SMS Code</h1>
    </div>
    <p class="text-gray-600">Enter the code that was sent to you via</p>
    <p class="text-gray-600">SMS co confirm phone number</p>
    <n-form
      ref="formRef"
      :model="formValue"
      class="flex flex-col flex-1"
    >
      <div class="flex items-center justify-center w-full">
        <n-form-item path="phoneCode">
          <TNumbers v-model="formValue.phoneCode" />
        </n-form-item>
      </div>
      <div class="otp-warning">
        <div class="otp-warning__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1711 15.3977L15.2591 5.54374C14.4831 4.25074 13.2961 3.51074 12.0001 3.51074C10.7041 3.51074 9.51705 4.25074 8.74105 5.54174L2.82905 15.3977C2.04305 16.7067 1.95705 18.1027 2.59405 19.2277C3.23005 20.3537 4.47205 20.9997 6.00005 20.9997H18.0001C19.5281 20.9997 20.7701 20.3537 21.4061 19.2287C22.0421 18.1037 21.9571 16.7077 21.1711 15.3977ZM12.0001 17.5487C11.1461 17.5487 10.4501 16.8537 10.4501 15.9997C10.4501 15.1447 11.1451 14.4487 12.0001 14.4487C12.8551 14.4487 13.5501 15.1447 13.5501 15.9997C13.5501 16.8537 12.8541 17.5487 12.0001 17.5487ZM13.6331 10.1247C13.6221 10.1557 12.2321 13.5927 12.2321 13.5927C12.1941 13.6867 12.1021 13.7487 12.0011 13.7487C11.9001 13.7487 11.8081 13.6867 11.7701 13.5927L10.3791 10.1547C10.2956 9.94636 10.2518 9.72421 10.2501 9.49974C10.2501 8.53474 11.0351 7.74974 12.0001 7.74974C12.2835 7.75047 12.5625 7.81994 12.8131 7.9522C13.0638 8.08446 13.2787 8.27556 13.4392 8.5091C13.5998 8.74264 13.7013 9.01165 13.7351 9.29305C13.7688 9.57446 13.7338 9.85985 13.6331 10.1247Z"
              fill="#FFB032"
            />
          </svg>
        </div>
        <div class="otp-warning__text">The code is valid for 180 seconds</div>
      </div>
      <div
        v-if="timer > 0"
        class="otp-timer"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="#D4EFE1"
            stroke-width="2"
          />
          <path
            d="M3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3"
            stroke="#0DCB40"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>{{ timer }} sec to Resend</span>
      </div>
      <div
        v-else
        class="otp-warning__button"
        @click="resendCode"
      >
        Resend Code
      </div>
      <div class="flex items-center justify-between mt-auto">
        <n-button
          :disabled="formValue.phoneCode.length != 4"
          class="w-[100%] border rounded-[12px]"
          size="large"
          type="success"
          @click="sendEvent"
        >
          Confirm
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
  import { ref } from 'vue'
  import useModals from '@/components/modal/modal'
  import eventBus from '@/utils/eventBus'
  import TNumbers from '@/components/ui/TNumbers.vue'

  const formRef = ref(null)
  const formValue = ref({
    phoneCode: [],
  })

  const props = defineProps({
    tel: {
      type: String,
      required: true,
    },
  })

  const timer = ref(180)
  let interval = null

  const startTimer = () => {
    if (interval) clearInterval(interval)
    timer.value = 180
    interval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  const resendCode = () => {
    startTimer()
  }

  startTimer()

  const sendEvent = () => {
    eventBus.emit('continue2')
    useModals.close()
  }
</script>

<style scoped>
  .phoneCode {
    font-size: 50px;
  }

  .otp-modal {
    padding: 48px;
    width: 400px;
  }

  .otp-warning {
    width: 100%;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-radius: 16px;
    background: #fff9e2;
    margin-bottom: 22px;
  }

  .otp-warning__text {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    color: #1e293b;
  }

  .otp-timer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: #1e293b;
    margin-bottom: 21px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .otp-timer svg {
    animation: spin 2s linear infinite;
  }

  .otp-warning__button {
    width: 100%;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
    color: #28a9ad;
  }
</style>
