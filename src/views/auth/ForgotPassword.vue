<template>
    <div class="flex w-full items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div class="flex-1 max-w-4xl mx-auto overflow-hidden bg-[#ffffff] rounded-lg shadow-xl dark:bg-gray-800">
            <div class="flex flex-col overflow-y-auto md:flex-row">
                <div class="h-32 md:h-auto md:w-1/2">
                    <img aria-hidden="true" class="object-cover w-full h-full dark:hidden" :src="forgotImage"
                        alt="Office" loading="lazy" />
                    <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block" :src="forgotImageDark"
                        alt="Office" loading="lazy" />
                </div>
                <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                    <div class="w-full">
                        <h1 v-if="!isSuccess" class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                            Quên mật khẩu
                        </h1>
                        <form v-if="!isSuccess" @submit.prevent="forgotPassword()" method="post">
                            <label class="block text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Email</span>
                                <span class="mx-2 text-sm text-red-500">{{ validateEmail && validateEmail.email &&
                                        validateEmail.email[0] || ""
                                }}</span>
                                <input
                                    class="block w-full mt-1 text-gray-900 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="JaneDoe@exam.com" name="email" v-model="email" />
                            </label>

                            <!-- You should use a button here, as the anchor is only used for the example  -->
                            <button
                                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
                                <font-awesome-icon v-if="isSubmit" class="animate-spin"
                                    icon="fa-solid fa-circle-notch" />
                                Gửi liên kết
                            </button>
                        </form>
                        <div v-else
                            class="w-full h-full flex flex-col items-center justify-center text-gray-900 dark:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 my-1 text-green-400"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd" />
                            </svg>
                            <h2 class="text-lg font-bold">Thành công !</h2>
                            <p class="text-sm">Chúng tôi đã gửi đến bạn liên kết khôi phục tài khoản. Vui lòng kiểm tra
                                email</p>
                        </div>
                        <router-link :to="{ name: 'login' }" tag="a" class="my-2 text-sm inline-block text-indigo-500 hover:text-indigo-700 duration-150">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 float-left mr-1" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span>Quay lại</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import image from "../../assets/images/forgot-password-office.jpeg"
import imageDark from "../../assets/images/forgot-password-office-dark.jpeg"
import { toast } from 'vue3-toastify';

export default {
    mounted() {
        this.getTheme();
        let logined = this.$store.getters.isLoggedIn
        if (logined)
            this.$router.push('/dashboard')
    },
    data() {
        return {
            forgotImage: image,
            forgotImageDark: imageDark,
            dark: this.getThemeFromLocalStorage(),
            email: "",
            validateEmail: null,
            isSubmit: false,
            isSuccess: false
        }
    },
    methods: {
        getThemeFromLocalStorage() {
            // if user already changed the theme, use it
            if (window.localStorage.getItem("dark")) {
                return JSON.parse(window.localStorage.getItem("dark"));
            }

            // else return their preferences
            return (
                !!window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
        },
        getTheme() {
            if (this.dark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
        forgotPassword() {
            this.validateEmail = null
            const data = {
                email: this.email
            }
            if (!this.isSubmit) {
                this.isSubmit = true
                this.$store.dispatch('account/forgot_password', data).then(res => {
                    res.data.status && toast.success("Đã gửi email khôi phục !", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false
                    })

                    this.isSuccess = true

                }).catch(err => {
                    this.validateEmail = err.response.data.errors
                    toast.error("Không thể gửi email khôi phục", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false
                    })
                })
                    .then(() => this.isSubmit = false)
            }
        }
    }
}
</script>