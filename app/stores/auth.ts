import { defineStore } from 'pinia'
import { useProfileStore } from '#imports'
import validator from 'validator'
import axios, { AxiosHeaders, type AxiosResponse } from 'axios'

import { SignUpRT } from '~/env/requests.env'
import { lenPassword, patternForPass } from '~/env/auth.env'
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
import type { InpAuthErr, AuthAppWarn, AuthApiErr } from '~/types/auth'
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


export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email)
}

export const isValidPassword = (password: string): [boolean, number | null] => {
  
  const hasUpperCase = patternForPass.hasUpperCase
  const hasDigit = patternForPass.hasDigit
  const hasSpecialChar = patternForPass.hasSpecialChar
  const isValidChars = patternForPass.isValidChars

  if (!isValidChars.test(password)) {
    return [false, 1]
  }

  if (!hasUpperCase.test(password)) {
    return [false, 2]
  }
  if (!hasDigit.test(password)) {
    return [false, 2]
  }
  if (!hasSpecialChar.test(password)) {
    return [false, 2]
  }

  if (password.length < lenPassword.min || password.length > lenPassword.max) {
    return [false, 3]
  }

  return [true, null]
}

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined'

export const useAuthStore = defineStore(
  'AuthStore',
  () => {

    const userId = ref(null)
    const email = ref('')
    const password = ref('')
    const repass = ref('')
    const saveMe = ref(false)
    const code = ref('')
    const phone = ref('')

    const resetToken = ref('')
    const accessToken = ref('')

    const emailIsVerify = ref(true)
    const isLoad = ref(false)

    const appWarn: AuthAppWarn = reactive({
      value: false,
      block: ''
    })
    const apiSuccess: ApiSuccess = reactive({
      value: false,
      block: ''
    })
    const apiErr: AuthApiErr = reactive({
      value: false,
      block: '',
      statusCode: null
    })

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

    const resetPass: Ref<ResetPassConfig> = ref({
      contentStep: RPContentStep.EmailStep,
      lastContentStep: RPLastContentStep.Extra,
      contContentStep: RPContContentStep.Extra,
    })
    const signUp: Ref<SignUpConfig> = ref({
      contentStep: SUContentStep.WorkFieldsStep,
      lastContentStep: SULastContentStep.Extra,
      contContentStep: SUContContentStep.Extra,
    })

    const login = async () => {
      try {
        isLoad.value = true

        const data = {
          email: email.value,
          password: password.value
        }

        const response = await axios.post(`${BASE_URL}${LOGIN_ENDPOINT}`, data)

        accessToken.value = response.data.data.access_token

        const { getUserData } = useProfileStore()
        const resUser: false | AxiosResponse = await getUserData()

        if (resUser && resUser.status === 200) {
          const userData: any = resUser.data.data

          userId.value = userData.id
          phone.value = userData.phone

          apiSuccess.value = true
          apiSuccess.block = 'login'
        }

        isLoad.value = false

        return resUser && resUser.status === 200
      } catch (error: any) {
        const url: string = error.request.responseURL.split('?')[0]
        let status: number = error.status
        let block: string

        switch (url) {
          case `${BASE_URL}${LOGIN_ENDPOINT}`:
            block = 'login'
            break
          case `${BASE_URL}${USER_CURRENT}`:
            block = 'getUserData'
            break
          default:
            block = 'login'
            status = 500
            break
        }

        apiErr.value = true
        apiErr.block = block
        apiErr.statusCode = status ? status : 500
        isLoad.value = false
      }
    }
    const logout = async () => {
      try {
        const headers: AxiosHeaders = getHeaders(`Bearer ${accessToken.value}`)

        const response = await axios.post(`${BASE_URL}${LOGOUT_ENDPOINT}`, {
          headers
        })

        if (response.status === 200) {
          email.value = ''
          password.value = ''
          saveMe.value = false
          code.value = ''
        }
      } catch {}
    }

    const sendEmail = async () => {
      try {
        isLoad.value = true

        const data = {
          email: email.value
        }

        const response = await axios.post(`${BASE_URL}${PASSWORD_RECOVERY}`, data)

        isLoad.value = false

        return response.status === 200
      } catch (error: any) {
        apiErr.value = true
        apiErr.block = 'sendEmail'
        apiErr.statusCode = error.status ? error.status : 500
        isLoad.value = false
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
        apiErr.value = true
        apiErr.block = 'checkingCode'
        apiErr.statusCode = error.status ? error.status : 500
        isLoad.value = false
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
        apiErr.value = true
        apiErr.block = 'rewritePass'
        apiErr.statusCode = error.status ? error.status : 500
        isLoad.value = false
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
        apiErr.value = true
        apiErr.block = 'getSingUpData'
        apiErr.statusCode = error.status ? error.status : 500
        isLoad.value = false
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
        if (error.status === 422) {
          fInpErr.value = true
          fInpErr.index = 3
        } else {
          apiErr.value = true
          apiErr.block = 'predictValid'
          apiErr.statusCode = error.status ? error.status : null
        }
      }

      try {
        await axios.get(baseUri + slugParams)
      } catch (error: any) {
        if (error.status === 422) {
          sInpErr.value = true
          sInpErr.index = 3
        } else {
          apiErr.value = true
          apiErr.block = 'predictValid'
          apiErr.statusCode = error.status ? error.status : null
        }
      }

      isLoad.value = false

      return !fInpErr.value && !sInpErr.value && !apiErr.value
    }
    const register = async () => {
      try {
        isLoad.value = true

        const resEmailValid = await axios.get(
          `${BASE_URL}${HELPERS_PRE_VALIDATION_ENDPOINT}?field_name=email&value=${email.value}`
        )

        if (resEmailValid.status !== 200) {
          return false
        }

        const data = {
          email: email.value,
          password: password.value,
          password_confirmation: password.value
        }

        const resAuth = await axios.post(`${BASE_URL}${REGISTER_ENDPOINT}`, data)

        if (resAuth.status === 201) {
          accessToken.value = resAuth.data.data.access_token
        } else {
          return false
        }

        const { getUserData, createProfile } = useProfileStore()

        const resUser: false | AxiosResponse = await getUserData()

        if (resUser && resUser.status === 200) {
          const userData: any = resUser.data.data

          userId.value = userData.id
          phone.value = userData.phone
        }

        if (!resUser) {
          return false
        }

        const resProfiles = await createProfile()

        if (!resProfiles) {
          return false
        }

        isLoad.value = false

        return !apiErr.value
      } catch (error: any) {
        const url: string = error.request.responseURL.split('?')[0]
        let status: number = error.status
        let block: string

        switch (url) {
          case `${BASE_URL}${HELPERS_PRE_VALIDATION_ENDPOINT}`:
            block = 'resEmailValid'
            break
          case `${BASE_URL}${REGISTER_ENDPOINT}`:
            block = 'register'
            break
          case `${BASE_URL}${USER_CURRENT}`:
            block = 'getUserData'
            break
          case `${BASE_URL}${PROFILES_ENDPOINT}`:
            block = 'createProfile'
            break
          default:
            block = 'register'
            status = 500
            break
        }

        apiErr.value = true
        apiErr.block = block
        apiErr.statusCode = status
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

    const restartSignIn = () => {
      signUp.value.contentStep = 0
    }
    const restartSignUp = () => {
      signUp.value.contentStep = 0
    }
    const restartResetPass = () => {
      resetPass.value.contentStep = 0
    }

    return {
      userId,
      email,
      password,
      repass,
      saveMe,
      code,
      phone,

      emailIsVerify,
      isLoad,

      accessToken,
      resetToken,

      appWarn,
      apiSuccess,
      apiErr,

      fInpErr,
      sInpErr,
      tInpErr,

      resetPass,
      signUp,

      login,
      logout,

      sendEmail,
      checkingCode,
      rewritePass,

      getSingUpData,
      predictValid,
      register,

      verifyEmail,

      restartSignIn,
      restartSignUp,
      restartResetPass
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
