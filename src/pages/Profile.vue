<template>
  <div class="profile">
    <div class="profile-block profile-block__left">
      <div class="profile-block__heading">
        <div class="profile-block__heading-wrapper">
          <h1 class="profile-block__title">Profile</h1>
          <div class="profile-block__subtitle">
            <span class="profile-block__subtitle-text">Investor status:</span>
            <span class="profile-block__subtitle-value">Advanced</span>
          </div>
        </div>
        <div class="profile-block__desk">
          Welcome to your profile. Here you will find all the information about you, including your
          name, position, phone number and other important data.
        </div>
      </div>
      <div class="profile-block__img-wrapper">
        <img
          src="@/assets/img/profile.png"
          alt="Profile picture"
          class="profile-block__img"
        />
      </div>
      <div class="profile-block__content">
        <div class="profile-block__inputs">
          <div class="profile-block__input">
            <div class="profile-block__status-label">Name:</div>
            <input
              v-model="fullName"
              class="profile-block__status-input"
              type="text"
            />
          </div>
          <div class="profile-block__input">
            <div class="profile-block__status-label">Job Title:</div>
            <input
              v-model="jobTitle"
              class="profile-block__status-input"
              type="text"
            />
          </div>
          <div class="profile-block__input">
            <div class="profile-block__status-label">Date of Birth:</div>
            <input
              v-model="dateBirth"
              class="profile-block__status-input"
              type="text"
            />
          </div>
          <div class="profile-block__input">
            <div class="profile-block__status-label">Mobile Number:</div>
            <input
              v-model="phoneNumber"
              class="profile-block__status-input"
              type="text"
            />
          </div>
        </div>
        <div class="profile-block__status">
          <div class="profile-block__status-list">
            <div class="profile-block__status-label">KYC:</div>
            <div class="profile-block__status-item">
              <div class="profile-block__status-sublabel">Success</div>
              <div class="profile-block__status-text">Success</div>
            </div>
          </div>
          <div class="profile-block__status-list">
            <div class="profile-block__status-label">KYB:</div>
            <div class="profile-block__status-item">
              <div class="profile-block__status-sublabel">Success</div>
              <div class="profile-block__status-text">Success</div>
            </div>
          </div>
        </div>
        <div
          class="profile-block__button"
          @click="updateInfo"
        >
          Request to update info
        </div>
      </div>
    </div>
    <div class="profile-block profile-block__right">
      <h2 class="profile-block__title profile-block__right-title">Documents</h2>
      <div class="profile-block__desk">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis dui sed ante
        ultricies, id commodo purus tristique. In quis faucibus ligula.
      </div>
      <div class="profile-block__docs">
        <div class="profile-block__docs-item">
          <div class="profile-block__docs-icon">
            <img
              src="@/assets/img/pdf.svg"
              alt="pdf"
            />
          </div>
          <div class="profile-block__docs-name">document_name.pdf</div>
        </div>
        <div class="profile-block__docs-item">
          <div class="profile-block__docs-icon">
            <img
              src="@/assets/img/pdf.svg"
              alt="pdf"
            />
          </div>
          <div class="profile-block__docs-name">document_name.pdf</div>
        </div>
        <div class="profile-block__docs-item">
          <div class="profile-block__docs-icon">
            <img
              src="@/assets/img/pdf.svg"
              alt="pdf"
            />
          </div>
          <div class="profile-block__docs-name">document_name.pdf</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useMainStore } from '../stores/main.js'
  import moment from 'moment'

  const mainStore = useMainStore()
  const data = ref({})
  const fullName = ref('')
  const jobTitle = ref('')
  const dateBirth = ref('')
  const phoneNumber = ref('')

  onMounted(async () => {
    await fetchData()
  })

  const fetchData = async () => {
    data.value = await mainStore.fetchUserM()
    fullName.value = `${data.value.data.last_name} ${data.value.data.first_name}`
    phoneNumber.value = data.value.data.phone_number
    jobTitle.value = data.value.data.job_title
    dateBirth.value = data.value.data.date_of_birth
      ? moment(data.value.data.date_of_birth).format('DD.MM.YYYY')
      : ''
  }

  const updateInfo = async () => {
    await fetchData()
  }
</script>
<style scoped>
  .profile {
    display: flex;
    gap: 44px;
    margin: 32px 50px;
  }

  .profile-block {
    padding: 42px 32px;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0px 4px 4px 0px #00000008;
  }

  .profile-block__left {
    width: 55%;
  }

  .profile-block__right {
    height: fit-content;
    width: 45%;
  }

  .profile-block__heading {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 34px;
  }

  .profile-block__heading-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .profile-block__title {
    font-size: 32px;
    font-weight: 700;
    line-height: 39.01px;
    color: #3a4347;
  }

  .profile-block__subtitle {
    display: flex;
    align-items: flex-end;
    gap: 7px;
  }

  .profile-block__right-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 19.5px;
    color: #000000;
    margin-bottom: 26px;
  }

  .profile-subtitle {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .profile-block__subtitle-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #000000;
  }

  .profile-block__subtitle-value {
    font-size: 16px;
    font-weight: 600;
    line-height: 19.5px;
    color: #0cc17c;
  }

  .profile-block__desk {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #1e293b;
  }

  .profile-block__img-wrapper {
    width: 100%;
    height: 236px;
    margin-bottom: 25px;
    border-radius: 32px;
    overflow: hidden;
  }

  .profile-block__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-block__content {
    display: flex;
    flex-direction: column;
  }

  .profile-block__inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 24px;
  }

  .profile-block__status-input {
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

  .profile-block__status-input:focus {
    border: 1px solid #ffffff;
  }

  .profile-block__input {
    width: 100%;
    max-width: 340px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    gap: 21px;
  }

  .profile-block__status-label {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #000000;
  }

  .profile-block__status {
    display: flex;
    justify-content: space-between;
    gap: 55px;
    margin-bottom: 42px;
  }

  .profile-block__status-list {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 100%;
  }

  .profile-block__status-label {
    font-size: 14px;
    font-weight: 500;
    line-height: 17.07px;
    color: #000000;
  }

  .profile-block__status-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid #0cc17ab2;
  }

  .profile-block__status-sublabel {
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

  .profile-block__status-text {
    font-size: 16px;
    font-weight: 700;
    line-height: 19.5px;
    background: linear-gradient(90deg, #0cc17c 40.41%, #56d986 50.91%, #119b55 61.84%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .profile-block__button {
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
    background: linear-gradient(90deg, #83ccf5 0%, #3ba8e6 52.5%, #1884d3 100%);
    box-shadow: 0px 4px 10px 0px #45a5f280;
  }

  .profile-block__docs {
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 34px;
    padding-right: 55px;
  }

  .profile-block__docs-item {
    min-width: 200px;
    display: flex;
    gap: 12px;
    cursor: pointer;
  }

  .profile-block__docs-icon {
    width: 24px;
    height: 24px;
  }

  .profile-block__docs-name {
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    color: #1e293b;
  }
</style>
