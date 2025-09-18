import axios from 'axios'
import type { RuntimeConfig } from 'nuxt/schema'

export const instances = {
  web: (c: RuntimeConfig) => {
    const instance = axios.create({
      // baseURL: 'http://localhost:3000/api'
      baseURL: 'http://78.24.221.66/api'
      // headers: {
      //   Authorization:
      //     "Bearer ",
      // },
    })

    return instance
  }
}
