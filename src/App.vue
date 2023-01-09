<script setup>
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import HelloWorld from "./components/HelloWorld.vue";
import { useStore } from 'vuex'
import "animate.css"
import router from "./router";
const store = useStore()
onBeforeMount(() => {
  const isUser = store.getters['account/getUser']
  isUser && store.dispatch('account/check_login')
})

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.animateName" mode="out-in">
        <component :is="Component" :key="route.path"></component>
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

.float-enter-active,
.float-leave-active {
  transition: .35s ease;
}

.float-enter-from,
.float-leave-active {
  opacity: 0;
  transform: translateX(50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: .35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
