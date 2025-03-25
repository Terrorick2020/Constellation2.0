import { filename } from 'pathe/utils'

const glob = import.meta.glob('@/assets/image/*', { eager: true })

const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), (value as any).default])
)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      images
    }
  }
})
