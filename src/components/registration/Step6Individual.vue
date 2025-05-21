<template>
  <div class="nafath-container">
    <div class="nafath-content">
      <h1 class="text-2xl font-bold">Secure Login with Nafath</h1>

      <p class="company-desc">
        Verify your identity using Nafath for quick and secure access to your account. Follow the
        instructions in the Nafath app to complete the authentication process.
      </p>

      <p class="text-gray-600">Enter this code on your phone.</p>

      <div class="flex flex-col flex-1">
        <div
          class="flex text-2xl font-bold rounded-md items-center justify-center border-2 border-[#319795] h-20"
        >
          {{ randomTwoNumbers }}
        </div>
        <div class="flex items-center justify-between mt-auto">
          <n-button
            text
            @click="handlePreviousStep"
          >
            ← Previous Step
          </n-button>
          <n-button
            class="w-[43%] border rounded-[12px]"
            size="large"
            type="success"
            @click="sendEvent"
          >
            Next Step →
          </n-button>
        </div>
      </div>
    </div>
    <div class="nafath-image__wrapper">
      <img
        src="@/assets/img/applause.png"
        alt="Esage"
        class="object-cover nafath-img"
      />
    </div>
  </div>
</template>

<script setup>
  import { NButton } from 'naive-ui'

  const emit = defineEmits(['previous-step', 'next-step', 'save-data'])
  const randomTwoNumbers = Math.floor(Math.random() * 100)

  const sendEvent = () => {
    emit('next-step')
  }

  const handlePreviousStep = () => {
    emit('previous-step')
  }
</script>

<style scoped>
  .nafath-container {
    display: flex;
    justify-content: space-between;
  }

  .nafath-content {
    padding: 64px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 500px;
  }

  .nafath-image__wrapper {
    position: relative;
    height: 740px;
    padding: 24px;
    padding: 24px;
  }

  .nafath-img {
    width: 100%;
    height: 100%;
  }
</style>
