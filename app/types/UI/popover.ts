import type { DefineComponent } from 'vue'

export type TPopoverItemProps = {
  key: number | string
  label: string
  icon?: DefineComponent | string
  route?: string  // Добавил поле route для перехода по ссылке
}
