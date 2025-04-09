import { AxiosHeaders } from 'axios'


export const BASE_URL  = import.meta.env.VITE_BASE_URL
export const REG_ENDPOINT = import.meta.env.VITE_REG_ENDPOINT
export const LOG_ENDPOINT = import.meta.env.VITE_LOG_ENDPOINT
export const RESET_PASS = import.meta.env.VITE_RESET_PASS

export const POSTS_ENDPOINT = import.meta.env.VITE_POSTS_ENDPOINT

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
