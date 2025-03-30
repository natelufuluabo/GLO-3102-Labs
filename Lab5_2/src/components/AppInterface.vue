<script setup>
import { ref, watchEffect } from 'vue'
import { appStore } from '@/stores/store'
import { createNewTodo, getUserTodos, updateUserTodo, deleteUserTodo } from '@/services/user'
import TodoComponent from '@/components/TodoComponent.vue'

const store = appStore()
const todos = ref([])
const todoInput = ref('')
const editActivate = ref(null)
const updateInput = ref('')

// Fetch initial todos
const fetchTodos = async () => {
  try {
    const userData = store.getUserData()
    todos.value = await getUserTodos(userData.id)
  } catch (error) {
    console.error('Error fetching todos:', error.message)
  }
}

watchEffect(fetchTodos)

const handleTodoCreation = async (e) => {
  e.preventDefault()
  try {
    const userData = store.getUserData()
    await createNewTodo(userData.id, todoInput.value)
    await fetchTodos() // Refresh list
    todoInput.value = ''
  } catch (error) {
    console.error('Error creating todo:', error.message)
  }
}

const activateEditing = (todo) => {
  editActivate.value = todo.id
  updateInput.value = todo.name
}

const handleTodoUpdate = async (todo) => {
  try {
    const userData = store.getUserData()
    await updateUserTodo(userData.id, todo.id, updateInput.value)
    await fetchTodos() // Refresh list
    editActivate.value = null
  } catch (error) {
    console.error('Error updating todo:', error.message)
  }
}

const handleTodoDeletion = async (id) => {
  try {
    const userData = store.getUserData()
    await deleteUserTodo(userData.id, id)
    await fetchTodos() // Refresh list
  } catch (error) {
    console.error('Error deleting todo:', error.message)
  }
}
</script>

<template>
  <div class="appInterface">
    <h1 class="title">To-do list</h1>
    <div id="todosContainer" class="todosContainer">
      <div v-for="todo in todos" :key="todo.id" class="todoItem">
        <div v-if="editActivate === todo.id" class="inputContainer">
          <input
            v-model="updateInput"
            class="addInput"
            type="text"
            placeholder="Update your task"
          />
          <button @click="handleTodoUpdate(todo)" class="addTodoButton">Update</button>
        </div>
        <div v-else>
          <p class="todoText">{{ todo.name }}</p>
          <div class="buttonsContainer">
            <span @click="() => activateEditing(todo)" class="editButton">Edit</span>
            <span @click="() => handleTodoDeletion(todo.id)" class="deleteButton">Delete</span>
          </div>
        </div>
      </div>
    </div>
    <div class="inputContainer">
      <input v-model="todoInput" class="addInput" type="text" placeholder="Enter to do here" />
      <button @click="handleTodoCreation" class="addTodoButton">Add</button>
    </div>
  </div>
</template>

<style>
.appInterface {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 35%;
  background-color: #ccf6f6;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: -0.1rem 0.1rem 1rem 1rem rgba(5, 5, 5, 0.092);
}

.todosContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.editButton,
.deleteButton {
  color: #30a2ff;
}

.todoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.todosContainer {
  flex: 1 1 auto;
}

.title {
  font-size: 2.5rem;
  text-align: center;
  color: #30a2ff;
}

.inputContainer {
  display: grid;
  grid-template-columns: 1fr 0.25fr;
  align-items: center;
  width: 100%;
}

.addInput,
.id-input {
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  border: 0.15rem solid #1e80a3;
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  color: #444;
}

.id-input {
  border-right: 0.15rem solid #1e80a3;
  border-radius: 0.5rem;
}

.addInput::placeholder,
.id-input::placeholder {
  color: rgb(183, 183, 183);
}

.addTodoButton,
.updateCityButton {
  cursor: pointer;
  border: 0.15rem solid #1e80a3;
  padding: 0.51rem;
  border-radius: 0 0.5rem 0.5rem 0;
  border-left: none;
  font-size: 1.6rem;
  color: #fff;
  background-color: #f266ab;
}

.updateCityButton {
  background-color: #1e80a3;
}

.todosContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
}

.todo,
.todo2 {
  display: grid;
  grid-template-columns: 2fr 0.5fr;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  background-color: #30a2ff;
  padding: 1rem;
  border-radius: 0.7rem;
  box-shadow: 1rem 1rem 1rem 0.1rem rgba(5, 5, 5, 0.032);
}

.todo,
.todo2 {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp;
  -webkit-animation-duration: 1.2s;
  animation-duration: 1.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes slideInUp {
  0% {
    -webkit-transform: translateY(1500%);
    transform: translateY(1500%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes slideInUp {
  0% {
    -webkit-transform: translateY(1500%);
    transform: translateY(1500%);
    visibility: visible;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.text-check {
  display: flex;
  gap: 1rem;
}

.text-check > button {
  border: none;
  background-color: #30a2ff;
  color: aquamarine;
  font-size: 1.8rem;
  transition: all 0.4s;
}

.todoText {
  font-size: 1.8rem;
  color: #30a2ff;
  transition: all 0.4s;
}

.completed {
  color: #494949;
  text-decoration: line-through;
}

.buttonsContainer {
  display: flex;
  gap: 2rem;
  justify-content: space-evenly;
}

.buttonsContainer > span {
  font-size: 1.4rem;
  color: #30a2ff;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.5s;
}

.buttonsContainer > span:hover {
  color: #cb4086;
}

.hidden {
  display: none;
}

.todo2 {
  display: flex;
  align-items: center;
}

.filtersContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.unselected {
  color: #aaaaaa;
}

.filtersContainer > button {
  border: none;
  background-color: #ccf6f6;
  font-size: 1.4rem;
  transition: all 0.4s;
  cursor: pointer;
}

.filtersContainer > button:hover,
.selected {
  color: #30a2ff;
  font-weight: bold;
  text-decoration: underline;
}

.weather-locationContainer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #444;
  width: 35%;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: -0.1rem 0.1rem 1rem 1rem rgba(5, 5, 5, 0.092);
  font-size: 1.4rem;
  color: #30a2ff;
}

.weather {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.high-low-temp {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.location {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.editCity {
  text-decoration: underline;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 768px) and (min-width: 425px) {
  .weather-locationContainer,
  .appInterface {
    width: 50%;
  }
  .login-signup-form {
    width: 55%;
  }
}

@media (max-width: 425px) and (min-width: 375px) {
  .weather-locationContainer,
  .appInterface {
    width: 80%;
  }
  .login-signup-form {
    width: 90%;
  }
  .login-signup-form > button {
    width: 80%;
  }
}

@media (max-width: 320px) {
  .weather-locationContainer,
  .appInterface {
    width: 90%;
  }
  .login-signup-form {
    width: 90%;
  }
  .login-signup-form > button {
    width: 90%;
  }
}
</style>
