<template>
  <div class="await-review-container">
    <div class="await-review-content">
      <h1 class="text-2xl font-bold">Registration Received</h1>
      <div>
        <p class="font-bold">Your account registration has been successfully submitted.</p>
        <p class="text-gray-600 mb-4">
          Your personal information is under review.
          <br />
          Access to the platform will be granted once the verification is complete.
        </p>
        <p class="text-gray-600">For any inquiries, please contact us:</p>
      </div>
      <div
        class="flex flex-col w-[100%] border-[1px] border-[rgba(60,67,122,0.5)] text-center py-5 rounded-[15px]"
      >
        <a
          href="mailto:esage-support@esage.com"
          class="text-gray-800 font-bold mb-1"
        >
          esage-support@esage.com
        </a>
        <a
          href="tel:+1234564312"
          class="text-gray-800 font-bold"
          >+1 23 4564 312</a
        >
      </div>
    </div>
    <div class="await-review-image__wrapper">
      <img
        src="@/assets/img/applause.png"
        alt="Esage"
        class="object-cover await-review-img"
      />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useMainStore } from '@/stores/main'

  const mainStore = useMainStore()
  const { user } = storeToRefs(mainStore)
  const router = useRouter()

  onMounted(() => {
    if (user.value.is_verified) {
      router.push({ name: 'Dashboard' })
    }
  })
</script>

<style scoped>
  .await-review-container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
  }

  .await-review-content {
    padding: 64px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .await-review-image__wrapper {
    position: relative;
    height: 740px;
    padding: 24px;
    padding: 24px;
  }

  .await-review-img {
    width: 100%;
    height: 100%;
  }
</style>
