import { ref } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('appState', () => {
  const userData = ref(null)
  const todos = ref([])

  function getUserData() {
    return userData.value
  }
  function updateUserData(p_userData) {
    userData.value = { ...p_userData }
  }
  function getTodos() {
    return todos.value
  }
  function updateTodos(p_todos) {
    todos.value = p_todos
  }

  return { getUserData, updateUserData, getTodos, updateTodos }
})
