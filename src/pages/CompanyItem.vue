<template>
  <div class="card">
    <div class="w-4/6">
      <div class="text-2xl mb-5">{{ item.title }}</div>
      <div class="card-img__wrapper">
        <img
          src="/src/assets/img/card-plug.png"
          alt="Investment image"
          class="w-full object-cover rounded-md card-image"
        />
      </div>
      <div class="card-progress">
        <div
          class="card-progress__bar"
          :style="{ width: `${raisedPercentage}%` }"
        >
          <span class="card-progress__text">Raised {{ raisedPercentage }}%</span>
        </div>
      </div>
      <div class="card-finance">
        <div class="card-finance__item">
          <div class="card-finance__label">Starts on:</div>
          <div class="card-finance__value">
            {{ moment(item.campaign_start_date).format('DD.MM.YYYY') }}
          </div>
        </div>
        <div class="card-finance__item">
          <div class="card-finance__label">Finance Amount:</div>
          <div class="card-finance__value">{{ formatCurrency(item.finance_amount) }} SAR</div>
        </div>
        <div class="card-finance__item">
          <div class="card-finance__label">Ends on:</div>
          <div class="card-finance__value">
            {{ moment(item.campaign_start_date).format('DD.MM.YYYY') }}
          </div>
        </div>
        <div class="card-finance__item">
          <div class="card-finance__label">Risk Score:</div>
          <div class="card-finance__value card-finance__score">
            {{ item?.risk_score?.total_value ?? '-' }} \
            {{ item?.risk_score?.grade ?? '-' }}
          </div>
        </div>
      </div>

      <div class="card-details">
        <div class="card-details__item">
          <span class="card-details__label">Tenure:</span>
          <span class="card-details__value card-details__tenure"
            >{{ item.tenure }} {{ item.period }}</span
          >
        </div>
        <div class="card-details__item">
          <span class="card-details__label">Investment amount:</span>
          <span class="card-details__value card-details__amount">
            {{ formatCurrency(item.involved_investment_amount) }} SAR
          </span>
        </div>
        <div class="card-details__item">
          <span class="card-details__label">Return to Investors:</span>
          <span class="card-details__value">{{ item.return_to_investors }} %</span>
        </div>
        <div class="card-details__item">
          <span class="card-details__label">Collateral Coverage:</span>
          <span class="card-details__value">{{ item.collateral_coverage_percentage }} %</span>
        </div>
      </div>

      <div class="mb-7 mt-4">
        <div class="font-bold mb-2">Documents</div>

        <div class="card-assesment">
          <a
            :href="`${item?.assessment_report || ''}`"
            class="flex gap-2"
            target="_blank"
          >
            <img
              width="15px"
              src="@/assets/img/pdf.svg"
            />
            <span>Assesment report</span>
          </a>
        </div>
      </div>

      <div>
        <div class="mb-4 font-bold">Description</div>

        <p class="card-description">
          {{ item.description }}
        </p>
      </div>
    </div>
    <div class="w-2/6 relative">
      <div
        class="flex justify-center gap-2 items-center cursor-pointer card-btn"
        @click="
          () => {
            router.push({ name: 'Marketplace' })
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
      <div
        v-if="currentUser.role_type === 'INSTITUTIONAL_BORROWER'"
        class="card-investments card-investments-borrower"
      >
        <div class="card-investments__title">My investments</div>
        <div class="card-investments__sum">{{ formatCurrency(item.my_investments) }} SAR</div>
        <div class="card-investments__desc">Already invested in the project</div>
        <div class="card-investments__btn">Get investments</div>
        <div class="card-investments__bottom">
          <div class="card-investments__line" />
          <div class="card-investments__total">
            <div class="card-finance__label">Total Investors:</div>
            <div class="card-finance__value">11 534</div>
          </div>
          <div class="card-investments__amount">
            <div class="card-finance__label">Amount of payment:</div>
            <div class="card-finance__value">70,423.00 SAR</div>
          </div>
        </div>
      </div>
      <div
        v-if="currentUser.role_type === 'INSTITUTIONAL_INVESTOR' || 'INDIVIDUAL_INVESTOR'"
        class="card-investments"
      >
        <div class="card-investments__title">My investments</div>
        <div class="card-investments__sum">{{ formatCurrency(item.my_investments) }} SAR</div>
        <div class="card-investments__desc">Already invested in the project</div>
        <div class="card-investments__btn">Withdraw</div>
      </div>
      <div
        v-if="currentUser.role_type === 'INSTITUTIONAL_INVESTOR' || 'INDIVIDUAL_INVESTOR'"
        class="card-calc"
      >
        <div class="card-calc__title">Investor Calc.</div>
        <div class="card-calc__input">
          <div class="card-calc__label">Investment Amount:</div>
          <input
            placeholder="Enter amount"
            class="card-calc__field"
            type="text"
          />
        </div>
        <div class="card-calc__list">
          <div class="card-calc__item">
            <div class="card-calc__label">Investment Period:</div>
            <div class="card-calc__value">{{ item.monthly_return_to_investors }} Month</div>
          </div>
          <div class="card-calc__item">
            <div class="card-calc__label">Return to Investors:</div>
            <div class="card-calc__value">{{ item.return_to_investors_percentage }} %</div>
          </div>
          <div class="card-calc__item">
            <div class="card-calc__label">Investment return:</div>
            <div class="card-calc__label">{{ formatCurrency(item.investment_amount) }} SAR</div>
          </div>
        </div>
        <div class="card-calc__total">
          <div class="card-calc__total-title">Total Return</div>
          <div class="card-calc__total-sum">0.00 SAR</div>
        </div>
      </div>

      <!-- <template v-if="item?.status === 'ACTIVE' || item?.status === 'PARTIALLY_COLLECTED'">
        <div
          class="btn-large mb-[34px]"
          @click="doInvest"
        >
          Asset Invest
        </div>
        <div v-if="showButton">
          <input
            v-model="amount"
            style="border: 1px solid #3c437a; border-radius: 5px; font-size: 16px; padding: 5px"
          />
          <n-button
            v-if="showButton"
            type="success"
            size="large"
            @click="invest"
            >Invest</n-button
          >
        </div>
      </template> -->
    </div>
  </div>
</template>

<script setup>
  import { useMessage } from 'naive-ui'
  import { ref, onMounted, computed, getCurrentInstance } from 'vue'
  import { useMainStore } from '~/stores/main'
  import { useRoute, useRouter } from 'vue-router'
  import { app } from '@/main'
  import moment from 'moment'
  import { formatCurrency } from '@/utils/format'

  const instance = getCurrentInstance()
  const $http = instance.appContext.config.globalProperties.$http
  const message = useMessage()
  const mainStore = useMainStore()
  const route = useRoute()
  const router = useRouter()
  const item = ref({})
  const risk = ref({})
  const risk2 = ref({})
  const showButton = ref(false)
  const currentUser = ref({})
  const amount = ref(0)

  onMounted(async () => {
    await mainStore.fetchUserCompanies()
    const response0 = await app.config.globalProperties.$http.get('user/profile/')
    currentUser.value = response0.data
    await fetchComapnyItem()
    const responseRisk = await app.config.globalProperties.$http.get(
      `wizard/wizards/?code=RISK_SCORE_MODEL`
    )
    risk.value = responseRisk.data.results
    const responseRisk2 = await app.config.globalProperties.$http.get(
      `wizard/wizards/${risk.value[0].id}/`
    )
    risk2.value = responseRisk.data
  })

  const doInvest = async () => {
    const response = await app.config.globalProperties.$http.post(
      `campaign/campaigns/${route.params.id}/assign`
    )
    showButton.value = true

    await fetchComapnyItem()
  }

  const fetchComapnyItem = async () => {
    const response = await app.config.globalProperties.$http.get(
      `campaign/campaigns/${route.params.id}/`
    )
    item.value = response.data
  }

  const updateBalance = async () => {
    await mainStore.getBalance()
  }

  const invest = async () => {
    try {
      await $http.post(`investment/investments/`, {
        organization: currentUser.value.organization.id,
        campaign: route.params.id,
        amount: amount.value,
      })
      message.success('Success', {
        keepAliveOnHover: true,
      })

      await Promise.all([fetchComapnyItem(), updateBalance()])
    } catch (e) {
      console.log('error', e)
      message.error('Error', {
        keepAliveOnHover: true,
      })
    } finally {
      console.log('finnaly')
    }
  }

  const raisedPercentage = computed(() => {
    const totalAmount = item.value.finance_amount // Общая сумма финансирования (захардкожено из верстки)
    const raisedAmount = item.value.involved_investment_amount || 0 // Используемое значение
    return ((raisedAmount / totalAmount) * 100).toFixed(2) // Расчет процента
  })
</script>
<style scoped>
  .card {
    display: flex;
    gap: 50px;
    margin: 34px 48px;
    padding: 28px 40px;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
  }

  .card-content {
    padding: 22px;
  }

  .card-img__wrapper {
    border-radius: 25px;
    overflow: hidden;
    margin-bottom: 32px;
  }

  .card-image {
    width: 100%;
    height: 320px;
    object-fit: cover;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 21.94px;
    color: #3a4347;
    margin-bottom: 20px;
  }

  .card-date__end {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #3a4347;
    margin-bottom: 20px;
  }

  .card-progress {
    position: relative;
    height: 60px;
    background: linear-gradient(90deg, #cae0ff 55.85%, #f1f8ff 100%);
    border-radius: 12px;
    margin-bottom: 22px;
  }

  .card-progress__bar {
    position: relative;
    height: 60px;
    min-width: 115px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    border-radius: 12px;
    background: linear-gradient(
      90deg,
      rgba(103, 204, 255, 0.7) 0%,
      rgba(60, 179, 239, 0.7) 46%,
      rgba(69, 165, 242, 0.7) 100%
    );
  }

  .card-progress__text {
    z-index: 10;
    left: 0;
    padding: 15px;
    position: absolute;
    font-size: 12px;
    font-weight: 700;
    line-height: 14.63px;
    color: #ffffff;
  }

  .card-finance {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 16px;
  }

  .card-finance__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 48%;
    padding: 12px 30px;
    border-radius: 12px;
    background: #f3f8fd;
  }

  .card-finance__label {
    font-size: 16px;
    font-weight: 600;
    line-height: 14.63px;
    color: #477285;
  }

  .card-finance__value {
    font-weight: bold;
    font-size: 16px;
    color: #59c2f1;
  }

  .card-finance__score {
    color: #32c54e;
    white-space: nowrap;
  }

  .card-description {
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    color: #3a4347;
    margin-bottom: 12px;
  }

  .card-investments {
    padding: 30px;
    border-radius: 32px;
    margin-bottom: 32px;
    background-image: url('../assets/img/my-investments.png');
    background-position: center;
    background-size: 100% 100%;
  }

  .card-investments-borrower {
    background-image: url('../assets/img/my-investments-borrower.png');
  }

  .card-investments__title {
    font-size: 22px;
    font-weight: 700;
    line-height: 26.82px;
    color: #292929;
    margin-bottom: 18px;
  }

  .card-investments__sum {
    font-size: 24px;
    font-weight: 700;
    line-height: 29.26px;
    background: linear-gradient(90deg, #4ebcf0 0%, #107ccf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 6px;
  }

  .card-investments__desc {
    margin-bottom: 30px;
  }

  .card-investments__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 46px;
    border-radius: 16px;
    cursor: pointer;
    background: linear-gradient(90deg, #83ccf5 0%, #3ba8e6 52.5%, #1884d3 100%);
    font-size: 16px;
    font-weight: 600;
    line-height: 19.5px;
    color: #ffffff;
  }

  .card-investments__bottom {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 422px;
  }

  .card-investments__line {
    height: 1px;
    width: 100%;
    margin-bottom: 12px;
    background: #ffffff;
  }

  .card-investments__total {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 46px;
    width: 100%;
    border-radius: 12px;
    background: #ffffff;
  }

  .card-investments__amount {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    border-radius: 12px;
    background: #ffffff;
  }

  .card-calc {
    position: relative;
    padding: 24px;
    border-radius: 15px;
    border: 2px solid rgba(242, 245, 248, 0.5);
    box-shadow: 0px 2px 4px 0px rgba(140, 135, 135, 0.1);
    background-image: url('../assets/img/investor-calc.png');
    background-position: center;
    background-size: 100% 100%;
    margin-bottom: 32px;
  }

  .card-calc__title {
    font-size: 22px;
    font-weight: 700;
    line-height: 26.82px;
    color: #292929;
    margin-bottom: 24px;
  }

  .card-calc__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 50px;
  }

  .card-calc__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-calc__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #000000;
    margin-bottom: 12px;
  }

  .card-calc__field {
    width: 100%;
    padding: 16px 24px;
    margin-bottom: 16px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    border: 1px solid #e4f6ff;
    box-shadow: 0px 2px 10px 0px #00000014;
    outline: none;
    transition: 0.3s;
  }

  .card-calc__field:focus {
    border: 1px solid #ffffff;
  }

  .card-calc__value {
    font-size: 16px;
    font-weight: 600;
    line-height: 19.5px;
    color: #3a4347;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid #59c2f1;
    background: #f2f7ff;
  }

  .card-calc__total {
    position: relative;
    width: 340px;
    height: 72px;
    border: 1px solid #0cc17a;
    border-radius: 16px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card-calc__total-title {
    top: -7px;
    z-index: 10;
    background: #e4f5ff;
    position: absolute;
    width: 90px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 14.63px;
    color: #3a4347;
  }

  .card-calc__total-sum {
    font-size: 20px;
    font-weight: 700;
    line-height: 24.38px;
    background: linear-gradient(90deg, #0cc17c 40.41%, #56d986 50.91%, #119b55 61.84%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-btn {
    margin-left: auto;
    margin-bottom: 18px;
    width: 110px;
    border-radius: 15px;
    padding: 6px 20px;
    border: 1px solid #59c2f1;
    background: rgba(89, 194, 241, 0);
    color: #59c2f1;
    font-size: 14px;
  }

  .card-line {
    width: 100%;
    height: 1px;
    margin-bottom: 18px;
    background: #ecf4fd;
  }

  .card-details {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 32px;
    width: 100%;
    border-top: 1px solid #ecf4fd;
    border-bottom: 1px solid #ecf4fd;
  }

  .card-details__item {
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid #ecf4fd;
    padding: 12px;
    white-space: nowrap;
  }

  .card-details__item:first-child {
    border-left: none;
  }

  .card-details__label {
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    color: #3a4347;
  }

  .card-details__value {
    font-size: 16px;
    font-weight: 600;
    line-height: 19.5px;
    color: #3a4347;
  }

  .card-details__value {
    font-weight: bold;
  }

  .card-details__tenure {
    background: linear-gradient(90deg, #0bbb9f 0%, #0cc17c 50%, #0dc84f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-details__amount {
    background: linear-gradient(90deg, #4ebcf0 0%, #107ccf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-btn__details {
    width: 100%;
    padding: 12px;
    background: #5a99ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0px 2px 10px 0px #53bef180;
    background: #34a6e8;
  }

  .card-btn__details:hover {
    background: #127dd0;
  }

  .card-btn__invest {
    width: 100%;
    padding: 12px;
    background: #5a99ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0px 2px 10px 0px #53bef180;
    background: #0dc94c;
  }

  .card-btn__invest:hover {
    background: #0cc17a;
  }
</style>
