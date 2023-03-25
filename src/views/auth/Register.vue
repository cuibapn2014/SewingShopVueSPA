<template>
    <div class="flex w-full items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div class="flex-1 max-w-4xl mx-auto overflow-hidden bg-[#ffffff] rounded-lg shadow-xl dark:bg-gray-800">
            <div class="flex flex-col overflow-y-auto md:flex-row">
                <div class="h-32 md:h-auto md:w-1/2">
                    <img aria-hidden="true" class="object-cover w-full h-full dark:hidden" :src="createImage"
                        alt="Office" loading="lazy" />
                    <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block" :src="createImageDark"
                        alt="Office" loading="lazy" />
                </div>
                <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                    <div class="w-full">
                        <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                            Đăng ký
                        </h1>
                        <form @submit.prevent="signup()" method="POST">
                            <label class="block text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Tên của bạn</span>
                                <span class="mx-2 text-sm text-red-500">{{ validate && validate.name && validate.name[0] || ""}}</span>
                                <input
                                    class="block w-full mt-1 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="Jane Doe" name="fullname" v-model="credentials.name" />
                            </label>
                            <label class="block text-sm mt-3">
                                <span class="text-gray-700 dark:text-gray-400">Email</span>
                                <span class="mx-2 text-sm text-red-500">{{ validate && validate.email && validate.email[0] || ""}}</span>
                                <input
                                    class="block w-full mt-1 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="JaneDoe@exam.com" name="email" v-model="credentials.email" />
                            </label>
                            <label class="block mt-4 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Mật khẩu</span>
                                <span class="mx-2 text-sm text-red-500">{{ validate && validate.password && validate.password[0] || ""}}</span>
                                <input
                                    class="block w-full mt-1 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="***************" type="password" v-model="credentials.password" />
                            </label>
                            <label class="block mt-4 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">
                                    Xác nhận mật khẩu
                                </span>
                                <span class="mx-2 text-sm text-red-500">{{ validate && validate.confirm_password && validate.confirm_password[0] || ""}}</span>
                                <input
                                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-indigo-400 focus:outline-none focus:shadow-outline-indigo dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="***************" type="password" v-model="credentials.confirm_password" />
                            </label>
                            <!-- You should use a button here, as the anchor is only used for the example  -->
                            <button
                                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-indigo-600 border border-transparent rounded-lg active:bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo">
                                <font-awesome-icon v-if="isSubmit" class="animate-spin"
                                    icon="fa-solid fa-circle-notch" />
                                Đăng ký
                            </button>
                        </form>
                        <p class="mt-4">
                            <router-link to="/login"
                                class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                Đã có tài khoản? Đăng nhập
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import image from "../../assets/images/create-account-office.jpeg"
import imageDark from "../../assets/images/create-account-office-dark.jpeg"
import { toast } from 'vue3-toastify';

export default {
    mounted() {
        this.getTheme();
        let logined = this.$store.getters.isLoggedIn
        if (logined)
            this.$router.push('/dashboard')
        document.title = "Đăng ký"
    },
    data() {
        return {
            createImage: image,
            createImageDark: imageDark,
            dark: this.getThemeFromLocalStorage(),
            credentials: {
                name: "",
                username: "",
                password: "",
                confirm_password: ""
            },
            validate: null,
            isSubmit: false
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
        signup() {
            this.validate = null
            if (!this.isSubmit) {
                this.isSubmit = true
                this.$store.dispatch('account/register', this.credentials).then((res) => {
                    if (res.user) {
                        toast.success("Đăng ký tài khoản thành công !", {
                            position: toast.POSITION.TOP_RIGHT,
                            theme: toast.THEME.COLORED,
                            pauseOnHover: false
                        })
                        this.clearData()
                        setTimeout(() => {
                            this.$router.push('/login')
                        },2500)
                    }
                }).catch(err => {
                    this.validate = err.response.data
                    toast.error("Xảy ra lỗi trong quá trình đăng ký", {
                        position: toast.POSITION.TOP_RIGHT,
                        theme: toast.THEME.COLORED,
                        pauseOnHover: false
                    })
                }).then(() => {
                    this.isSubmit = false
                })
            }
        },
        clearData(){
            this.credentials.name = ""
            this.credentials.email = ""
            this.credentials.password = ""
            this.credentials.confirm_password = ""
        }
    }
}
</script>