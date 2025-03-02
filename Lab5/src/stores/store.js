import { ref } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('appState', () => {
  const userData = ref(null)
  const weatherData = ref([])
  const todos = ref([])

  function getUserData() {
    return userData.value
  }
  function updateUserData(p_userData) {
    userData.value = p_userData
  }
  function getWeatherData() {
    return weatherData.value
  }
  function updateWeatherData(p_weatherData) {
    weatherData.value = [...p_weatherData]
  }
  function getTodos() {
    return todos.value
  }
  function updateTodos(p_todos) {
    todos.value = [...p_todos]
  }

  return { getUserData, updateUserData, getWeatherData, updateWeatherData, getTodos, updateTodos }
})
