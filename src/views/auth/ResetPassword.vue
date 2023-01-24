<template>
    <div class="bg-gradient-to-r w-screen from-indigo-500 to-purple-500 flex items-center h-screen overflow-hidden">
        <section class="container mx-auto">
            <form @submit.prevent method="post">
                <div class="mx-auto w-96 flex flex-col bg-white p-3 rounded-lg shadow-md text-gray-600">
                    <h2 class="text-lg font-semibold mb-2">Thay đổi mật khẩu</h2>
                    <label class="text-sm">Email</label>
                    <input class="bg-gray-50 p-2 rounded-md border focus:outline-none text-sm" type="email" readonly
                        autocomplete="email" :value="email" autofocus>
                    <label for="password" class="mt-3 text-sm">Mật khẩu mới</label>
                    <input class="bg-gray-50 p-2 rounded-md border text-sm" id="password" type="password"
                        placeholder="Nhập mật khẩu mới">
                    <label for="password_confirm" class="mt-3 text-sm">Xác nhận lại mật khẩu</label>
                    <input class="bg-gray-50 p-2 text-sm rounded-md border" id="password_confirm" type="password"
                        placeholder="Nhập lại mật khẩu">
                    <button
                        class="px-1 py-2 mt-3 text-sm text-white bg-indigo-600 rounded-md active:bg-indigo-700 hover:bg-indigo-700 duration-150 ease-in">Lưu
                        thay đổi</button>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
import { toast } from 'vue3-toastify';

export default {
    mounted() {
        this.getTheme();
        let logined = this.$store.getters.isLoggedIn
        if (logined)
            this.$router.push('/dashboard')

        this.email = this.$route.query.email
    },
    data() {
        return {
            dark: this.getThemeFromLocalStorage(),
            email: "",
            validateEmail: null,
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
        }
    }
}
</script>