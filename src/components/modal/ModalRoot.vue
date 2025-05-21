<template>
  <div
    v-if="modals.a"
    class="modal-wrapper"
  >
    <div
      class="modal-fade"
      @click="modals?.c?.clickToClose === true ? close() : null"
    ></div>
    <div
      class="modal-window shadow-2xl"
      :class="{
        'modal-window_no-padding': modals?.c?.noPadding,
        [`modal-window--${modals?.c?.size}`]: modals?.c?.size,
      }"
    >
      <svg
        v-if="modals?.c?.clickToClose === true"
        class="modal-root__close-button"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        @click="close"
      >
        <rect
          width="24"
          height="24"
          rx="12"
          fill="#95A5BD"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.9998 13.2123L15.0301 16.2432C15.1909 16.404 15.409 16.4943 15.6364 16.4943C15.8638 16.4943 16.0819 16.404 16.2427 16.2432C16.4035 16.0824 16.4938 15.8643 16.4938 15.6369C16.4938 15.4095 16.4035 15.1914 16.2427 15.0306L13.2113 12.0003L16.2421 8.97006C16.3217 8.89044 16.3848 8.79592 16.4279 8.69191C16.4709 8.5879 16.4931 8.47643 16.4931 8.36385C16.493 8.25128 16.4708 8.13982 16.4277 8.03583C16.3846 7.93184 16.3215 7.83735 16.2418 7.75777C16.1622 7.67819 16.0677 7.61507 15.9637 7.57202C15.8597 7.52896 15.7482 7.50681 15.6356 7.50684C15.5231 7.50687 15.4116 7.52907 15.3076 7.57217C15.2036 7.61527 15.1091 7.67844 15.0296 7.75806L11.9998 10.7883L8.96956 7.75806C8.89053 7.67615 8.79598 7.61081 8.69142 7.56584C8.58687 7.52087 8.47441 7.49717 8.3606 7.49613C8.24679 7.49509 8.13391 7.51672 8.02855 7.55977C7.92319 7.60282 7.82746 7.66642 7.74694 7.74686C7.66643 7.8273 7.60274 7.92297 7.55959 8.02829C7.51644 8.13361 7.4947 8.24647 7.49563 8.36028C7.49657 8.47409 7.52016 8.58657 7.56503 8.69117C7.60991 8.79577 7.67516 8.89038 7.75699 8.96948L10.7884 12.0003L7.75756 15.0306C7.59676 15.1914 7.50643 15.4095 7.50643 15.6369C7.50643 15.8643 7.59676 16.0824 7.75756 16.2432C7.91836 16.404 8.13644 16.4943 8.36384 16.4943C8.59125 16.4943 8.80933 16.404 8.97013 16.2432L11.9998 13.2118V13.2123Z"
          fill="white"
        />
      </svg>
      <div class="modal-conent">
        <component
          :is="modals.a"
          v-bind="modals.b"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { modals } from './modal'
  import { watch } from 'vue'

  const close = () => {
    modals.value = []
  }

  watch(modals, (value) => {
    document.body.style.overflow = (Array.isArray(value) ? value.length !== 0 : value)
      ? 'hidden'
      : null
  })
</script>

<style lang="scss">
  .modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 222;
  }

  .modal-root {
    &__close-button {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }

  .modal-fade {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    opacity: 0.4;
    z-index: 111;
  }

  .modal-window {
    padding: 34px 72px;
    min-width: 300px;
    max-width: 100%;
    background: #fff;
    z-index: 222;
    max-height: 100vh;
    border-radius: 24px;
    position: relative;
    max-width: 600px;
    display: flex;
    overflow: hidden;

    @media (max-width: 800px) {
      padding-left: 20px;
      padding-right: 20px;
    }

    &_no-padding {
      padding: 0;
      max-width: none;
    }

    &__title {
      color: #202123;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      margin-bottom: 20px;
      text-align: center;
    }
  }

  .modal-conent {
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .dp__range_end,
  .dp__range_start,
  .dp__active_date {
    background: var(--theme-primary-color) !important;
  }

  .dp__today {
    border-color: var(--theme-primary-color) !important;
  }

  .dp__action_cancel {
    background: #000 !important;
    color: #fff !important;
  }

  .dp__action_select {
    background: var(--theme-primary-color) !important;
    color: #fff !important;
  }

  .wallet-modal {
    .modal-content {
      font-size: 25px;
    }

    h3 {
      font-size: 1.65rem;
      text-align: center;
    }

    .title {
      font-size: 16px;
      text-align: left;

      span {
        font-size: 12px;
      }

      &--example {
        font-size: 14px;
        padding-top: 5px;
        opacity: 0.6;
        margin-bottom: 0;
      }
    }

    .input-modal {
      font-weight: 600;
      height: 42px;
      font-size: 16px;
      margin-bottom: 15px;
    }

    .error-modal {
      margin-top: 20px;
      color: #d69d51;
      font-size: 14px;
    }

    .server-fee {
      text-align: left;
      line-height: 41px;
      font-size: 16px;
      font-weight: 600;
      text-indent: 11px;
      background: none;
      border: 1px solid #e3e3e3;
      border-radius: 5px;
      height: 42px;
      width: 100%;
    }
  }

  .modal-action-button {
    font-weight: 600;
    text-align: left;
    background: var(--theme-primary-color);
    border: 1px solid var(--theme-primary-color);
    border-radius: 4px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 50px;
    width: 100%;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      color: white;
    }
  }

  .modal-dialog-paragraph {
    text-align: center;
    color: #777777;
    font-size: 12px;
    margin-bottom: 3px;

    &--checkbox {
      margin-bottom: 0;
      margin-top: 15px;
      text-align: left;
      margin-left: 10px;
    }
  }

  .modal-dialog-title-paragraph {
    font-weight: 600;
  }

  .v--modal-box.v--modal {
    margin-bottom: 15px !important;
    display: flex;
    width: fit-content !important;
    left: 50% !important;
    transform: translateX(-50%);

    @media (max-width: 375px) {
      width: 285px !important;
    }

    @media (max-width: 750px) {
      margin-top: 65px;
    }

    .modal-dialog {
      margin: 0 !important;
      width: 100%;
    }
  }

  @media (min-width: 576px) {
    .modal-sm {
      max-width: 345px;
    }
  }

  .modal-success {
    background: var(--theme-primary-color);
    color: #fff;
    font-size: 16px;
  }

  .form-control.form-control-modal {
    font-weight: 600;
    font-size: 16px;
    height: 42px;
  }
</style>
