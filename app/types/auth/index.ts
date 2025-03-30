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
