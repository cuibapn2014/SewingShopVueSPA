import {
    userService
} from "../../services/user.service"
import router from "../../router"

const user = JSON.parse(localStorage.getItem('user'))

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const account = {
    namespaced: true,

    state: {
        user: user,
        logined: user ? true : false
    },

    getters: {
        isLoggedIn: state => {
            return state.logined
        },
        getUser: state => {
            return state.user
        }
    },

    mutations: {
        SET_USER(state, user) {
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        SET_LOGINED(state) {
            state.logined = state.user ? true : false
        },
        RESET(state) {
            localStorage.removeItem('user')
            state.user = null
        }
    },

    actions: {
        login: async ({ commit, dispatch }, user) => {
           return await userService.login(user)
                .then(res => {
                    const data = res.data
                    if (res.status == 200 && data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user))
                        commit('SET_USER', data.user)
                        commit('SET_LOGINED')
                        router.push('/admin')
                    } else console.log(res)
                })
        },
        logout: async ({ commit }) => {
            await userService.logout()
                .then(res => {        
                    commit('RESET')
                    commit('SET_LOGINED')
                    router.push('/login')
                })
        },
        user_profile: async ({ commit }) => {
            await userService.profile().then(res => {
                commit('SET_USER', res.data)
            })
        },
        check_login: async ({ commit }) => {
            await userService.profile().then(res => {
                if (res.status == 200) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    commit('SET_USER', res.data)
                    commit('SET_LOGINED')
                }
            }).catch(err => {
                    commit('RESET')
                    commit('SET_LOGINED')
                    localStorage.removeItem('user')
                    router.push('/login')
            })
        },
        update_avatar: async ({ commit }, dataImage) => {
            await userService.updateAvatar(dataImage).then(async (res) => {
                const data = await res.data
                if(res.data.status){
                    commit('SET_USER', data.user)
                }         
            })
        },
        update_user: async ({ commit }, user) => {
            return await userService.update(user).then((res) => {
                const data = res.data
                if(data){
                    commit('SET_USER', data.user)
                }
            })
        },
        change_password: async ({ commit }, dataUser) => {
            return await userService.changePassword(dataUser)
        },
        register: async ({ commit }, user) => {
            return await userService.register(user)
        },
        forgot_password: async ({ commit }, email) => {
            return await userService.forgotPassword(email)
        }
    }
}