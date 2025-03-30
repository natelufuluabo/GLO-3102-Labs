<script setup>
import { appStore } from '@/stores/store'
import { ref } from 'vue'
import { updateUserTodo, getUserTodos } from '../services/user'

const store = appStore()
const userData = store.getUserData()
const props = defineProps({
  info: { type: Object, required: true },
})
const editActivate = ref(false)
const updateInput = ref('')
const activateEditing = () => {
  editActivate.value = true
}
const handleTodoUpdate = async (e) => {
  e.preventDefault()
  try {
    await updateUserTodo(userData.id, props['info'].id, updateInput.value)
    store.updateTodos(await getUserTodos(userData.id))
    editActivate.value = false
  } catch (error) {
    console.error(error.message)
  }
}
</script>
<template>
  <div v-if="editActivate" id="inputContainer-" class="inputContainer">
    <input
      v-model="updateInput"
      id="editInput-"
      class="addInput"
      type="text"
      placeholder="Enter to do here"
    />
    <button @click="handleTodoUpdate" id="updateTodoButton-" class="addTodoButton">Update</button>
  </div>
  <div v-else>
    <div class="text-check">
      <p id="todoText-" class="todoText">{{ info.name }}</p>
    </div>
    <div id="buttonsContainer-" class="buttonsContainer">
      <span @click="activateEditing" id="editButton">Edit</span>
      <span id="deleteButton-">Delete</span>
    </div>
  </div>
</template>
<style>
.todosContainer {
  flex: 1 1 auto;
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
  color: #fff;
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
  color: #fff;
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
</style>
