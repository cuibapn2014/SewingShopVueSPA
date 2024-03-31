export const UrlHelper = {
    setDefaultSearch: function () {
        const urlSearchParams = new URLSearchParams(window.location.search)
        let result = '';

        urlSearchParams.forEach((value, param) => {
            result += `${param}=${value}&`
        })

        return result
    }
}