import {
    metadataService
} from "../../services/metadata.service";

export const metadata = {
    namespaced: true,
    state: {
        dataAnalytic: null
    },
    getters: {
        getDataAnalytic: state => {
            return state.dataAnalytic
        }
    },
    mutations: {
        setDataAnalytic(state, data) {
            state.dataAnalytic = data
        }
    },
    actions: {
        getDataFromApi: async ({ commit }) => {
            return await metadataService.getAnalytic().then(data => {
                const result = data.data
                if (result.code == 200) {
                    commit('setDataAnalytic', result.data)
                }
            })
        }
    }
}