import type { ButtonInstance } from 'element-plus'
import { dialogProps } from 'element-plus'

export const ModalProps = {
  targetRef: {
    type: Object as PropType<ButtonInstance | null | undefined>,
    required: false
  },
  ...dialogProps
} as const

export type ModalEmits = {
  'update:modelValue': [value: boolean]
  open: []
  opened: []
  close: []
  closed: []
  openAutoFocus: []
  closeAutoFocus: []
}
