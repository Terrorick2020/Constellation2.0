export const AUTH_INP_TYPE = {
    text: 'text',
    password: 'password',
}

export const patternForUsername = /^[A-Za-z0-9_-]+$/

export const patternForPass = {
    hasUpperCase: /[A-Z]/,
    hasDigit: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":'`_~+\-={}|<>]/,
    isValidChars: /^[A-Za-z\d!@#$%^&*(),.?":'`_~+\-={}|<>]+$/,
}

export const MIN_USER_NAME_LEN = 4
export const MAX_USER_NAME_LEN = 15
export const MIN_PASS_INP_LEN = 8
export const MAX_PASS_INP_LEN = 50

export const MAX_AUTH_INP_LEN = 50

export const userNameInfoList = [
    'В имени пользователя можно использовать только латинские буквы, тире и нижнее подчёркивание',
    'Имя пользователя не должно быть менее 4х и более 15ти символов',
    'Такое имя пользователя уже занято',
]

export const passInfoList = [
    'Пароль должен состоять только из латинских букв, цифр и специальных символов',
    'Требования: 1 цифра, 1 заглавная буква, 1 специальный символ',
    'Пароль должен быть длиной от 8 до 50 символов'
]

export const repassInfoList = [
    'Пароли не совпадают'
]
