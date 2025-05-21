import { ref } from 'vue'

export const modals = ref([])

const showModal = (params) => {
  modals.value = params
}

const closeModal = () => {
  if (modals.value?.closeModalFunc) modals.value?.closeModalFunc()
  modals.value = []
}

export const useModals = {
  show: showModal,
  close: closeModal,
}

export default useModals
