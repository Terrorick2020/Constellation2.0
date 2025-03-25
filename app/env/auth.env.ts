export const lenCode = 6

export const lenProfileName = {
    min: 3,
    max: 35,
}
export const lenProfileUrl = {
    min: 2,
    max: 15,
}

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
