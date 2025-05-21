<template>
  <div class="marketplace p-5 m-5 bg-gray-100 rounded-md">
    <!-- Фильтры -->
    <div class="relative">
      <div
        class="flex justify-between items-center p-[20px] bg-white rounded-md shadow-md mb-[40px] cursor-pointer"
      >
        <div
          class="bg-[#EF8C3E] px-5 rounded-lg p-2 text-white"
          @click="toggleFilterPanel"
        >
          Filters
        </div>

        <div class="pl-8 relative bg-[#F3F8FD] p-1 rounded-md">
          <svg
            class="absolute top-[13px] left-[10px]"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_424_2317)">
              <path
                d="M14.175 11.6667H13.5083L13.2833 11.4417C14.1 10.4917 14.5916 9.26667 14.5916 7.91667C14.5916 4.925 12.1666 2.5 9.17496 2.5C6.18329 2.5 3.75829 5 3.75829 7.91667H1.66663L4.86663 11.25L8.33329 7.91667H5.42496C5.42496 5.83333 7.10829 4.16667 9.17496 4.16667C11.2416 4.16667 12.925 5.84167 12.925 7.91667C12.925 9.98333 11.2416 11.6667 9.17496 11.6667C8.63329 11.6667 8.12496 11.55 7.65829 11.35L6.42496 12.5833C7.23329 13.0583 8.16663 13.3333 9.17496 13.3333C10.5166 13.3333 11.7416 12.8417 12.6916 12.025L12.9166 12.25V12.9083L17.0916 17.0667L18.3333 15.8333L14.175 11.6667Z"
                fill="url(#paint0_linear_424_2317)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_424_2317"
                x1="9.99996"
                y1="2.5"
                x2="9.99996"
                y2="17.0667"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF8520" />
                <stop
                  offset="0.535"
                  stop-color="#FFA229"
                />
                <stop
                  offset="1"
                  stop-color="#FFB730"
                />
              </linearGradient>
              <clipPath id="clip0_424_2317">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search campaigns"
            class="w-[300px] p-2 border-0 bg-[#F3F8FD] rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            @input="applySearch"
          />
        </div>
      </div>

      <MarketplaceFilter
        v-if="showFilters"
        :filter-options="filterOptions"
        :filters="filters"
        class="marketplace__filter absolute z-40 w-full"
        @update:filters="handleFiltersChange"
        @clear:filters="handleFiltersClear"
      />
    </div>

    <!-- Карточки -->
    <div
      v-if="invs.results?.length > 0"
      class="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <CardItem
        v-for="inv in invs.results"
        :key="inv?.id"
        :data="inv"
        @view-details="handleViewDetails"
      />
    </div>
    <div
      v-else
      class="text-center text-gray-500"
    >
      No results found
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import CardItem from '@/components/pages/marketplace/CardItem.vue'
  import { app } from '@/main'
  import MarketplaceFilter from '../components/pages/marketplace/MarketplaceFilter.vue'

  const route = useRoute()
  const router = useRouter()
  const showFilters = ref(false)
  const searchQuery = ref('')
  const invs = ref([])
  const industries = ref([])

  const filterOptions = computed(() => {
    return {
      industry: {
        type: 'select',
        label: 'Industry',
        options: [
          { label: 'All', value: '' },
          // Распаковка массива индустрий в объекты для селекта
          ...industries.value.map((industry) => ({
            label: industry.name_en,
            value: industry.id,
          })),
        ],
      },
      period: {
        type: 'select',
        label: 'Period type',
        options: [
          { label: 'All', value: '' },
          { label: 'Month', value: 'MONTH' },
          { label: 'Quarter', value: 'QUARTER' },
          { label: 'Semi annual', value: 'SEMI_ANNUAL' },
          { label: 'Annual', value: 'ANNUAL' },
        ],
      },
      periodRange: {
        type: 'range',
        label: 'Period',
        min: 0,
        max: 100,
        default: 0,
      },
      return: {
        type: 'range',
        label: 'Return to Investors %',
        min: 0,
        max: 100,
        default: 0,
      },
      sort: {
        type: 'select',
        label: 'Sort by',
        options: [
          { label: 'Default', value: '' },
          { label: 'Date', value: 'created_at' },
          { label: 'Risc score', value: 'risk_score' },
          { label: 'Finance Amount', value: 'finance_amount' },
          { label: 'Rised', value: 'involved_investment_amount' },
        ],
        default: 'created_at',
      },
      sortDirection: {
        type: 'toggle',
        label: 'Sort direction',
        options: [
          { label: 'Ascending', value: 'asc' },
          { label: 'Descending', value: 'desc' },
        ],
      },
    }
  })

  // Пустые фильтры для сброса
  const emptyFilters = {
    industry: '',
    tenure_range_min: null,
    tenure_range_max: null,
    return_to_investors_range_min: null,
    return_to_investors_range_max: null,
    period: '',
    ordering: '',
    sort_direction: '',
    search: '',
  }

  // Локальное состояние для фильтров
  const filters = ref({
    industry: route.query.industry || '',
    tenure_range_min: route.query.tenure_range_min ? Number(route.query.tenure_range_min) : null,
    tenure_range_max: route.query.tenure_range_max ? Number(route.query.tenure_range_max) : null,
    return_to_investors_range_min: route.query.return_to_investors_range_min
      ? Number(route.query.return_to_investors_range_min)
      : null,
    return_to_investors_range_max: route.query.return_to_investors_range_max
      ? Number(route.query.return_to_investors_range_max)
      : null,
    period: route.query.period || '',
    ordering: route.query.ordering || '',
    sort_direction: route.query.sort_direction || '',
    search: route.query.search || '',
  })

  // Фильтры для http запроса
  const filtersForFetch = computed(() => {
    const sortFlag =
      filters.value.sort_direction === '' || filters.value.sort_direction === 'desc' ? '-' : ''
    // Сортировка по умолчанию будет created_at, возможно стоит как-то иначе обработать
    const ordering = filters.value.ordering
      ? `${sortFlag}${filters.value.ordering}`
      : `${sortFlag}${filterOptions.value.sort.default}`

    // TODO можно заменить на цикл
    return {
      industry: filters.value.industry || undefined,
      tenure_range_min: filters.value.tenure_range_min || undefined,
      tenure_range_max: filters.value.tenure_range_max || undefined,
      return_to_investors_range_min: filters.value.return_to_investors_range_min || undefined,
      return_to_investors_range_max: filters.value.return_to_investors_range_max || undefined,
      period: filters.value.period || undefined,
      search: filters.value.search || undefined,
      ordering,
    }
  })

  const toggleFilterPanel = () => {
    showFilters.value = !showFilters.value
  }

  // Загрузка компейнов
  async function fetchCompanies(params = {}) {
    try {
      const response = await app.config.globalProperties.$http.get('campaign/campaigns/', {
        params: { ...params, limit: 100 },
      })
      invs.value = response.data // Обновление локального состояния
    } catch (error) {
      invs.value = [] // Очистка локального состояния
      console.error('Error fetching companies:', error)
    }
  }

  // Загрузка индустрий для фильтров
  const fetchIndustries = async () => {
    try {
      const response = await app.config.globalProperties.$http.get('organization/industries/')
      industries.value = response.data.results // Обновление локального состояния
    } catch (error) {
      industries.value = [] // Очистка локального состояния
      console.error('Error fetching industries:', error)
    }
  }

  // Применение поиска
  const applySearch = async () => {
    filters.value.search = searchQuery.value

    await fetchCompanies(filters.value)
  }

  // Загрузка данных при монтировании
  onMounted(async () => {
    await Promise.all([fetchIndustries(), fetchCompanies(filtersForFetch.value)])
  })

  // Обработчик изменения фильтров
  const handleFiltersChange = (newFilters) => {
    router.replace({
      query: {
        ...newFilters, // Все параметры фильтров напрямую в query
        industry: newFilters.industry || undefined,
        tenure_range_min: newFilters.tenure_range_min ? newFilters.tenure_range_min : undefined,
        tenure_range_max: newFilters.tenure_range_max ? newFilters.tenure_range_max : undefined,
        return_to_investors_range_min: newFilters.return_to_investors_range_min
          ? newFilters.return_to_investors_range_min
          : undefined,
        return_to_investors_range_max: newFilters.return_to_investors_range_max
          ? newFilters.return_to_investors_range_max
          : undefined,
        period: newFilters.period ? newFilters.period : undefined,
        ordering: newFilters.ordering ? newFilters.ordering : undefined,
        sort_direction: newFilters.sort_direction === 'asc' ? newFilters.sort_direction : undefined,
        search: newFilters.search || undefined,
      },
    })

    showFilters.value = false

    fetchCompanies(filtersForFetch.value)
  }

  const handleFiltersClear = () => {
    filters.value = { ...emptyFilters }

    handleFiltersChange(filters.value)
  }
  // Обработчик просмотра деталей
  const handleViewDetails = (id) => {
    router.push(`/marketplace/${id}`)
  }
</script>

<style lang="scss">
  .marketplace__filter {
    top: calc(100% + 15px);
  }
</style>
