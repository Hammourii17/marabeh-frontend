<template>
  <div class="p-[30px]">
    <div class="bg-white p-[33px] rounded-[16px]">
      <div class="justify-between flex gap-4 items-center">
        <div class="block-title">
          {{ offer?.status === 'DRAFT' ? '[Draft]' : '' }} {{ offer?.title }}
        </div>
        <div
          class="flex justify-center gap-2 items-center cursor-pointer card-btn"
          @click="
            () => {
              router.push({ name: 'Offers' })
            }
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_341_3463)">
              <path
                d="M9.69997 18.29C10.09 17.9 10.09 17.27 9.69997 16.88L5.82997 13L21 13C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11L5.82997 11L9.70997 7.11999C10.1 6.72999 10.1 6.09999 9.70997 5.70999C9.31997 5.31999 8.68997 5.31999 8.29997 5.70999L2.69997 11.3C2.30997 11.69 2.30997 12.32 2.69997 12.71L8.28997 18.29C8.67997 18.68 9.31997 18.68 9.69997 18.29Z"
                fill="#59C2F1"
              />
            </g>
            <defs>
              <clipPath id="clip0_341_3463">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="matrix(0 -1 1 0 0 24)"
                />
              </clipPath>
            </defs>
          </svg>
          Back
        </div>
      </div>

      <div class="flex gap-4">
        <div class="w-3/5 flex gap-8">
          <div class="w-1/2">
            <div
              class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4"
            >
              <div class="text-[#477285] font-bold">
                Current status:
                <span class="text-[#63A1A4]">{{ STATUS[offer.status] ?? offer.status }}</span>
              </div>
            </div>

            <div
              class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4"
            >
              <div class="text-[#477285] font-bold">
                Funding Amount:
                <span class="text-[#63A1A4]">{{ formatCurrency(offer.finance_amount) }} SAR</span>
              </div>
            </div>
            <!-- <div class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2">
                <div class="text-[#477285] font-bold">Full refund amount: <span class="text-[#63A1A4]">
                    - SAR</span></div>
              </div> -->
            <div
              class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4"
            >
              <div class="text-[#477285] font-bold">
                Interest Rate:
                <span class="text-[#63A1A4]">{{ offer.profit_rate }} %</span>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div
              class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4"
            >
              <div class="text-[#477285] font-bold">
                Product:
                <span class="text-[#63A1A4]">{{ offer.product }}</span>
              </div>
            </div>

            <div
              class="flex justify-between rounded-md bg-[#F3F8FD] h-[40px] items-center px-2 mb-4"
            >
              <div class="text-[#477285] font-bold">
                Tenure:
                <span class="text-[#63A1A4]">{{ offer.tenure }} {{ offer.period }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Agreement
        v-if="campaingForAgree?.status === 'CROWDFUNDING_AGREEMENT_OTP'"
        type="crowdfunding"
        :crowd-founding-data="crowdFoundingData"
        checkbox-text="I agree and accept Crowdfunding Agreement"
        button-text="Agree"
        @accept="openVerifyModalEmdha('CROWDFUNDING_AGREEMENT_SIGNED')"
      />

      <Agreement
        v-if="offer.status === 'BORROWER_OTP'"
        :crowd-founding-data="crowdFoundingData"
        type="draftOffer"
        checkbox-text="I agree and accept draft offer"
        button-text="Agree"
        @accept="openVerifyModalDraftOffer"
      />

      <Agreement
        v-if="
          user.guarantor?.status === 'WAITING_AGREEMENT_SIGN' ||
          user.organization?.guarantor?.status === 'WAITING_AGREEMENT_SIGN'
        "
        :guarantor-data="guarantorData"
        type="guarantor"
        checkbox-text="I agree to the terms "
        button-text="Approve Guarantee"
        @accept="openVerifyModalDraftOffer"
      />
    </div>
  </div>

  <div class="flex gap-4 p-[33px] bg-[#EEF4FB]">
    <!-- <div class="w-1/4">
      <div class="rounded-[16px] bg-white px-[16px] py-[23px] mb-[26px] shadow-sm">
        <div class="block-title text-center">Construction of social housing</div>
        <div class="rounded-[16px] overflow-hidden mb-4">
          <img SARc="@/assets/img/image.png" />
        </div>
      </div>
    </div> -->
    <!-- <div class="w-3/4 rounded-[16px] bg-white px-[16px] py-[23px] shadow-sm">
      <div class="block-subtitle">Payment schedule</div>
      <div class="table">
        <div class="table-header">
          <div class="table-cell">Type</div>
          <div class="table-cell">Date</div>
          <div class="table-cell">Amount</div>
          <div class="table-cell">Status</div>
          <div class="table-cell">Action</div>
        </div>
        {{ offer }}
        <div v-for="loan in data" class="table-row">
          <div class="table-cell">Payment</div>
          <div class="table-cell">20 September 2024</div>
          <div class="table-cell amount">{{ loan.finance_amount }} SAR</div>
          <div class="table-cell status"><span class="status-badge">{{ loan.status }}</span></div>
          <div class="table-cell action"><button class="pay-button">Pay</button></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Agreement from '@/components/Agreement/Agreement.vue'
  import useModals from '@/components/modal/modal'
  import Otp from '@/modals/registration/Otp.vue'
  import useOtp from '@/composables/useOtp'
  import { STATUS } from '@/utils/status'
  import { useMainStore } from '~/stores/main'
  import { formatCurrency } from '@/utils/format'

  const mainStore = useMainStore()
  const router = useRouter()
  const route = useRoute()
  const offer = ref({})
  const campaings = ref([])

  const { sendCode, verifyOtp } = useOtp()
  const { user } = storeToRefs(mainStore)
  const campaingForAgree = computed(() =>
    campaings.value.find((element) => element.status === 'CROWDFUNDING_AGREEMENT_OTP')
  )

  const fetchData = async () => {
    offer.value = await mainStore.fetchOffer(route.params.id).catch((error) => {
      console.log('error', error)
    })
    campaings.value = await mainStore.fetchOfferCampaigns(route.params.id).catch((error) => {
      console.log('error', error)
    })
    await mainStore.fetchUser()
  }

  onMounted(async () => {
    await fetchData()
  })

  const crowdFoundingData = computed(() => {
    return {
      user: user.value,
      offer: offer.value,
      campaing: campaingForAgree.value,
    }
  })

  const guarantorData = computed(() => {
    return {
      guarantor: user.value,
      offer: offer.value,
      tenure: offer.value.tenure,
      finance_amount: offer.value.finance_amount,
      total_amount: offer.value.total_amount,
    }
  })

  const openVerifyModalEmdha = async (status) => {
    sendCode({ phone_number: user.value.phone_number })

    useModals.show({
      a: Otp,
      b: {
        data: user.value.phone_number,
        fakeType: 'EMDHA',
        type: 'sms',
        verifyCodeFunction: async (code) => {
          const data = {
            phone_number: user.value.phone_number,
            code,
          }

          await verifyOtp(data).then(async () => {
            try {
              await mainStore.updateCampaignStatus(campaingForAgree.value.id, status)
            } catch (e) {
              console.log('error', e)
            }

            setTimeout(async () => {
              await fetchData()
            }, 1000)
          })
        },
        resendFunction: () => {
          const data = {
            phone_number: user.value.phone_number,
          }

          return sendCode(data)
        },
      },
      c: { clickToClose: true },
    })
  }

  const openVerifyModalDraftOffer = async () => {
    sendCode({ phone_number: user.value.phone_number })

    useModals.show({
      a: Otp,
      b: {
        data: user.value.phone_number,
        type: 'sms',
        verifyCodeFunction: async (code) => {
          const data = {
            phone_number: user.value.phone_number,
            code,
          }

          await verifyOtp(data).then(async () => {
            if (user.value.role_type.includes('GUARANTOR')) {
              await mainStore.updateGuarantorStatus('AGREEMENT_SIGNED')
            } else {
              await mainStore.updateOfferStatus(offer.value.id, 'BORROWER_OTP_SIGNED')
            }

            setTimeout(async () => {
              await fetchData()
            }, 1000)
          })
        },
        resendFunction: () => {
          const data = {
            phone_number: user.value.phone_number,
          }

          return sendCode(data)
        },
      },
      c: { clickToClose: true },
    })
  }
</script>

<style scoped>
  .card-btn {
    border: 1px solid #1e8ad8;
    color: #1e8ad8;
    border-radius: 12px;
    font-size: 14px;
    padding: 5px;
    text-align: center;
    margin-bottom: 8px;
  }

  .card-btn.yellow {
    color: #ffb22f;
    border: 1px solid #ffb22f;
  }

  .card-btn.green {
    color: #0dc65e;
    border: 1px solid #0dc65e;
  }

  .card-btn.light {
    color: #53bef1;
    border: 1px solid #53bef1;
  }

  .table {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Расстояние между строками */
  }

  .table-header,
  .table-row {
    display: flex;
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    gap: 30px;
  }

  .table-header {
    background-color: #f3f4f6;
    font-weight: bold;
    color: #333333;
    margin-bottom: 10px;
  }

  .table-row {
    background-color: #f9fbfc;
    margin-bottom: 10px;
  }

  .table-cell {
    flex: 1;
    text-align: left;
  }

  .table-cell.amount {
    color: #10b981;
    font-weight: bold;
  }

  .table-cell.status {
    flex: 0.8;
  }

  .status {
    color: #ffffff;
    background: linear-gradient(90deg, #a6def5 0%, #50c5f8 100%);
    padding: 5px 10px;
    border-radius: 20px;
    text-align: center;
  }

  .pay-button {
    color: #ffffff;
    background: linear-gradient(90deg, #0bb9ab 0%, #0cc17a 52.5%, #0dc94c 100%);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    font-weight: bold;
    min-width: 150px;
  }

  .pay-button:hover {
    opacity: 0.9;
  }

  .amount {
    color: #10b981;
    font-weight: bold;
  }

  .card-investments {
    padding: 30px;
    border-radius: 32px;
    margin-bottom: 32px;
    background-image: url('../assets/img/my-investments.png');
    background-position: center;
    background-size: 100% 100%;
  }

  .terms-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
