export enum ApiResType {
    success = 'success',
    warning = 'warning',
    error = 'error',
}

export interface ApiRes {
    value: boolean
    type: ApiResType
    title: string
    msg: string
}

export interface InpAuthErr {
    value: boolean
    index: number | null
}