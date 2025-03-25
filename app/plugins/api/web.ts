import type { AxiosInstance } from 'axios'
import type { RuntimeConfig } from 'nuxt/schema'

export default (o: RuntimeConfig, instance: (c: RuntimeConfig) => AxiosInstance) => {
  return {
    getProfileInfo(id: string) {
      return instance(o).get(`/profile`, {
        params: {
          id
        }
      })
    }
  }
}
