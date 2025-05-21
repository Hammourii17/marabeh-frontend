<template>
  <div class="progress-bar">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="{ active: index <= currentStep - 1 }"
      class="step"
    >
      <div class="label">{{ step }}</div>
      <div class="circle"></div>
    </div>
    <div class="line" />
  </div>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'Registration',
    },
  })

  defineEmits(['update:modelValue'])

  const stepsList = {
    INDIVIDUAL_INVESTOR: ['Role Selection', 'Registration', 'Terms of Use', 'Nafath'],
    INSTITUTIONAL_INVESTOR: [
      'Role Selection',
      'Company Info',
      'Documents',
      'Registration',
      'Terms of Use',
      'Add IBAN',
    ],
    INSTITUTIONAL_BORROWER: [
      'Role Selection',
      'Company Info',
      'Documents',
      'Registration',
      'Terms of Use',
    ],
    INSTITUTIONAL_GUARANTOR: ['Company Info', 'Registration', 'Terms of Use'],
    INDIVIDUAL_GUARANTOR: ['Registration', 'Terms of Use', 'Nafath'],
  }

  const steps = computed(() => {
    return stepsList[props.role]
  })

  const currentStep = ref(props.modelValue)

  watch(
    () => props.modelValue,
    (newVal) => {
      currentStep.value = newVal
    }
  )
</script>

<style scoped>
  .progress-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 10px;
    width: 700px;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    white-space: nowrap;
  }

  .step .circle {
    width: 12px;
    height: 12px;
    border: 2px solid #2ecc71;
    border-radius: 50%;
    background-color: #ecf4fd;
    transition:
      background-color 0.3s,
      border-color 0.3s;
    position: relative;
    z-index: 1;
  }

  .step.active .circle {
    background-color: #2ecc71;
    border-color: #2ecc71;
  }

  .step .label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .line {
    position: absolute;
    top: 41px;
    left: 52px;
    right: 0;
    height: 2px;
    background-color: #d3d3d3;
    z-index: 0;
    width: 600px;
  }

  .step.active ~ .line {
    background-color: #2ecc71;
  }
</style>
