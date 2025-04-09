import { AxiosHeaders } from 'axios'


export const BASE_URL  = import.meta.env.VITE_BASE_URL
export const REG_ENDPOINT = import.meta.env.VITE_REG_ENDPOINT
export const LOG_ENDPOINT = import.meta.env.VITE_LOG_ENDPOINT
export const RESET_PASS = import.meta.env.VITE_RESET_PASS

export const POSTS_ENDPOINT = import.meta.env.VITE_POSTS_ENDPOINT

export const CHATS_ENDPOINT     = import.meta.env.VITE_CHATS_ENDPOINT
export const CHAT_MSGS_ENDPOINT = import.meta.env.VITE_CHAT_MSGS_ENDPOINT

export const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT
export const LOGIN_ENDPOINT    = import.meta.env.VITE_LOGIN_ENDPOINT
export const LOGOUT_ENDPOINT   = import.meta.env.VITE_LOGOUT_ENDPOINT
export const EMAIL_VERIFY      = import.meta.env.VITE_EMAIL_VERIFY
export const PASSWORD_RECOVERY = import.meta.env.VITE_PASSWORD_RECOVERY
export const PASSWORD_RESET    = import.meta.env.VITE_PASSWORD_RESET

export const WORK_FIELDS_ENDPOINT     = import.meta.env.VITE_WORK_FIELDS_ENDPOINT
export const WORK_CONDITIONS_ENDPOINT = import.meta.env.VITE_WORK_CONDITIONS_ENDPOINT

export const PROFILE_TYPE_ENDPOINT       = import.meta.env.VITE_PROFILE_TYPE_ENDPOINT
export const PROFILE_LEGAL_FORM_ENDPOINT = import.meta.env.VITE_PROFILE_LEGAL_FORM_ENDPOINT
export const PROFILES_ENDPOINT           = import.meta.env.VITE_PROFILES_ENDPOINT

export const MEDIA_ENDPOINT = import.meta.env.VITE_MEDIA_ENDPOINT

export const HELPERS_PRE_VALIDATION_ENDPOINT = import.meta.env.VITE_HELPERS_PRE_VALIDATION_ENDPOINT

export const USER_CURRENT = import.meta.env.VITE_USER_CURRENT


export const SignUpRT = {
    profileTypes: 'profile types',
    profileLegalForms: 'profile legal forms',
    workFieldParents: 'work-field parents',
    workFieldBlocks: 'work-field blocks',
}

export const getHeaders = ( token: string ) => {
    let headers = AxiosHeaders.from({
        'Content-Type': 'application/json',
        Accept: 'application/json',
    })

    if ( token ) {
        headers.Authorization = token
    }

    return headers
}
