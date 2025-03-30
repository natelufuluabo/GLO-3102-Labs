<script setup>
import { createUser, getUserTodos } from '@/services/user'
import { appStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = appStore()
const handleUserCreation = async (e) => {
  e.preventDefault()
  store.updateUserData(await createUser())
}
const errorPresent = ref(false)
const idEntered = ref('')
const handleIdVerification = async (e) => {
  e.preventDefault()
  if (idEntered.value.length === 0) {
    console.log(idEntered.value.length === 0)
    errorPresent.value = true
    return
  }
  const response = await getUserTodos(idEntered.value)
  if (response) {
    errorPresent.value = false
    idEntered.value = ''
    store.updateTodos(response.tasks)
    store.updateUserData({ id: idEntered.value })
  } else errorPresent.value = true
}
</script>
<template>
  <div class="login-signup-overlay">
    <form class="login-signup-form">
      <p class="headline">Already have a user id? Enter it below</p>
      <input v-model="idEntered" type="text" class="id-input" placeholder="Enter ID" />
      <p v-if="errorPresent" class="error-signup">Invalid user Id</p>
      <button @click="handleIdVerification" class="submit-id-button">Get My Todos</button>
      <div class="separator-container">
        <hr noshade="true" />
        <p>Or</p>
        <hr noshade="true" />
      </div>
      <button @click="handleUserCreation" class="new-id-button">Generate New ID</button>
    </form>
  </div>
</template>
<style>
.login-signup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000b3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #ccf6f6;
  width: 50%;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 2rem;
}

.login-signup-form > button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  width: 60%;
  align-self: center;
  border: none;
  background-color: #30a2ff;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
}

.separator-container {
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;
  color: #30a2ff;
  font-weight: bold;
}

hr {
  width: 45%;
  height: 0.1rem;
  background-color: #494949;
  border: none;
}

.headline {
  color: #30a2ff;
  font-weight: bold;
}

.error-signup {
  font-size: 1.4rem;
  color: #cb4086;
}
</style>
