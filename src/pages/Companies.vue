<template>
  <div class="company">
    <div class="company-block company-block__left">
      <div class="company-block__heading">
        <div class="company-block__heading-wrapper">
          <h1 class="company-block__title">Company Info</h1>
        </div>
        <div class="company-block__desk">
          Welcome to your company info. Here you will find all the information about your company
          like full name of comapny, CR Number, Type of company and other important data.
        </div>
      </div>
      <div class="company-block__img-wrapper">
        <img
          src="@/assets/img/companies.png"
          alt="company picture"
          class="company-block__img"
        />
      </div>
      <div class="company-block__content">
        <div class="company-block__inputs">
          <div class="company-block__input">
            <div class="company-block__status-label">Company full name:</div>
            <input
              v-model="name"
              class="company-block__status-input"
              type="text"
            />
          </div>
          <div class="company-block__input">
            <div class="company-block__status-label">CR number:</div>
            <input
              v-model="crNumber"
              class="company-block__status-input"
              type="text"
            />
          </div>
          <div class="company-block__input">
            <div class="company-block__status-label">Type:</div>
            <input
              v-model="typeV"
              class="company-block__status-input"
              type="text"
            />
          </div>
          <div class="company-block__input">
            <div class="company-block__status-list">
              <div class="company-block__status-label">KYC:</div>
              <div class="company-block__status-item">
                <div class="company-block__status-sublabel">Success</div>
                <div class="company-block__status-text">Success</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="company-block__button"
          @click="fetchData"
        >
          Request to update info
        </div>
      </div>
    </div>
    <div class="company-block company-block__right">
      <h2 class="company-block__title company-block__right-title">Guarantors List</h2>
      <div class="company-block__desk">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis dui sed ante
        ultricies, id commodo purus tristique. In quis faucibus ligula.
      </div>
      <div class="company-block__guarantors">
        <div class="table-grid">
          <div class="table-header">
            <div class="table-cell">Full name</div>
            <div class="table-cell">National ID/CR</div>
            <div class="table-cell">Phone Num.</div>
          </div>
          <div class="table-row">
            <div class="table-cell">Test Full Name Guarantor 1</div>
            <div class="table-cell">1058529940</div>
            <div class="table-cell">+966 523 12 43</div>
          </div>
          <div class="table-row">
            <div class="table-cell">Longer Full Name That Goes Here</div>
            <div class="table-cell">123456789012345</div>
            <div class="table-cell">+966 512 34 5678</div>
          </div>
          <div class="table-row">
            <div class="table-cell">Short Name</div>
            <div class="table-cell">987654321</div>
            <div class="table-cell">+966 500 00 00 00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useMainStore } from '~/stores/main'

  const mainStore = useMainStore()
  const data = ref({})
  const fullName = ref('')
  const crNumber = ref('')
  const typeV = ref('')
  const name = ref('')

  onMounted(async () => {
    await fetchData()
  })

  const fetchData = async () => {
    data.value = await mainStore.fetchUserM()

    name.value = data.value.data.organization?.name
    typeV.value = data.value.data.organization?.type
    crNumber.value = data.value.data.organization?.cr_number
  }

  const updateInfo = async () => {
    await fetchData()
  }
</script>
<style scoped>
  .company {
    display: flex;
    gap: 44px;
    margin: 32px 50px;
  }

  .company-block {
    padding: 42px 32px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0px 4px 4px 0px #00000008;
  }

  .company-block__left {
    width: 55%;
  }

  .company-block__right {
    height: fit-content;
    width: 45%;
  }

  .company-block__heading {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 34px;
  }

  .company-block__heading-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .company-block__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 39.01px;
    color: #3a4347;
  }

  .company-block__right-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 19.5px;
    color: #000000;
    margin-bottom: 26px;
  }

  .company-subtitle {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .company-block__subtitle-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #000000;
  }

  .company-block__subtitle-value {
    font-size: 16px;
    font-weight: 600;
    line-height: 19.5px;
    color: #0cc17c;
  }

  .company-block__desk {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #1e293b;
  }

  .company-block__img-wrapper {
    width: 100%;
    height: 236px;
    margin-bottom: 25px;
    border-radius: 32px;
    overflow: hidden;
  }

  .company-block__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .company-block__content {
    display: flex;
    flex-direction: column;
  }

  .company-block__inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 50px;
  }

  .company-block__input {
    width: 100%;
    max-width: 340px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 21px;
  }

  .company-block__status {
    display: flex;
    justify-content: space-between;
    gap: 55px;
    margin-bottom: 42px;
  }

  .company-block__status-list {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 100%;
  }

  .company-block__status-label {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #000000;
  }

  .company-block__status-input {
    width: 100%;
    padding: 16px 24px;
    margin-bottom: 16px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    border: 1px solid #e4f6ff;
    background: #f3f8fd;
    outline: none;
    transition: 0.3s;
  }

  .company-block__status-input:focus {
    border: 1px solid #ffffff;
  }

  .company-block__status-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid #80ba7a;
  }

  .company-block__status-sublabel {
    position: absolute;
    top: -7px;
    left: 27px;
    padding: 0 12px;
    background: #ffffff;
    font-size: 12px;
    font-weight: 600;
    line-height: 14.63px;
    color: #3a4347;
  }

  .company-block__status-text {
    font-size: 16px;
    font-weight: 700;
    line-height: 19.5px;
    background: linear-gradient(90deg, #0cc17c 40.41%, #56d986 50.91%, #119b55 61.84%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .company-block__button {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 340px;
    height: 72px;
    border-radius: 16px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    line-height: 19.5px;
    color: #ffffff;
    background: linear-gradient(90deg, #80ba7a 0%, #80ba7a 52.5%, #63a1a4 100%);
    box-shadow: 0px 4px 10px 0px #80ba7a;
  }

  .company-block__docs {
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 34px;
    padding-right: 55px;
  }

  .company-block__docs-item {
    min-width: 200px;
    display: flex;
    gap: 12px;
  }

  .company-block__docs-icon {
    width: 24px;
    height: 24px;
  }

  .company-block__docs-name {
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    color: #1e293b;
  }

  .company-block__guarantors-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    color: #000000;
    margin-top: 60px;
  }

  .company-block__guarantors-name {
    width: 200px;
  }

  .company-block__guarantors {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .table-grid {
    display: grid;
    gap: 8px;
    border-radius: 16px;
  }

  .table-header,
  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    /* Задаем пропорции колонок */
    align-items: center;
    /* Центрируем содержимое по вертикали */
    background-color: #f0f7ff;
    padding: 12px;
    border-radius: 8px;
  }

  .table-header {
    margin-top: 48px;
    color: #333333;
    background-color: transparent;
    /* Убираем фон для заголовков */
  }

  .table-row {
    font-weight: 400;
    color: #555555;
  }

  .table-cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Обрезка текста с многоточием */
  }

  .table-cell:first-child {
    max-width: 200px;
    /* Ограничиваем ширину для длинных имен */
  }

  .table-cell:nth-child(2),
  .table-cell:nth-child(3) {
    max-width: 150px;
  }
</style>
