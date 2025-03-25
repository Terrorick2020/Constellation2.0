import { defineStore } from 'pinia'

export const useGeoStore = defineStore('geo', () => {
  const { $api } = useNuxtApp()

  const geo_state = [
    { value: 'Москва', label: 'Москва' },
    { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
    { value: 'Новосибирск', label: 'Новосибирск' },
    { value: 'Екатеринбург', label: 'Екатеринбург' },
    { value: 'Казань', label: 'Казань' },
    { value: 'Нижний Новгород', label: 'Нижний Новгород' },
    { value: 'Челябинск', label: 'Челябинск' },
    { value: 'Самара', label: 'Самара' },
    { value: 'Омск', label: 'Омск' },
    { value: 'Ростов-на-Дону', label: 'Ростов-на-Дону' },
    { value: 'Уфа', label: 'Уфа' },
    { value: 'Красноярск', label: 'Красноярск' },
    { value: 'Воронеж', label: 'Воронеж' },
    { value: 'Пермь', label: 'Пермь' },
    { value: 'Волгоград', label: 'Волгоград' },
    { value: 'Краснодар', label: 'Краснодар' },
    { value: 'Саратов', label: 'Саратов' },
    { value: 'Тюмень', label: 'Тюмень' },
    { value: 'Тольятти', label: 'Тольятти' },
    { value: 'Ижевск', label: 'Ижевск' },
    { value: 'Барнаул', label: 'Барнаул' },
    { value: 'Иркутск', label: 'Иркутск' },
    { value: 'Ульяновск', label: 'Ульяновск' },
    { value: 'Хабаровск', label: 'Хабаровск' },
    { value: 'Ярославль', label: 'Ярославль' },
    { value: 'Владивосток', label: 'Владивосток' },
    { value: 'Махачкала', label: 'Махачкала' },
    { value: 'Томск', label: 'Томск' },
    { value: 'Оренбург', label: 'Оренбург' },
    { value: 'Кемерово', label: 'Кемерово' },
    { value: 'Новокузнецк', label: 'Новокузнецк' },
    { value: 'Рязань', label: 'Рязань' },
    { value: 'Астрахань', label: 'Астрахань' },
    { value: 'Пенза', label: 'Пенза' },
    { value: 'Липецк', label: 'Липецк' },
    { value: 'Киров', label: 'Киров' },
    { value: 'Чебоксары', label: 'Чебоксары' },
    { value: 'Тула', label: 'Тула' },
    { value: 'Калининград', label: 'Калининград' },
    { value: 'Курск', label: 'Курск' },
    { value: 'Ставрополь', label: 'Ставрополь' },
    { value: 'Магнитогорск', label: 'Магнитогорск' },
    { value: 'Тверь', label: 'Тверь' },
    { value: 'Иваново', label: 'Иваново' },
    { value: 'Брянск', label: 'Брянск' },
    { value: 'Сочи', label: 'Сочи' },
    { value: 'Белгород', label: 'Белгород' },
    { value: 'Владимир', label: 'Владимир' },
    { value: 'Архангельск', label: 'Архангельск' },
    { value: 'Калуга', label: 'Калуга' }
  ]

  const filter_geo_input = ref([])
  const filter_loading_geo = ref(false)
  const geo_options = ref<any[]>([])

  const filteredGeoList = (query: string) => {
    if (!query) {
      return
    }

    filter_loading_geo.value = true

    setTimeout(() => {
      filter_loading_geo.value = false
      geo_options.value = geo_state.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 1000)
  }


  return {
    filteredGeoList,
    geo_options,
    filter_loading_geo,
    filter_geo_input,
  }
})
