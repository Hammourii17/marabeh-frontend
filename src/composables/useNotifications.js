import { createDiscreteApi } from 'naive-ui'

const { notification } = createDiscreteApi(['notification'], {
  notificationProviderProps: {
    placement: 'bottom-right',
    max: 3,
  },
})

export const useNotifications = () => {
  return {
    notification,
  }
}
