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

      <TSteps
        v-model="currentStep"
        :role="role"
      />

      <div class="registration-container">
        <Step1
          v-show="currentStep === 1"
          @next-step="handleStep1"
          @change-role="changeRole"
        />

        <div
          v-if="isIndividualInvestor"
          class="registration-path"
        >
          <Step4Individ
            v-show="currentStep === 2"
            ref="step4Element"
            @modal-data="handleStep4Individual"
            @previous-step="previousStep"
            @save-data="saveData('step4', $event)"
          />

          <Step5
            v-show="currentStep === 3"
            :role-type="isIndividualInvestor"
            @next-step="handleStep3Individual"
            @save-data="saveData('step5', $event)"
          />

          <Step6Individual
            v-show="currentStep === 4"
            @previous-step="previousStep"
            @next-step="finishRegistration"
            @save-data="saveData('step6', $event)"
          />
        </div>
        <div
          v-else
          class="registration-path"
        >
          <Step2
            v-show="currentStep === 2"
            ref="stepTwoRef"
            @modal-data="handleModalData"
            @next-step="handleStep2"
            @previous-step="previousStep"
            @save-data="saveData('step2', $event)"
          />

          <Step3
            v-show="currentStep === 3"
            :is-solo="isSolo"
            @next-step="handleSStep3"
            @next-step2="handleSStep3"
            @previous-step="previousStep"
            @save-data="saveData('step3', $event)"
          />

          <Step4
            v-show="currentStep === 4"
            ref="step4Element"
            @next-step="handleStep4"
            @previous-step="previousStep"
            @save-data="saveData('step4', $event)"
          />

          <Step5
            v-show="currentStep === 5"
            :role-type="isIndividualInvestor"
            @next-step="handleStep5"
            @save-data="saveData('step5', $event)"
          />

          <Step6
            v-show="currentStep === 6"
            @previous-step="previousStep"
            @next-step="finishRegistration"
            @save-data="saveData('step6', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, getCurrentInstance, computed, onMounted, provide } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import Step1 from '@/components/registration/Step1.vue'
  import Step2 from '@/components/registration/Step2.vue'
  import Step3 from '@/components/registration/Step3.vue'
  import Step4 from '@/components/registration/Step4.vue'
  import Step4Individ from '@/components/registration/Step4Individ.vue'
  import Step5 from '@/components/registration/Step5.vue'
  import Step6Individual from '@/components/registration/Step6Individual.vue'
  import Step6 from '@/components/registration/Step6.vue'
  import TSteps from '@/components/ui/TSteps.vue'
  import { useGoogleRecaptcha } from '@/composables/useRecaptcha'
  import { useMainStore } from '@/stores/main'
  import { useRegistrationStore } from '@/stores/registration'

  const router = useRouter()
  const mainStore = useMainStore()
  const registrationStore = useRegistrationStore()
  const { getRecaptchaToken, loadRecaptcha } = useGoogleRecaptcha()
  const isLoading = ref(false)
  const step4Element = ref(null)

  provide('isLoading', isLoading)

  loadRecaptcha()
  const {
    step: currentStep,
    role,
    companyType,
    isRegisterAuth,
    createdCompanyId,
  } = storeToRefs(registrationStore)
  const instance = getCurrentInstance()
  const $http = instance.appContext.config.globalProperties.$http
  const formData = ref({
    companyType: companyType.value,
    selectedRole: role.value,
  })
  const modalData = ref({})
  const stepTwoRef = ref(null)

  const handleModalData = (data) => {
    modalData.value = data

    handleStep2()
  }

  const isSolo = computed(() => companyType.value === 'SOLO')
  const isIndividualInvestor = computed(() => role.value === 'INDIVIDUAL_INVESTOR')

  const previousStep = () => {
    if (currentStep.value > 1) {
      setStep(currentStep.value - 1)
    }
  }

  const setStep = (step) => {
    registrationStore.setStep(step)
  }

  const changeRole = (role) => {
    registrationStore.setRole(role)
    formData.value.selectedRole = role
  }

  const handleStep1 = (data) => {
    registrationStore.setRole(data.selectedRole)
    formData.value = data

    setStep(2)
  }

  const handleStep2 = async () => {
    isLoading.value = true
    try {
      const data = {
        name: modalData.value.companyName,
        cr_number: modalData.value.companyNumber,
        phone: modalData.value.companyPhone,
        type: modalData.value.companyType,
        role_type: formData.value.selectedRole,
        questionnaire_results: modalData.value.questionnaire_results,
        recaptcha_token: await getRecaptchaToken('register'),
      }
      let response = null

      if (isRegisterAuth.value) {
        response = await $http.patch(`organization/organizations/${createdCompanyId.value}/`, data)
      } else {
        response = await $http.post('organization/organizations/', data)
        await mainStore.login(response)
      }

      registrationStore.setAuthKey(true)

      registrationStore.setCompanyType(modalData.value.companyType)
      registrationStore.setCompanyId(response.data.id)
      registrationStore.setFormData('step2', modalData.value)

      setStep(3)
    } catch (e) {
      console.log(stepTwoRef.value?.setPhoneError(e))
      registrationStore.setFormData('step2', modalData.value)
      console.log('error register', e)
    } finally {
      isLoading.value = false
      console.log('finnaly')
    }
  }

  const handleSStep3 = (item) => {
    const isSoloAllHasCertificate = isSolo.value && item.certificateFile?.length > 0
    const isCorporateAllHasCertificate =
      !isSolo.value && item.aoaFile?.length > 0 && item.certificateFile?.length > 0

    if (isSoloAllHasCertificate || isCorporateAllHasCertificate) {
      registrationStore.setFormData('step3', {
        ...item,
        isSolo: isSolo.value,
      })

      setStep(4)
    }
  }

  const handleStep4 = async (item) => {
    isLoading.value = true
    try {
      const data = {
        full_name: item.fullName,
        job_title: item.jobTitle,
        national_id: item.nationalId,
        date_of_birth: item.dateBirth,
        phone_number: item.phoneNumber,
        password: item.password,
        password2: item.confirmPassword,
        email: item.email,
        recaptcha_token: await getRecaptchaToken('register'),
      }
      await $http.patch('user/profile/', data)

      registrationStore.setFormData('step4', item)

      setStep(5)
    } catch (e) {
      if (e.status === 400 && e.data?.email?.find((item) => item.includes('email'))) {
        step4Element.value.setEmailError()
      }

      console.log('error', e)
    } finally {
      isLoading.value = false
      console.log('finnaly')
    }
  }

  const handleStep4Individual = async (item) => {
    isLoading.value = true
    try {
      const data = {
        full_name: item.fullName,
        national_id: item.nationalId,
        date_of_birth: item.dateBirth,
        phone_number: item.phoneNumber,
        password: item.password,
        password2: item.confirmPassword,
        email: item.email,
        confirm_email: item.confirmEmail,
        questionnaire_results: item.questionnaire_results,
        recaptcha_token: await getRecaptchaToken('register'),
      }

      const responsePersonal = await $http.post('user/individual-investor/register/', data)

      registrationStore.setFormData('step4', item)
      registrationStore.setAuthKey(true)

      setStep(3)

      await mainStore.login(responsePersonal)
    } catch (e) {
      if (e.status === 400 && e.data?.find((item) => item.includes('email'))) {
        step4Element.value.setEmailError()
      }

      console.log('error', e)
    } finally {
      isLoading.value = false
      console.log('finnaly')
    }
  }

  const handleStep3Individual = () => {
    setStep(4)
  }

  const handleStep5 = () => {
    if (role.value === 'INSTITUTIONAL_INVESTOR') {
      setStep(6)
    } else {
      finishRegistration()
    }
  }

  const finishRegistration = async () => {
    await registrationStore.setAuthKey(false)
    await registrationStore.reset()

    if (role.value === 'INDIVIDUAL_INVESTOR') {
      router.push({ name: 'Dashboard', query: { welcome: 1 } })
    } else {
      router.push({ name: 'AwaitReview' })
    }
  }

  const saveData = (step, data) => {
    registrationStore.setFormData(step, data)
  }

  onMounted(async () => {
    registrationStore.loadFromLocalStorage()

    if (currentStep.value === 1) {
      await mainStore.logout()
    }

    formData.value.selectedRole = role.value
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
