const baseUrl = import.meta.env.VITE_API_URL || process.env.VITE_API_URL
export const config = {
    state: {
        baseUrl: baseUrl + '/'
    },
    getters:{
        getBaseUrl(state){
            return state.baseUrl
        }
    }
}