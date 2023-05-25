export const numberFunctions = {
    convertNumberToString,
    convertStringToNumber,
    regexNumber,
    regexDecimal
}

function convertNumberToString(number){
    if(Number.isNaN(Number(number))) return 0
    return Number(number).toLocaleString('vi')
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