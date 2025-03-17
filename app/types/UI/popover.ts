import type { DefineComponent } from 'vue'

export type TPopoverItemProps = {
  key: number | string
  label: string
  icon?: DefineComponent | string
}
