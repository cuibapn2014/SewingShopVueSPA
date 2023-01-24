<template>
    <div class="w-screen h-screen flex">
        <SideBar :display="isSideMenuOpen" @close-side-bar="closeSideMenu()" />
        <div class="flex flex-col flex-1 w-full z-20">
            <header class="z-10 py-2 bg-[#ffffff] shadow-md dark:bg-gray-800">
                <Header @toggle-side-bar="toggleSideMenu()"></Header>
            </header>
            <main class="h-full overflow-y-auto">
                <router-view v-slot="{ Component }">
                    <transition name="float-up" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>
<script>
import Header from "../../components/layouts/Header.vue"
import SideBar from "../../components/layouts/SideBar.vue"
import "../../assets/css/transition.css"
export default {
    components: {
        Header, SideBar
    },
    data() {
        return {
            isSideMenuOpen: false
        }
    },
    methods: {
        toggleSideMenu() {
            this.isSideMenuOpen = !this.isSideMenuOpen
        },
        closeSideMenu() {
            this.isSideMenuOpen = false
        }
    }
}
</script>
<style scoped>

</style>