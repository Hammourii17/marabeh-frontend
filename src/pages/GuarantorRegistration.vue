<template>
  <div class="min-h-screen flex">
    <div class="flex-1 items-center registration-page">
      <div class="registration-logo__wrapper">
        <img
          src="@/assets/icons/logo.png"
          alt="Esage"
          width="250"
          class="object-cover registration-logo !w-[320px]"
        />
      </div>

      <template v-if="!isLoading && !isUrlExpired">
        <TSteps
          v-model="currentStep"
          type="Guarantor"
          :role="guarantor?.role || guarantor?.role_type"
        />

        <div class="registration-container">
          <div
            v-if="currentStep === 1"
            class="w-2/4 pl-[64px] p-8"
          >
            <!-- Header Section -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center gap-3">
                <div class="bg-blue-100 rounded-lg">
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h1 class="text-2xl font-semibold text-gray-900">Guarantor Onboarding Initiated</h1>
              </div>
              <p class="text-gray-600">
                You have been nominated as a guarantor for the following entity. This registration
                establishes your legal responsibilities under our platform agreement.
              </p>
            </div>

            <!-- Company Details Card -->
            <div class="bg-gray-50 rounded-lg border border-gray-200">
              <h3 class="text-sm font-semibold text-gray-500 mb-4">COMPANY BEING GUARANTEED</h3>

              <div class="space-y-4">
                <div>
                  <p class="text-xs font-medium text-gray-400">Legal Name</p>
                  <p class="text-gray-900 font-medium">
                    {{ guarantor?.borrower_delegator_full_name }}
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs font-medium text-gray-400">CR Number</p>
                    <p class="text-gray-900 font-mono">{{ guarantor?.borrower_cr_number }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isIndividualGuaranter"
            class="registration-path"
          >
            <Step4Individ
              v-show="currentStep === 1"
              ref="step4Element"
              :guarantor="guarantor"
              :disable-previous-step="true"
              @next-step="handleStep1Individual"
              @previous-step="previousStep"
              @save-data="saveData('step4', $event)"
            />

            <Step5
              v-show="currentStep === 2"
              :role-type="isIndividualGuaranter"
              :guarantor="guarantor"
              @next-step="handleStep2Individual"
              @save-data="saveData('step5', $event)"
            />

            <Step6Individual
              v-show="currentStep === 3"
              @previous-step="previousStep"
              @next-step="finishRegistration"
              @save-data="saveData('step6', $event)"
            />
          </div>

          <div
            v-else
            class="registration-path"
          >
            <Step2Guarantor
              v-show="currentStep === 1"
              ref="step4Element"
              :guarantor="guarantor"
              @modal-data="handleStep1"
              @previous-step="previousStep"
              @save-data="saveData('step2', $event)"
            />

            <Step4
              v-show="currentStep === 2"
              ref="step4Element"
              :guarantor="guarantor"
              @next-step="handleStep2"
              @previous-step="previousStep"
              @save-data="saveData('step4', $event)"
            />

            <Step5
              v-show="currentStep === 3"
              :role-type="isIndividualGuaranter"
              @next-step="handleStep3"
              @save-data="saveData('step3', $event)"
            />
          </div>
        </div>
      </template>
      <template v-else-if="isLoading">
        <div></div>
      </template>
      <template v-else>
        <!-- todo url expired -->
        <div class="registration-path flex items-center justify-center py-8">
          <div class="text-xl text-gray-600 text-center">
            <p>This guarantor link has expired. Please contact support to request a new link.</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, getCurrentInstance, computed, onMounted, provide } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import Step2Guarantor from '@/components/registration/Step2Guarantor.vue'
  import Step4 from '@/components/registration/Step4.vue'
  import Step4Individ from '@/components/registration/Step4Individ.vue'
  import Step5 from '@/components/registration/Step5.vue'
  import Step6Individual from '@/components/registration/Step6Individual.vue'
  import TSteps from '@/components/ui/TSteps.vue'
  import { useGoogleRecaptcha } from '@/composables/useRecaptcha'
  import { useRegistrationStore } from '@/stores/registration'
  import { useGuarantorStore } from '@/stores/guarantor'
  import { useMainStore } from '@/stores/main'
  import { useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const mainStore = useMainStore()
  const guarantorStore = useGuarantorStore()
  const { isUrlExpired, guarantor } = storeToRefs(guarantorStore)
  const registrationStore = useRegistrationStore()
  const { getRecaptchaToken, loadRecaptcha } = useGoogleRecaptcha()
  const isLoading = ref(true)
  const isSendingData = ref(false)
  const step4Element = ref(null)
  const tokenFromUrl = route.params.token

  provide('isLoading', isSendingData)

  loadRecaptcha()
  const { step: currentStep, companyType } = storeToRefs(registrationStore)
  const instance = getCurrentInstance()
  const $http = instance.appContext.config.globalProperties.$http
  const formData = ref({
    companyType: companyType.value,
  })

  const isIndividualGuaranter = computed(() => guarantor.value?.role === 'INDIVIDUAL_GUARANTOR')

  const previousStep = () => {
    if (currentStep.value > 1) {
      setStep(currentStep.value - 1)
    }
  }

  const setStep = (step) => {
    registrationStore.setStep(step)
  }

  const handleStep1 = async (data) => {
    try {
      const formData = {
        name: data.companyName,
        cr_number: data.companyNumber,
        guarantor: guarantor.value.id,
        phone: data.companyPhone,
        type: data.companyType,
        role_type: guarantor.value.role_type,
        recaptcha_token: await getRecaptchaToken('register'),
      }

      const response = await $http.post(`organization/organizations/`, formData)

      await mainStore.login(response)
      registrationStore.setFormData('step4', formData)
      registrationStore.setAuthKey(true)

      setStep(2)
    } catch (e) {
      console.log('error', e)
    }
  }

  const handleStep2 = async (data) => {
    isSendingData.value = true
    try {
      const formData = {
        full_name: data.fullName,
        national_id: data.nationalId,
        date_of_birth: data.dateBirth,
        guarantor: guarantor.value.id,
        phone_number: data.phoneNumber,
        password: data.password,
        password2: data.confirmPassword,
        email: data.email,
        confirm_email: data.confirmEmail,
        recaptcha_token: await getRecaptchaToken('register'),
      }

      await $http.patch(`user/profile/`, formData)

      registrationStore.setFormData('step4', formData)

      setStep(3)
    } catch (e) {
      isSendingData.value = false
      console.log('error', e)
    }
  }

  const handleStep3 = async (data) => {
    try {
      await $http.patch(`organization/organization/guarantor/update_state/`, {
        status: 'ONBOARDED',
      })

      finishRegistration()
    } catch (e) {
      console.log('error', e)
    }
  }

  const handleStep1Individual = async (data) => {
    isSendingData.value = true

    try {
      const formData = {
        full_name: data.fullName,
        national_id: data.nationalId,
        date_of_birth: data.dateBirth,
        phone_number: data.phoneNumber,
        guarantor: guarantor.value.id,
        password: data.password,
        password2: data.confirmPassword,
        email: data.email,
        confirm_email: data.confirmEmail,
        questionnaire_results: {},
        recaptcha_token: await getRecaptchaToken('register'),
      }

      const response = await $http.post(`user/individual-guarantor/register/`, formData)

      registrationStore.setFormData('step4', formData)

      // const response = await $http.post('token/', {
      //   email: data.email,
      //   password: data.password,
      //   recaptcha_token: await getRecaptchaToken('login'),
      // })
      await mainStore.login(response)

      setStep(2)
    } catch (e) {
      isSendingData.value = false
      console.log('error', e)
    }
  }

  const handleStep2Individual = async (data) => {
    try {
      await $http.patch(`organization/organization/guarantor/update_state/`, {
        status: 'ONBOARDED',
      })

      setStep(3)
    } catch (e) {
      console.log('error', e)
    }
  }

  const finishRegistration = async () => {
    await registrationStore.setAuthKey(false)
    await registrationStore.reset()

    router.push({ name: 'Dashboard' })
  }

  const saveData = (step, data) => {
    registrationStore.setFormData(step, data)
  }

  onMounted(async () => {
    try {
      await guarantorStore.fetchGuarantorInfoByToken(tokenFromUrl)
      registrationStore.setAuthKey(true)
    } catch (e) {
      registrationStore.setAuthKey(false)
      console.log('error', e)
    }
    isLoading.value = false

    registrationStore.loadFromLocalStorage()

    if (currentStep.value === 1) {
      // await mainStore.logout()
    }

    formData.value.companyType = companyType.value

    await Promise.all([
      registrationStore.fetchIndustries(),
      registrationStore.fetchFinancePurposes(),
      registrationStore.fetchEmployeerRoles(),
    ])
  })
</script>

<style scoped>
  .n-card {
    width: 39%;
    max-width: 750px;
    box-shadow: 0px 3px 5px 0px rgba(151, 151, 151, 0.1);
    border-radius: 20px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .registration-page {
    display: flex;
    flex-direction: column;
    gap: 32px;
    background: #ecf4fd;
  }

  .registration-logo__wrapper {
    padding-top: 32px;
    position: relative;
  }

  .registration-logo {
    width: 100%;
    height: 100%;
  }

  .registration-container,
  .registration-path {
    width: 1140px;
    gap: 32px;
    border-radius: 48px;
    background: #ffffff;
  }
</style>

<style>
  .modal-window {
    padding: 0;
  }

  .company-modal__item .n-form-item-feedback-wrapper {
    display: none;
  }

  .registration-step__container .n-form-item-feedback-wrapper {
    /* display: none; */
  }
</style>
