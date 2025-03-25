import { defineStore } from 'pinia'

export const useSpheresStore = defineStore('business_spheres', () => {
  const business_spheres = [
    { value: 'IT и разработка', label: 'IT и разработка' },
    { value: 'Финансы и банкинг', label: 'Финансы и банкинг' },
    { value: 'Маркетинг и реклама', label: 'Маркетинг и реклама' },
    { value: 'Производство', label: 'Производство' },
    { value: 'Торговля', label: 'Торговля' }
  ];

  const filter_scope_activity_input = ref([])
  const filter_loading_scope_activity = ref(false)
  const scope_activity_options = ref<any[]>([])

  const filteredScopeActivityList = (query: string) => {
    if (!query) {
      return
    }

    filter_loading_scope_activity.value = true

    setTimeout(() => {
      filter_loading_scope_activity.value = false
      scope_activity_options.value = business_spheres.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 1000)
  }

  return {
    filter_scope_activity_input,
    filter_loading_scope_activity,
    scope_activity_options,
    filteredScopeActivityList,
  }
})
