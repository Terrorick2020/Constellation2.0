import type { InjectionKey } from 'vue'
import type { IChatInjects } from './index'

export const ChatKey: InjectionKey<IChatInjects> = Symbol('chat')
