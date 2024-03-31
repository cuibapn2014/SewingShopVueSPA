export const numberFunctions = {
    convertNumberToString,
    convertStringToNumber,
    regexNumber,
    regexDecimal
}

function convertNumberToString(number, acceptNegativeNumber = false){
    let str = number.replaceAll(".", "").replace(',',".")

    if(str.trim().length <= 0) return '';
    if(acceptNegativeNumber && number.trim() === '-') return str.trim()
    if(Number.isNaN(Number(str))) return 0

    return Number(str).toLocaleString('vi')
}

function convertStringToNumber(string){
    let str = string.replaceAll(".", "").replace(',',".")
    if(Number.isNaN(str)) return 0
    return Number(str)
}

function regexNumber(string){
    if(!string) return true
    const reg = new RegExp('^[0-9]+$')
    return reg.test(string)
}

function regexDecimal(string){
    if(!string) return true
    const reg = /^\d+\,?\d{0,2}$/
    return reg.test(String(string))
}