<template>
  <div class="company-modal__container">
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-bold text-gray-800">{{ content.title }}</h1>
    </div>
    <p class="text-gray-600 mb-8">{{ content.description }}</p>

    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="flex flex-col"
    >
      <div class="flex flex-col justify-center w-[100%] company-modal__questions">
        <n-form-item
          v-for="question in questions"
          :key="question.input"
          class="company-modal__item"
          :label="question.label"
          :path="question.input"
        >
          <TToggle
            v-if="question.type === 'toggle'"
            v-model="formValue[question.input]"
          />

          <TSelect
            v-else
            v-model="formValue[question.input]"
            title=""
            :options="question.options"
            class="company-modal__select"
          />
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
          Continue →
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
  import { NForm, NFormItem, NButton } from 'naive-ui'
  import { ref, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRegistrationStore } from '@/stores/registration'
  import useModals from '@/components/modal/modal'
  import eventBus from '@/utils/eventBus'
  import TToggle from '../../components/ui/TToggle.vue'
  import TSelect from '../../components/ui/TSelect.vue'

  const props = defineProps({
    role: {
      type: String,
      default: 'INSTITUTIONAL_BORROWER',
    },
    submitCallback: {
      type: Function,
      default: null,
    },
  })
  const registrationStore = useRegistrationStore()
  const { formData } = storeToRefs(registrationStore)
  const formRef = ref(null)

  const content = computed(() => {
    if (props.role === 'INSTITUTIONAL_INVESTOR') {
      return {
        title: 'Questionnaire',
        description: 'Please answer the following questions to complete your registration',
      }
    }

    return {
      title: 'Additional Company Info',
      description: 'Please answer the questions regarding your company',
    }
  })

  const formFieldsList = {
    INSTITUTIONAL_BORROWER: {
      established12Months: null,
      acceptsPOS: null,
      financialDefaults: null,
      providesGuarantees: null,
      companyActivities: null,
      purposeRequest: null,
    },
    INSTITUTIONAL_INVESTOR: {
      investorEstablished12Months: null,
      revenueInvest: null,
      experienceCrowdfund: null,
      companyActivities: null,
      investmentPeriod: null,
    },
    INDIVIDUAL_INVESTOR: {
      experienceCrowdfund: null,
      hasPublicFunctionAffiliation: null,
      hasBoardMemberAffiliation: null,
      hasRejectedFromInstitutions: null,
      hasFinancialDealsOutsideKSA: null,
    },
  }

  const formValue = ref(formFieldsList[props.role])

  const questions = computed(() => {
    const activityOptions = registrationStore.industries
      ? registrationStore.industries.results.map((item) => {
          return {
            text: item.name_en,
            id: item.id,
          }
        })
      : []

    const purposeOptions = registrationStore.financePurposes
      ? registrationStore.financePurposes.results.map((item) => {
          return {
            text: item.name_en,
            id: item.id,
          }
        })
      : []

    const list = {
      INSTITUTIONAL_BORROWER: [
        {
          type: 'toggle',
          label: 'Are you prepared to provide any form of guarantee?',
          input: 'established12Months',
        },
        {
          type: 'toggle',
          label: 'Does the business accept payments via point of sale systems?',
          input: 'acceptsPOS',
        },
        {
          type: 'toggle',
          label: 'Do you have any financial obligation defaults?',
          input: 'financialDefaults',
        },
        {
          type: 'toggle',
          label: 'Can you provide any guarantees?',
          input: 'providesGuarantees',
        },
        {
          type: 'select',
          label: "What is the classification of the company's activity?",
          input: 'companyActivities',
          options: activityOptions,
        },
        {
          type: 'select',
          label: 'What is the main purpose of the funding request?',
          input: 'purposeRequest',
          options: purposeOptions,
        },
      ],
      INSTITUTIONAL_INVESTOR: [
        {
          type: 'toggle',
          label: 'Has the business been established for more than 12 months?',
          input: 'investorEstablished12Months',
        },
        {
          type: 'toggle',
          label: 'Does the business generate revenue the entity wishes to invest in the platform?',
          input: 'revenueInvest',
        },
        {
          type: 'toggle',
          label: 'Do you have experience in crowdfund and understand the process?',
          input: 'experienceCrowdfund',
        },
        {
          type: 'select',
          label: "What is the classification of the company's activity?",
          input: 'companyActivities',
          options: activityOptions, // activity options
        },
        {
          type: 'select',
          label: 'How long do you plan to hold your investments?',
          input: 'investmentPeriod',
          options: [
            {
              text: 'Short-term',
              id: 1,
            },
            {
              text: 'Medium-term',
              id: 2,
            },
            {
              text: 'Long-term',
              id: 3,
            },
          ],
        },
      ],
      INDIVIDUAL_INVESTOR: [
        {
          type: 'toggle',
          label: 'Do you have experience in crowdfund and understand the process?',
          input: 'experienceCrowdfund',
        },
        {
          type: 'toggle',
          label:
            'Are you or someone close to you holds an important public function in Saudi Arabia or elsewhere?',
          input: 'hasPublicFunctionAffiliation',
        },
        {
          type: 'toggle',
          label:
            'Are you a board member or an executive at a listed company, or a company owned by a government?',
          input: 'hasBoardMemberAffiliation',
        },
        {
          type: 'toggle',
          label: 'Have you been rejected from any other financial/fintech institutions?',
          input: 'hasRejectedFromInstitutions',
        },
        {
          type: 'toggle',
          label: 'Do you have financial deals or businesses outside Saudi Arabia?',
          input: 'hasFinancialDealsOutsideKSA',
        },
      ],
    }

    return list[props.role]
  })

  const toggleRule = {
    required: true,
    type: 'boolean',
    message: 'This field is required',
    trigger: ['blur'],
  }

  const selectRule = {
    required: true,
    message: 'This field is required',
    trigger: ['blur'],
    validator: (rule, value) => {
      return value !== null
    },
  }

  const rules = {
    established12Months: [toggleRule],
    investorEstablished12Months: [toggleRule],
    acceptsPOS: [toggleRule],
    financialDefaults: [toggleRule],
    providesGuarantees: [toggleRule],
    companyActivities: [selectRule],
    purposeRequest: [selectRule],
    investorEstablished12Months: [toggleRule],
    revenueInvest: [toggleRule],
    experienceCrowdfund: [toggleRule],
    investmentPeriod: [selectRule],
    hasPublicFunctionAffiliation: [toggleRule],
    hasBoardMemberAffiliation: [toggleRule],
    hasRejectedFromInstitutions: [toggleRule],
    hasFinancialDealsOutsideKSA: [toggleRule],
  }

  const sendEvent = () => {
    formRef.value.validate((errors) => {
      if (!errors) {
        if (props.submitCallback) {
          props.submitCallback(formValue.value)
        } else {
          eventBus.emit('continue', formValue.value)
        }

        useModals.close()
      }
    })
  }

  const isFormInvalid = computed(() => {
    return Object.values(formValue.value).some((value) => value === null || value === '')
  })

  watch(
    () => formData.value,
    () => {
      const data = formData.value?.step2?.questionnaire_results

      if (data) {
        switch (props.role) {
          case 'INSTITUTIONAL_BORROWER':
            formValue.value = {
              established12Months:
                data?.established12Months !== undefined ? data.established12Months : null,
              acceptsPOS: data?.acceptsPOS !== undefined ? data.acceptsPOS : null,
              financialDefaults:
                data?.financialDefaults !== undefined ? data.financialDefaults : null,
              providesGuarantees:
                data?.providesGuarantees !== undefined ? data.providesGuarantees : null,
              companyActivities:
                data?.companyActivities !== undefined ? data.companyActivities : null,
              purposeRequest: data?.purposeRequest !== undefined ? data.purposeRequest : null,
            }
            break
          case 'INSTITUTIONAL_INVESTOR':
            formValue.value = {
              investorEstablished12Months:
                data?.investorEstablished12Months !== undefined
                  ? data.investorEstablished12Months
                  : null,
              revenueInvest: data?.revenueInvest !== undefined ? data.revenueInvest : null,
              experienceCrowdfund:
                data?.experienceCrowdfund !== undefined ? data.experienceCrowdfund : null,
              companyActivities:
                data?.companyActivities !== undefined ? data.companyActivities : null,
              investmentPeriod: data?.investmentPeriod !== undefined ? data.investmentPeriod : null,
            }
            break
          case 'INDIVIDUAL_INVESTOR':
            formValue.value = {
              experienceCrowdfund:
                data?.experienceCrowdfund !== undefined ? data.experienceCrowdfund : null,
              hasPublicFunctionAffiliation:
                data?.hasPublicFunctionAffiliation !== undefined
                  ? data.hasPublicFunctionAffiliation
                  : null,
              hasBoardMemberAffiliation:
                data?.hasBoardMemberAffiliation !== undefined
                  ? data.hasBoardMemberAffiliation
                  : null,
              hasRejectedFromInstitutions:
                data?.hasRejectedFromInstitutions !== undefined
                  ? data.hasRejectedFromInstitutions
                  : null,
              hasFinancialDealsOutsideKSA:
                data?.hasFinancialDealsOutsideKSA !== undefined
                  ? data.hasFinancialDealsOutsideKSA
                  : null,
            }
            break
        }
      }
    },
    { immediate: true }
  )
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
    gap: 0 12px;
  }

  .company-modal__item :deep(.n-form-item-label) {
    display: inline;
  }

  .company-modal__item-button {
    width: 70px;
  }

  .company-modal__select {
    width: 240px;
    margin: 0;
  }

  .company-modal__button {
    margin-top: 12px;
  }
</style>
