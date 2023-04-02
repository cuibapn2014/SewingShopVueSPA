<template>
    <div class="w-screen h-screen flex">
        <SideBar :display="isSideMenuOpen" @close-side-bar="closeSideMenu()" />
        <div class="flex flex-col flex-1 w-full z-20">
            <header class="z-10 py-2 bg-[#ffffff] shadow-md dark:bg-gray-800">
                <Header @toggle-side-bar="toggleSideMenu()"></Header>
            </header>
            <main class="h-full overflow-y-auto">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
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
import mediumZoom from 'medium-zoom'

export default {
    components: {
        Header, SideBar
    },
    updated(){
        const zoom = mediumZoom(document.querySelectorAll('.img__mthumbnail'), {
            background: "rgba(0,0,0,0.5)"
        })
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
        },
        
    }
}
</script>
<style>

.medium-zoom-overlay{
  z-index: 999;
}

.medium-zoom-image--opened {
  z-index: 1000;
}
</style>