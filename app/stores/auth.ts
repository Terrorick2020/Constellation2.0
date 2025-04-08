import { defineStore } from 'pinia'
import { useProfileStore } from '#imports'
import validator from 'validator'
import axios, { AxiosHeaders, type AxiosResponse } from 'axios'

import { SignUpRT } from '~/env/requests.env'
import { useSettingsStore } from '#imports'
import {
  lenUsername,
  patternForUsername,
  lenPassword,
  patternForPass
} from '~/env/auth.env'
import {
  BASE_URL,
  REG_ENDPOINT,
  LOG_ENDPOINT,
  RESET_PASS,
  getHeaders
} from '~/env/requests.env'

import type { ApiSuccess } from '~/types/auth/sing-in'
import { ApiResType, type ApiRes, type InpAuthErr } from '~/types/auth'
import {
  RPContentStep,
  RPLastContentStep,
  RPContContentStep,
  type ResetPassConfig,
} from '~/types/auth/reset-pass'
import {
  SUContentStep,
  SULastContentStep,
  SUContContentStep,
  type SignUpConfig,
} from '~/types/auth/sign-up'


export const isValidUsername = (username: string): [boolean, number | null] => {
  if( !patternForUsername.test( username ) ) {
    return [false, 0]
  }

  if (username.length < lenUsername.min || username.length > lenUsername.max) {
    return [false, 1]
  }

  return [true, null]
}

export const isValidPassword = (password: string): [boolean, number | null] => {
  
  const hasUpperCase = patternForPass.hasUpperCase
  const hasDigit = patternForPass.hasDigit
  const hasSpecialChar = patternForPass.hasSpecialChar
  const isValidChars = patternForPass.isValidChars

  if (!isValidChars.test(password)) {
    return [false, 0]
  }

  if (!hasUpperCase.test(password)) {
    return [false, 1]
  }
  if (!hasDigit.test(password)) {
    return [false, 1]
  }
  if (!hasSpecialChar.test(password)) {
    return [false, 1]
  }

  if (password.length < lenPassword.min || password.length > lenPassword.max) {
    return [false, 2]
  }

  return [true, null]
}

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined'

function delay(ms: number): Promise<boolean> {
  return new Promise(resolve => setTimeout(() => resolve(true), ms));
}

