<template>
  <div class="flex flex-col gap-10 justify-center items-center sidebar bg-white">
    <img
      src="@/assets/icons/logo.png"
      alt="Esage"
      class="w-[100%] object-contain mt-5"
    />

    <n-menu
      :options="menuOptions"
      class="w-full"
    />

    <div class="mt-auto p-8 text-center sidebar__footer">
      <n-button
        type="error"
        @click="logout"
      >
        Logout
      </n-button>
    </div>
  </div>
</template>

<script setup>
  import { h, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { NIcon, NMenu, NButton } from 'naive-ui'
  import {
    PeopleOutline as UsersIcon,
    HomeOutline as HomeIcon,
    StorefrontOutline as StoreIcon,
    CashOutline as CashIcon,
    PersonOutline as ProfileIcon,
    SettingsOutline as SettingsIcon,
    WalletOutline as WalletIcon,
    BusinessOutline as BuildingIcon,
    NotificationsOutline as NotificationsIcon,
    ListOutline as LogsIcon,
  } from '@vicons/ionicons5'
  import { useRouter } from 'vue-router'
  import { useMainStore } from '@/stores/main'

  const router = useRouter()
  const mainStore = useMainStore()
  const currentRole = computed(() => localStorage.getItem('role')?.toLowerCase() || '')

  const hasRoleAccess = (allowedRoles) => {
    if (!currentRole.value) return true

    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(currentRole.value)
    }

    return allowedRoles === currentRole.value
  }

  const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  const createMenuItem = (options) => {
    const { name, route, icon, roleAccess = true } = options

    return {
      label: () => h(RouterLink, { to: { name: route } }, { default: () => name }),
      key: route.toLowerCase(),
      icon: renderIcon(icon),
      show: roleAccess,
    }
  }

  const menuOptions = [
    createMenuItem({
      name: 'Marketplace',
      route: 'Marketplace',
      icon: StoreIcon,
      roleAccess: hasRoleAccess('investor'),
    }),
    createMenuItem({
      name: 'My offers',
      route: 'Offers',
      icon: BuildingIcon,
      roleAccess: !hasRoleAccess(['investor', 'guarantor']),
    }),
    createMenuItem({
      name: 'Guarantees',
      route: 'Guarantees',
      icon: BuildingIcon,
      roleAccess: hasRoleAccess('guarantor'),
    }),
    createMenuItem({
      name: 'My Campaigns',
      route: 'MyCampaigns',
      icon: BuildingIcon,
      roleAccess: !hasRoleAccess(['guarantor']),
    }),
    createMenuItem({ name: 'Dashboard', route: 'Dashboard', icon: HomeIcon }),
    createMenuItem({
      name: 'Wallet',
      route: 'Wallet',
      icon: WalletIcon,
      roleAccess: !hasRoleAccess(['guarantor']),
    }),
    createMenuItem({
      name: 'Investments',
      route: 'Investments',
      icon: CashIcon,
      roleAccess: hasRoleAccess('investor'),
    }),
    createMenuItem({
      name: 'Loans',
      route: 'Loans',
      icon: UsersIcon,
      roleAccess: !hasRoleAccess(['investor', 'guarantor']),
    }),
    createMenuItem({ name: 'Notifications', route: 'Notifications', icon: NotificationsIcon }),
    createMenuItem({
      name: 'My Company',
      route: 'Companies',
      icon: BuildingIcon,
      roleAccess: !hasRoleAccess('investor'),
    }),
    createMenuItem({ name: 'My profile', route: 'Profile', icon: ProfileIcon }),
    createMenuItem({ name: 'Settings', route: 'Settings', icon: SettingsIcon }),
    createMenuItem({ name: 'Logs', route: 'Logs', icon: LogsIcon }),
  ]

  const logout = async () => {
    try {
      await router.push({ name: 'Login' })
      await mainStore.logout()
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error)
    }
  }
</script>

<style>
  .sidebar {
    box-shadow: 6px 0px 16px 0px #00000012;
    position: relative;
    z-index: 2;
  }

  .n-menu .n-menu-item-content .n-menu-item-content-header .router-link-exact-active::before {
    border-right: 3px solid var(--primary-color);
  }

  .n-menu .n-menu-item-content::before {
    left: 0;
    right: 0;
  }

  .sidebar__footer {
    position: sticky;
    bottom: 0;
  }
</style>
