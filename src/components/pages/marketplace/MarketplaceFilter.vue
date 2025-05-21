<template>
  <div class="market-place-filter bg-white border border-gray-300 shadow-lg rounded-md mt-0 p-4">
    <!-- Industry Filter -->
    <form
      class="grid grid-cols-7 gap-[20px]"
      @submit.prevent="submitFilter"
    >
      <div v-if="props.filterOptions.industry">
        <label class="mp-filter__label block text-sm font-medium mb-2">
          {{ props.filterOptions.industry.label }}
        </label>

        <select
          v-model="localFilters.industry"
          class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
        >
          <option
            v-for="option in props.filterOptions.industry.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div v-if="props.filterOptions.period">
        <label class="mp-filter__label block text-sm font-medium mb-2">
          {{ props.filterOptions.period.label }}
        </label>

        <select
          v-model="localFilters.period"
          class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
        >
          <option
            v-for="option in props.filterOptions.period.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Period Filter -->
      <div v-if="props.filterOptions.periodRange">
        <label class="mp-filter__label block text-sm font-medium mb-2">
          {{ props.filterOptions.periodRange.label }}
        </label>

        <div class="flex space-x-2">
          <input
            v-model="localFilters.tenure_range_min"
            type="tel"
            placeholder="From"
            class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
          />

          <input
            v-model="localFilters.tenure_range_max"
            type="tel"
            placeholder="To"
            class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
          />
        </div>
      </div>

      <!-- Return Filter -->
      <div v-if="props.filterOptions.return">
        <label class="mp-filter__label block text-sm font-medium mb-2">
          {{ props.filterOptions.return.label }}
        </label>

        <div class="flex space-x-2">
          <input
            v-model="localFilters.return_to_investors_range_min"
            type="tel"
            placeholder="From"
            class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
          />

          <input
            v-model="localFilters.return_to_investors_range_max"
            type="tel"
            placeholder="To"
            class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
          />
        </div>
      </div>

      <!-- Sort Filter -->
      <div v-if="props.filterOptions.sort">
        <label class="mp-filter__label block text-sm font-medium mb-2">
          {{ props.filterOptions.sort.label }}
        </label>

        <select
          v-model="localFilters.ordering"
          class="market-place-filter__input w-full bg-white border border-green rounded-lg p-2 focus:green focus:outline-none"
        >
          <option
            v-for="option in props.filterOptions.sort.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Sort Direction -->
      <div v-if="props.filterOptions.sortDirection">
        <label class="mp-filter__label block text-sm font-medium mb-2">
          {{ props.filterOptions.sortDirection.label }}
        </label>

        <button
          type="button"
          class="market-place-filter__input w-full flex items-center justify-center border border-green px-4 py-2 bg-white rounded-lg hover:bg-green-700 transition"
          @click="
            localFilters.sort_direction === 'asc'
              ? (localFilters.sort_direction = 'desc')
              : (localFilters.sort_direction = 'asc')
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 transition-transform ease-in-out duration-200"
            :class="localFilters.sort_direction === 'asc' ? 'rotate-0' : 'rotate-180'"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>

          <span class="w-[90px] text-left">
            {{ localFilters.sort_direction === 'asc' ? 'Ascending' : 'Descending' }}
          </span>
        </button>
      </div>

      <div class="mt-6 flex w-full justify-end space-x-4">
        <button
          type="button"
          class="border border-gray-400 text-gray-600 px-4 py-2 rounded-lg"
          @click="clearFilter"
        >
          Reset
        </button>

        <button
          type="submit"
          class="border border-green px-4 py-2 bg-green text-white rounded-lg hover:bg-teal-700 transition"
          @click="submitFilter"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    filterOptions: {
      type: Object,
      required: true,
    },
    filters: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['update:filters', 'clear:filters'])
  const localFilters = ref(props.filters)

  const clearFilter = () => {
    emit('clear:filters')
  }

  const submitFilter = () => {
    emit('update:filters', localFilters.value)
  }

  watch(
    () => props.filters,
    (newFilters) => {
      localFilters.value = newFilters
    }
  )
</script>

<style lang="scss">
  .market-place-filter__input {
    border-width: 1px;
  }

  .mp-filter__label {
    white-space: nowrap;
  }
</style>