export const useAuthStore = defineStore(
  'AuthStore',
  () => {

    const userId = ref<number | null>( null )
    const isAdmin = ref<boolean>( false )
    const username = ref<string>( '' )
    const password = ref<string>( '' )
    const saveMe = ref<boolean>( false )
    const key = ref<File>()

    const accessToken = ref<string>( '' )
    const resetToken = ref<string>( '' )

    const isLoad = ref<boolean>( false )

    const fInpErr: InpAuthErr = reactive({
      value: false,
      index: null
    })
    const sInpErr: InpAuthErr = reactive({
      value: false,
      index: null
    })
    const tInpErr: InpAuthErr = reactive({
      value: false,
      index: null
    })


    const apiRes: ApiRes = reactive({
      value: false,
      type: ApiResType.success,
      title: '',
      msg: ''
    })

    const resetPass: Ref<ResetPassConfig> = ref({
      contentStep: RPContentStep.EmailStep,
      lastContentStep: RPLastContentStep.Extra,
      contContentStep: RPContContentStep.Extra,
    })

    const login = async () => {
      try {
        isLoad.value = true

        const data = {
          username: username.value,
          password: password.value,
        }

        const response = await axios.post(`${BASE_URL}${LOG_ENDPOINT}`, data)



        const dataRes = response.data.result
        console.log("НАШИ ДАННЫЕ", response.data)

        switch (dataRes) {
        case 'success':
          accessToken.value = response.data.access_token
          isAdmin.value = response.data.data.role === 'Admin'
          userId.value = response.data.data.id
          username.value = response.data.data.username
          apiRes.value = true
          apiRes.type = ApiResType.success
          apiRes.title = 'Ура!'
          apiRes.msg = 'Успешнаня авторизация!'
          break;
        case 'failed':
          apiRes.value = true
          apiRes.type = ApiResType.error
          apiRes.title = 'Ошибка авторизация'
          apiRes.msg = 'Что-то пошло не так.. Попробуйте позже.'
          break;
        }

        isLoad.value = false

        return dataRes === 'success'

      } catch (error: any) {
        isLoad.value = false
      }
    }
    const register = async () => {
      try {
        isLoad.value = true

        const data = {
          username: username.value,
          password: password.value,
          repass: password.value,
          name: 'Не задано',
          job: 'Не задано',
          division: 'Не задано',
        }

        const response = await axios.post(`${BASE_URL}${REG_ENDPOINT}`, data)
        const dataRes = response.data.result

        switch (dataRes) {
        case 'success':

          accessToken.value = response.data.access_token
          isAdmin.value = response.data.data.role === 'Admin'
          userId.value = response.data.data.id
          username.value = response.data.data.username
          const keyResponse = await axios.get(`${BASE_URL}${response.data.keyPath}`, {
            responseType: 'blob',
          });

          const url = window.URL.createObjectURL(new Blob([keyResponse.data]));
          const link = document.createElement('a');
          link.href = url;

          link.setAttribute('download', `${username.value}-public.pem`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          
          apiRes.value = true
          apiRes.type = ApiResType.success
          apiRes.title = 'Ура!'
          apiRes.msg = 'Успешнаня регистрация!'
          return true
        case 'failed':
          apiRes.value = true
          apiRes.type = ApiResType.error
          apiRes.title = 'Ошибка регистрации'
          apiRes.msg = response.data.data
          break;
        }

        isLoad.value = false

        return dataRes === 'success'
      } catch (error: any) {
        apiRes.value = true
        apiRes.type = ApiResType.error
        apiRes.title = 'Ошибка регистрации'
        apiRes.msg = 'Что-то пошло не так.. Попробуйте позже.'
        isLoad.value = false
      }
    }
    const rewritePass = async () => {
      try {
        isLoad.value = true

        if( !key.value ) return;

        const data = new FormData();
        data.append('username', username.value);
        data.append('file', key.value);
        data.append('password', password.value);

        const response = await axios.post(
          `${BASE_URL}${RESET_PASS}`,
          data
        )

        const dataRes = response.data.result

        switch (dataRes) {
        case 'success':
          apiRes.value = true
          apiRes.type = ApiResType.success
          apiRes.title = 'Ура!'
          apiRes.msg = 'Успешнаное изменение пароля!'
          break;
        case 'failed':
          apiRes.value = true
          apiRes.type = ApiResType.error
          apiRes.title = 'Ошибка изменения пароля'
          apiRes.msg = 'Что-то пошло не так.. Попробуйте позже.'
          break;
        }

        isLoad.value = false

        return dataRes === 'success'
      } catch (error: any) {
        apiRes.value = true
        apiRes.type = ApiResType.error
        apiRes.title = 'Ошибка изменения пароля'
        apiRes.msg = 'Что-то пошло не так.. Попробуйте позже.'
        isLoad.value = false
      }
    }

    return {
      userId,
      username,
      password,
      accessToken,
      isAdmin,
      saveMe,
      key,

      isLoad,

      fInpErr,
      sInpErr,
      tInpErr,

      resetToken,
      apiRes,

      resetPass,

      login,

      rewritePass,

      register,
    }
  },
  isBrowser
    ? {
        persist: {
          storage: localStorage,
          serializer: {
            serialize: (state) => {
              return JSON.stringify({
                accessToken: state.accessToken,
                isAdmin: state.isAdmin,
                username: state.username,
                userId : state.userId,
              })
            },
            deserialize: (data) => {
              const parsed = JSON.parse(data)

              return {
                accessToken: parsed.accessToken || '',
                isAdmin: parsed.isAdmin,
                username: parsed.username,
                userId: parsed.userId,

              }
            }
          }
        }
      }
    : undefined
)
