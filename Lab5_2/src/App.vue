<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="appContainer">
    <RouterView />
  </div>
</template>

<style scoped>
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
#app {
  height: 100%;
}
</style>
