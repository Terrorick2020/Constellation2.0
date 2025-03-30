import { defineStore } from 'pinia'
import { useProfileStore } from '#imports'
import validator from 'validator'
import axios, { AxiosHeaders, type AxiosResponse } from 'axios'

import { SignUpRT } from '~/env/requests.env'
import {
  lenUsername,
  patternForUsername,
  lenPassword,
  patternForPass
} from '~/env/auth.env'
import {
  BASE_URL,
  REGISTER_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  PROFILE_TYPE_ENDPOINT,
  PROFILE_LEGAL_FORM_ENDPOINT,
  WORK_FIELDS_ENDPOINT,
  HELPERS_PRE_VALIDATION_ENDPOINT,
  PASSWORD_RECOVERY,
  PASSWORD_RESET,
  PROFILES_ENDPOINT,
  USER_CURRENT,
  EMAIL_VERIFY,
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

    const username = ref<string>( '' )
    const password = ref<string>( '' )
    const saveMe = ref<boolean>( false )
    const code = ref<string>( '' )

    const accessToken = ref<string>( '' )
    const resetToken = ref<string>( '' )

    const isLoad = ref(false)

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
          password: password.value
        }

        // const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, data)

        // accessToken.value = response.data.data.access_token



        // if (response.status === 200) {

        //   userId.value = response.data.id

        //   apiSuccess.value = true
        //   apiSuccess.block = 'login'
        // }

        const result = await delay(1000)

        if ( result ) {
          apiRes.value = true
          apiRes.type = ApiResType.success
          apiRes.title = 'Ура!'
          apiRes.msg = 'Успешный вход в сиситему!'
        }

        isLoad.value = false

        return result

      } catch (error: any) {
        isLoad.value = false
      }
    }

    const sendEmail = async () => {
      try {
        isLoad.value = true

        // const data = {
        //   email: email.value
        // }

        // const response = await axios.post(`${BASE_URL}${PASSWORD_RECOVERY}`, data)

        isLoad.value = false

        // return response.status === 200
      } catch (error: any) {
        // apiErr.value = true
        // apiErr.block = 'sendEmail'
        // apiErr.statusCode = error.status ? error.status : 500
        // isLoad.value = false
      }
    }
    const checkingCode = async () => {
      try {
        isLoad.value = true

        const response = await axios.get(
          `${BASE_URL}${HELPERS_PRE_VALIDATION_ENDPOINT}?field_name=code&value=${code.value}`
        )

        isLoad.value = false

        return response.status === 200
      } catch (error: any) {
        // apiErr.value = true
        // apiErr.block = 'checkingCode'
        // apiErr.statusCode = error.status ? error.status : 500
        // isLoad.value = false
      }
    }
    const rewritePass = async () => {
      try {
        isLoad.value = true

        const data = {
          password: password.value,
          password_confirmation: password.value,
          code: code.value
        }

        const response = await axios.post(`${BASE_URL}${PASSWORD_RESET}`, data)

        isLoad.value = false

        return response.status === 200
      } catch (error: any) {
        // apiErr.value = true
        // apiErr.block = 'rewritePass'
        // apiErr.statusCode = error.status ? error.status : 500
        // isLoad.value = false
      }
    }

    const getSingUpData = async (type: string) => {
      try {
        isLoad.value = true

        let uri: string = ''

        switch (type) {
          case SignUpRT.profileTypes:
            uri = `${BASE_URL}${PROFILE_TYPE_ENDPOINT}`
            break
          case SignUpRT.profileLegalForms:
            uri = `${BASE_URL}${PROFILE_LEGAL_FORM_ENDPOINT}`
            break
          case SignUpRT.workFieldParents:
            uri = `${BASE_URL}${WORK_FIELDS_ENDPOINT}?parent_only=1`
            break
          case SignUpRT.workFieldBlocks:
            uri = `${BASE_URL}${WORK_FIELDS_ENDPOINT}?parent_only=1&with_children=1`
            break
        }

        const response = await axios.get(uri)

        isLoad.value = false

        return response.data
      } catch (error: any) {
        // apiErr.value = true
        // apiErr.block = 'getSingUpData'
        // apiErr.statusCode = error.status ? error.status : 500
        // isLoad.value = false
      }
    }

    const predictValid = async () => {
      isLoad.value = true

      const profileStore = useProfileStore()

      const baseUri = `${BASE_URL}${HELPERS_PRE_VALIDATION_ENDPOINT}`
      const nameParams = `?field_name=name&value=${profileStore.companyName}`
      const slugParams = `?field_name=slug&value=${profileStore.companyUrl}`

      try {
        await axios.get(baseUri + nameParams)
      } catch (error: any) {
        // if (error.status === 422) {
        //   fInpErr.value = true
        //   fInpErr.index = 3
        // } else {
        //   apiErr.value = true
        //   apiErr.block = 'predictValid'
        //   apiErr.statusCode = error.status ? error.status : null
        // }
      }

      try {
        await axios.get(baseUri + slugParams)
      } catch (error: any) {
        // if (error.status === 422) {
        //   sInpErr.value = true
        //   sInpErr.index = 3
        // } else {
        //   apiErr.value = true
        //   apiErr.block = 'predictValid'
        //   apiErr.statusCode = error.status ? error.status : null
        // }
      }

      isLoad.value = false

      // return !fInpErr.value && !sInpErr.value && !apiErr.value
    }

    const register = async () => {
      try {
        isLoad.value = true

        const resEmailValid = await axios.get(
          `url`
        )
          return resEmailValid.status === 201

      } catch (error: any) {
        // apiErr.value = true
        // apiErr.block = block
        // apiErr.statusCode = status
        isLoad.value = false
      }
    }

    const verifyEmail = async (query: any) => {
      try {
        isLoad.value = true

        if (!query.hash) {
          isLoad.value = true
          return false
        }

        const data = {
          hash: query.hash
        }

        const response = await axios.post(`${BASE_URL}${EMAIL_VERIFY}`, data)

        if (response.status !== 200) {
          isLoad.value = true
          return false
        }

        const { getUserData } = useProfileStore()
        const resUser: false | AxiosResponse = await getUserData()

        isLoad.value = false

        return resUser && resUser.status === 200
      } catch {
        isLoad.value = false
      }
    }


    return {
      userId,
      username,
      password,
      accessToken,

      saveMe,
      code,

      isLoad,

      fInpErr,
      sInpErr,
      tInpErr,

      resetToken,
      apiRes,

      resetPass,

      login,

      sendEmail,
      checkingCode,
      rewritePass,

      getSingUpData,
      predictValid,
      register,

      verifyEmail,
    }
  },
  isBrowser
    ? {
        persist: {
          storage: localStorage,
          serializer: {
            serialize: (state) => {
              return JSON.stringify({
                accessToken: state.accessToken
              })
            },
            deserialize: (data) => {
              const parsed = JSON.parse(data)

              return {
                accessToken: parsed.accessToken || ''
              }
            }
          }
        }
      }
    : undefined
)
