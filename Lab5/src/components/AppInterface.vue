<template>
  <div class="appInterface">
    <h1 class="title">To-do list</h1>
    <div id="todosContainer" class="todosContainer"></div>
    <div class="inputContainer">
      <input id="addInput" class="addInput" type="text" placeholder="Enter to do here" />
      <button id="addTodoButton" class="addTodoButton">Add</button>
    </div>
  </div>
</template>
<style>
.appInterface {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 60%;
  width: 35%;
  background-color: #ccf6f6;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: -0.1rem 0.1rem 1rem 1rem rgba(5, 5, 5, 0.092);
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
  color: #fff;
  transition: all 0.4s;
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

@media (max-width: 768px) and (min-width: 425px) {
  .appInterface {
    width: 50%;
  }
}

@media (max-width: 425px) and (min-width: 375px) {
  .appInterface {
    width: 80%;
  }
}

@media (max-width: 320px) {
  .appInterface {
    width: 90%;
  }
}
</style>
