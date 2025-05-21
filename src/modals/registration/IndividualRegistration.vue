<template>
  <div class="company-modal__container">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-800">Questionnaire</h1>
    </div>
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col"
    >
      <div class="flex flex-col justify-center w-[100%] company-modal__questions">
        <n-form-item
          class="company-modal__item"
          label="Do you have experience in crowdfund and understand the process?"
          path="crowdfundExperience"
        >
          <n-radio-group
            v-model:value="formValue.crowdfundExperience"
            class="company-modal__item-wrapper"
          >
            <n-radio-button
              class="company-modal__item-button"
              value="yes"
              >Yes</n-radio-button
            >
            <n-radio-button
              class="company-modal__item-button"
              value="no"
              >No</n-radio-button
            >
          </n-radio-group>
        </n-form-item>

        <n-form-item
          class="company-modal__item"
          label="Are you or someone close to you holds an important public function in Saudi Arabia or elsewhere?"
          path="publicFunction"
        >
          <n-radio-group v-model:value="formValue.publicFunction">
            <n-radio-button
              class="company-modal__item-button"
              value="yes"
              >Yes</n-radio-button
            >
            <n-radio-button
              class="company-modal__item-button"
              value="no"
              >No</n-radio-button
            >
          </n-radio-group>
        </n-form-item>

        <n-form-item
          class="company-modal__item"
          label="Are you a board member or an executive at a listed company, or a company owned by a government?"
          path="boardMember"
        >
          <n-radio-group v-model:value="formValue.boardMember">
            <n-radio-button
              class="company-modal__item-button"
              value="yes"
              >Yes</n-radio-button
            >
            <n-radio-button
              class="company-modal__item-button"
              value="no"
              >No</n-radio-button
            >
          </n-radio-group>
        </n-form-item>
      </div>
      <div class="flex items-center justify-between mt-auto">
        <n-button
          :disabled="isFormInvalid"
          class="w-[100%] border rounded-[12px] company-modal__button"
          size="large"
          type="success"
          @click="sendEvent"
        >
          > Continue →
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NInput, NButton, NRadioButton, NRadioGroup } from 'naive-ui'
  import { ref, computed } from 'vue'
  import useModals from '@/components/modal/modal'
  import eventBus from '@/utils/eventBus'

  const formRef = ref(null)
  const formValue = ref({
    crowdfundExperience: null,
    publicFunction: null,
    boardMember: null,
  })

  const rules = {
    crowdfundExperience: [
      {
        required: true,
        message: 'This field is required',
        trigger: ['blur'],
      },
    ],
    publicFunction: [
      {
        required: true,
        message: 'This field is required',
        trigger: ['blur'],
      },
    ],
    boardMember: [
      {
        required: true,
        message: 'This field is required',
        trigger: ['blur'],
      },
    ],
  }
  const sendEvent = () => {
    eventBus.emit('continue4', formValue.value)
    setTimeout(() => {
      useModals.close()
    }, 1000)
  }

  const isFormInvalid = computed(() => {
    return Object.values(formValue.value).some((value) => value === null || value === '')
  })
</script>

<style scoped>
  .company-modal__container {
    display: flex;
    flex-direction: column;
    padding: 48px;
    width: 100%;
    gap: 12px;
  }

  .company-modal__questions {
    display: flex;
    gap: 12px;
  }

  .company-modal__item {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-radius: 16px;
    background: #f3f8fd;
  }

  .company-modal__item-button {
    width: 70px;
  }

  .company-modal__select {
    width: 240px;
  }

  .company-modal__button {
    margin-top: 12px;
  }
</style>
