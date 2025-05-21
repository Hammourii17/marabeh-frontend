// @ts-ignore
import type { NavigationGuard } from 'vue-router';
// @ts-ignore
import { useMainStore } from "@/stores/main"

export const authGuard: NavigationGuard = async (routeTo, from, next) => {
  const mainStore = useMainStore()
  // Получаем экземпляр queryClient из глобального Vue app

  const isAuth = !!mainStore.user && Object.keys(mainStore.user || {}).length > 0
  const isRegisterAuth = localStorage.getItem("isRegisterAuth") === "true"

  // Предзагрузка данных пользователя до перехода на страницу
  // Запрашиваем только если есть токен, но нет данных пользователя
  if (localStorage.getItem("token") && !isAuth && routeTo.name !== 'Login') {
    try {
      await mainStore.fetchUser()

      // Загрузка данных кошелька через TanStack Query, если пользователь не гарант
      if (!mainStore.user?.role_type?.includes('GUARANTOR')) {
        await mainStore.getBallance()
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error)
    }
  }

  const userRole = mainStore.user?.role_type

  if ((userRole === 'INSTITUTIONAL_INVESTOR' || userRole === 'INSTITUTIONAL_BORROWER') && mainStore.user?.is_verified === false && routeTo.name !== 'AwaitReview' && !isRegisterAuth) {
    next({ name: "AwaitReview" })
    return
  }

  if ((userRole === 'INSTITUTIONAL_INVESTOR' || userRole === 'INSTITUTIONAL_BORROWER') && mainStore.user?.status === 'KYB_OTP' && routeTo.name !== 'Verification' && !isRegisterAuth) {
    next({ name: "Verification" })
    return
  }

  if (routeTo.path.includes("/registration")) {
    next() // Не выполняем никаких редиректов
    return
  }

  if (routeTo.path.includes("/login")) {
    next() // Не выполняем никаких редиректов
    return
  }

  if (!localStorage.getItem("token")) {
    if (routeTo.meta.authRequired) {
      localStorage.setItem('savedRoute', routeTo.fullPath)
      next({ name: "Login" })
    } else {
      next()

      return
    }
  }

  if (localStorage.getItem("token")) {
    if (isRegisterAuth && routeTo.name === 'GuarantorRegistration') {
      next()

      return
    }

    if (isRegisterAuth && (routeTo.name !== 'Registration' && routeTo.name !== 'GuarantorRegistration')) {
      next({ name: "Registration" })

      return
    }


    if (routeTo.meta.accessRole) {
      const role = localStorage.getItem("role")?.toLocaleLowerCase()

      // @ts-ignore - Игнорируем ошибку типа для meta.accessRole
      if (role && Array.isArray(routeTo.meta.accessRole) && routeTo.meta.accessRole.includes(role)) {
        next()

        return
      } else {
        next({ name: "Dashboard" })

        return
      }
    }

    if (!routeTo.meta.authRequired) {
      next({ name: "Dashboard" })
      return
    }
  }

  next()
}
