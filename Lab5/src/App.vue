<script setup>
import Weather from '@/components/Weather.vue'
import LoginSignUp from '@/components/LoginSignUp.vue'
import AppInterface from '@/components/AppInterface.vue'
import { appStore } from '@/stores/store'
import { ref, onUpdated, onMounted } from 'vue'

const store = appStore()
const userData = store.getUserData()
const userDataAbsent = ref(userData === null ? true : false)
</script>

<template>
  <div class="appContainer">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  height: 100%;
}

html,
body {
  font-size: 62.5%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
.appContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  height: 100%;
  background: rgb(34, 193, 195);
  background: linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);
}
</style>
