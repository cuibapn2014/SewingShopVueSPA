export const config = {
    state: {
        baseUrl: 'http://myproject.com/'
    },
    getters:{
        getBaseUrl(state){
            return state.baseUrl
        }
    }
}