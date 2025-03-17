export interface AuthAppWarn {
    value: boolean
    block: string
}

export interface AuthApiErr {
    value: boolean
    block: string
    statusCode: number | null
}

export interface InpAuthErr {
    value: boolean
    index: number | null
}