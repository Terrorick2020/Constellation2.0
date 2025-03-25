import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {

  const filters: {
    [key: string]: any
  } = reactive({
    company_category: '',
    category: [],
    geo: [],
    age: [],
    price: [],
    scope_activity: []
  })

  const totalFilters = computed(() => {
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length
      }
      return count + (value ? 1 : 0)
    }, 0)
  })

  const allArrays = computed(() => {
    return Object.values(filters)
      .filter(Array.isArray)
      .flatMap((x) => x)
  })

  const resetFilters = () => {
    Object.keys(filters).forEach((key) => {
      filters[key] = Array.isArray(filters[key]) ? [] : ''
    })
  }


  const deleteGeneralTag = (label: string) => {
    Object.keys(filters).forEach((key) => {
      //@ts-ignore
      if (Array.isArray(filters[key])) {
        //@ts-ignore
        filters[key] = filters[key].filter((item) => item !== label)
      }
    })
  }

  return {
    filters,
    totalFilters,
    allArrays,
    deleteGeneralTag,
    resetFilters
  }
})
