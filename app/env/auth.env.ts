export const lenCode = 6

export const lenProfileName = {
    min: 3,
    max: 35,
}
export const lenProfileUrl = {
    min: 2,
    max: 15,
}

export const lenUsername = {
    min: 4,
    max: 50,
}

export const patternForUsername = /^[a-zA-Z0-9\-_]+$/

export const lenPassword = {
    min: 8,
    max: 50,
}

export const patternForPass = {
    hasUpperCase: /[A-Z]/,
    hasDigit: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":'`_~+\-={}|<>]/,
    isValidChars: /^[A-Za-z\d!@#$%^&*(),.?":'`_~+\-={}|<>]+$/,
}
