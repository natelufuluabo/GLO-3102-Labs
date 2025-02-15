// Variables
let updateInputShowing = false;
let weatherData = [];
let userData = {};

// Select Elements
const addInput = document.querySelector("#addInput");
const addTodoButton = document.querySelector("#addTodoButton");
const todosContainer = document.querySelector("#todosContainer");
const loginSignUpForm = document.querySelector(".login-signup-form");
const overlay = document.querySelector(".login-signup-overlay");
const newIdBtn = document.querySelector(".new-id-button");
const idInput = document.querySelector(".id-input");
const submitIdBtn = document.querySelector(".submit-id-button");
const errorSignUp = document.querySelector(".error-signup");

// Functions
const createUser = async () => {
    const url = "https://glo3102lab4.herokuapp.com/users";
    try {
        const response = await fetch(url, { method : "POST" });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

const getUserTodos = async () => {
    const url = `https://glo3102lab4.herokuapp.com/${userData.id}/tasks`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        data.tasks.forEach((todoItem) => {
            todosContainer.append(createElement(todoItem.id, todoItem.name));
        });
        attachEventListeners();
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

const createElement = (todoId, todoValue) => {
    const editInputId = `editInput-${todoId}`;
    const updateTodoButtonId = `updateTodoButton-${todoId}`;
    const buttonsContainerId = `buttonsContainer-${todoId}`;
    const todoTextId = `todoText-${todoId}`;
    const editButtonId = `editButton-${todoId}`;
    const deleteButtonId = `deleteButton-${todoId}`;
    const inputContainerId = `inputContainer-${todoId}`;

    const newTodoItem = document.createElement("div");
    newTodoItem.classList.add("todo");
    newTodoItem.setAttribute('id', `todo-${todoId}`);
    newTodoItem.innerHTML = `
        <div id=${inputContainerId} class="inputContainer hidden">
            <input id=${editInputId} class="addInput" type="text" placeholder="Enter to do here" />
            <button id=${updateTodoButtonId} class="addTodoButton">Update</button>
        </div>
        <div class="text-check">
            <p id=${todoTextId} class="todoText">${todoValue}</p>
        </div>
        <div id=${buttonsContainerId} class="buttonsContainer">
            <span id=${editButtonId}>Edit</span>
            <span id=${deleteButtonId}>Delete</span>
        </div>
    `;

    return newTodoItem;
};

const updateUI = async (todosContainer, event) => {
    todosContainer.innerHTML = "";
    await getUserTodos();
};

const attachEventListeners = () => {
    todosContainer.addEventListener("click", async (event) => {
        const target = event.target;

        if (target.id.startsWith("editButton-")) {
            const todoId = target.id.replace("editButton-", "");
            const todoContainer = document.querySelector(`#todo-${todoId}`);
            const editInput = document.querySelector(`#editInput-${todoId}`);
            const todoText = document.querySelector(`#todoText-${todoId}`);
            const buttonsContainer = document.querySelector(`#buttonsContainer-${todoId}`);
            const inputContainer = document.querySelector(`#inputContainer-${todoId}`);
            
            editInput.value = todoText.innerHTML;
            updateInputShowing = true;
            updateInputVisibility(updateInputShowing, todoContainer, todoText, buttonsContainer, inputContainer);
        }

        if (target.id.startsWith("updateTodoButton-")) {
            const todoId = target.id.replace("updateTodoButton-", "");
            const editInput = document.querySelector(`#editInput-${todoId}`);
            const url = `https://glo3102lab4.herokuapp.com/${userData.id}/tasks/${todoId}`;
            try {
                const response = await fetch(url, { 
                    method: "PUT", 
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: editInput.value }) 
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                document.getElementById(`todo-${todoId}`).remove();
                await updateUI(todosContainer);
            } catch (error) {
                console.error(error.message);
            }
        }

        if (target.id.startsWith("deleteButton-")) {
            const todoId = target.id.replace("deleteButton-", "");
            if (document.getElementById(`todo-${todoId}`) === null) {
                return;
            }
            document.getElementById(`todo-${todoId}`).remove();
            const url = `https://glo3102lab4.herokuapp.com/${userData.id}/tasks/${todoId}`;
            try {
                const response = await fetch(url, { method: "DELETE" });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                await updateUI(todosContainer);
            } catch (error) {
                console.error(error.message);
            }
        }
    });
};

const updateInputVisibility = (
    updateInputShowing, todoContainer, 
    todoText, buttonsContainer, inputContainer
) => {
    if (updateInputShowing) {
        todoContainer.classList.add("todo2");
        todoContainer.classList.remove("todo");
        todoText.classList.add("hidden");
        buttonsContainer.classList.add("hidden");
        inputContainer.classList.remove("hidden");
        return;
    } else {
        todoContainer.classList.add("todo");
        todoContainer.classList.remove("todo2");
        todoText.classList.remove("hidden");
        buttonsContainer.classList.remove("hidden");
        inputContainer.classList.add("hidden");
        return;
    }
};

newIdBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        userData = await createUser();
        overlay.classList.add("hidden");
        return
    } catch (error) {
        console.error(error.message);
    }
});

submitIdBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    if (idInput.value.length === 0) {
        errorSignUp.classList.remove("hidden");
        return;
    }
    userData = { id : idInput.value }
    const todosContainerRef  = todosContainer;
    const result = await getUserTodos();
    if (result) {
        await updateUI(todosContainerRef);
        errorSignUp.classList.add("hidden");
        overlay.classList.add("hidden");
    } else  {
        errorSignUp.classList.remove("hidden");
    }
    idInput.value = "";
});

addTodoButton.addEventListener("click", async () => {
    if (addInput.value.length === 0) return;
    const url = `https://glo3102lab4.herokuapp.com/${userData.id}/tasks`;
    try {
        const response = await fetch(url, { 
            method : "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: addInput.value }) 
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        await updateUI(todosContainer);
    } catch (error) {
        console.error(error.message);
    }
    addInput.value = "";
});

const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
};

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${months[month]} ${day}, ${year}`;

const fetchWeatherData = async (city="Montreal") => {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f59a323ce8ad472a9dd213908231908&q=${city}`);
    const response = await data.json();
    const location = `${response.location.name}, ${response.location.country}`;
    const currTemp = `${response.current.temp_c}`;
    const highTemp = `${response.forecast.forecastday[0].day.maxtemp_c}`;
    const lowTemp = `${response.forecast.forecastday[0].day.mintemp_c}`;
    const condition =  `${response.current.condition.text}`
    const cleanedData = [location, currTemp, condition, highTemp, lowTemp]
    return cleanedData;
}

const editCityButton = document.querySelector("#editCityButton");
const city = document.querySelector("#city");
const cityUpdateContainer = document.querySelector("#cityUpdateContainer");
const cityInput = document.querySelector("#cityInput");
const updateCityButton = document.querySelector("#updateCityButton");
const date = document.querySelector("#date");
const currTemp = document.querySelector("#currTemp");
const condition = document.querySelector("#condition");
const highTemp = document.querySelector("#highTemp");
const lowTemp = document.querySelector("#lowTemp");
date.innerHTML = formattedDate;

window.addEventListener("load", async () => {
    weatherData = await fetchWeatherData();
    city.innerHTML = weatherData[0];
    currTemp.innerHTML = `${weatherData[1]} <sup>o</sup>C`;
    condition.innerHTML = weatherData[2];
    highTemp.innerHTML = `H: ${weatherData[3]} <sup>o</sup>C`;
    lowTemp.innerHTML = `L: ${weatherData[4]} <sup>o</sup>C`;
});


editCityButton.addEventListener("click", () => {
    cityInput.value = city.innerHTML;
    cityUpdateContainer.classList.remove("hidden");
    editCityButton.classList.add("hidden");
    city.classList.add("hidden");
});

updateCityButton.addEventListener("click", async () => {
    weatherData = await fetchWeatherData(cityInput.value);
    city.innerHTML = weatherData[0];
    currTemp.innerHTML = `${weatherData[1]} <sup>o</sup>C`;
    condition.innerHTML = weatherData[2];
    highTemp.innerHTML = `H: ${weatherData[3]} <sup>o</sup>C`;
    lowTemp.innerHTML = `L: ${weatherData[4]} <sup>o</sup>C`;
    editCityButton.classList.remove("hidden");
    city.classList.remove("hidden");
    cityUpdateContainer.classList.add("hidden");
});

  