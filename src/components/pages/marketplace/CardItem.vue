<template>
  <div class="card">
    <div class="card-content">
      <div class="card-img__wrapper">
        <img
          v-if="data?.image"
          :src="data?.image"
          alt="Construction of social housing"
          class="card-image"
        />
        <img
          v-else
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzy5lqTLeK8AtGhvUZU2a8cWMZmfvYWXleig&s"
          alt="Construction of social housing"
          class="card-image"
        />
      </div>
      <h2 class="card-title">{{ data?.title }}</h2>
      <p class="card-date__end">Ends on {{ formattedDate }}</p>
      <div class="card-progress">
        <div
          class="card-progress__bar"
          :style="{
            width: `${data?.involved_investment_amount_percent > 100 ? 100 : data?.involved_investment_amount_percent}%`,
          }"
        >
          <span class="card-progress__text">
            Raised <span class="block">{{ data?.involved_investment_amount_percent }}%</span>
          </span>
        </div>
      </div>
      <div class="card-finance">
        <div class="card-finance__item">
          <span class="card-finance__label">Finance Amount: </span>
          <span class="card-finance__value"
            >{{ formatCurrency(data?.finance_amount) }}&nbsp;SAR</span
          >
        </div>
        <div class="card-finance__item">
          <span class="card-finance__label">Risk Score: </span>
          <span class="card-finance__value card-finance__score">
            {{ data?.risk_score?.total_value ?? '-' }} \
            {{ data?.risk_score?.grade ?? '-' }}
          </span>
        </div>
      </div>
      <p class="card-description">
        {{ data?.descrition }}
      </p>
      <div class="card-line"></div>
      <div class="card-details">
        <div class="card-details__block">
          <div class="card-details__item">
            <span class="card-details__label">Tenure:</span>
            <span class="card-details__value card-details__tenure">
              {{ data?.tenure }} {{ data?.period }}
            </span>
          </div>
          <div class="card-details__item">
            <span class="card-details__label">Investment amount:</span>
            <span class="card-details__value card-details__amount">
              {{ formatCurrency(data?.installment_amount || data?.involved_investment_amount) }}
              SAR
            </span>
          </div>
        </div>
        <div class="card-details__block">
          <div class="card-details__item">
            <span class="card-details__label">Return to Investors:</span>
            <span class="card-details__value">{{ data?.return_to_investors }} %</span>
          </div>
          <div class="card-details__item">
            <span class="card-details__label">Collateral Coverage:</span>
            <span class="card-details__value">{{ data?.collateral_coverage_percentage }} %</span>
          </div>
        </div>
      </div>

      <!-- <button v-if="isInvest" class="card-btn__invest">Invest</button> -->
      <button
        class="card-btn__details"
        @click="handleViewDetails"
      >
        View details
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, computed, defineEmits } from 'vue'
  import moment from 'moment'
  import { formatCurrency } from '@/utils/format'

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  })
  const formattedDate = computed(() => moment(props.data?.campaign_end_date).format('MMMM, YYYY'))
  const emit = defineEmits(['view-details'])
  const handleViewDetails = () => {
    emit('view-details', props.data?.id) // Эмит события с ID кампании
  }
</script>

<style scoped>
  .card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0px 0px 4px 5px #00000008;
    overflow: hidden;
  }

  .card-content {
    padding: 22px;
    min-width: 300px;
  }

  .card-img__wrapper {
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .card-image {
    width: 100%;
    height: 246px;
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
    height: 32px;
    background: linear-gradient(90deg, #cae0ff 55.85%, #f1f8ff 100%);
    border-radius: 12px;
    margin-bottom: 22px;
  }

  .card-progress__bar {
    position: relative;
    height: 32px;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    position: absolute;
    left: 0;
    padding: 10px;
    font-size: 12px;
    font-weight: 700;
    line-height: 14.63px;
    color: #ffffff;
  }

  .card-finance {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-bottom: 16px;
  }

  .card-finance__item {
    padding: 12px 10px;
    border-radius: 12px;
    background: #f3f8fd;
  }

  .card-finance__label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    line-height: 14.63px;
    color: #477285;
  }

  .card-finance__value {
    display: block;
    font-weight: bold;
    font-size: 14px;
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

  .card-line {
    width: 100%;
    height: 1px;
    margin-bottom: 18px;
    background: #ecf4fd;
  }

  .card-details {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
  }

  .card-details__block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .card-details__item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-details__label {
    font-size: 13px;
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
