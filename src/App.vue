<script setup>
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import HelloWorld from "./components/HelloWorld.vue";
import { useStore } from 'vuex'
import "animate.css"
import router from "./router";
import "./assets/css/transition.css"

const store = useStore()
onBeforeMount(() => {
  const isUser = store.getters['account/getUser']
  isUser && store.dispatch('account/check_login')
})

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.animateName" mode="out-in">
        <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
