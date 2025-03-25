import { AxiosHeaders } from 'axios'


export const BASE_URL          = import.meta.env.VITE_BASE_URL

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


if (
    !BASE_URL                        ||
    !REGISTER_ENDPOINT               ||
    !LOGIN_ENDPOINT                  ||
    !LOGOUT_ENDPOINT                 ||
    !EMAIL_VERIFY                    ||
    !PASSWORD_RECOVERY               ||
    !PASSWORD_RESET                  ||
    !WORK_FIELDS_ENDPOINT            ||
    !WORK_CONDITIONS_ENDPOINT        ||
    !PROFILE_TYPE_ENDPOINT           ||
    !PROFILE_LEGAL_FORM_ENDPOINT     ||
    !PROFILES_ENDPOINT               ||
    !MEDIA_ENDPOINT                  ||
    !HELPERS_PRE_VALIDATION_ENDPOINT ||
    !USER_CURRENT
) {
    throw new Error( 'Some environment variable values are missing!' )
}

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
