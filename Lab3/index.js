const inputBox = document.querySelector('.inputBox');
const errorBtn = document.querySelector('#errorBtn');
const successBtn = document.querySelector('#successBtn');
const infoBtn = document.querySelector('#infoBtn');
const alertContainer = document.querySelector('.alert-container');
const form = document.querySelector('.form');

function addMessage(messageContent, theme) {
    const element = document.createElement('li');
    element.textContent = messageContent;
    element.classList.add('alert-content');
    element.classList.add(theme);
    alertContainer.appendChild(element)
}

function handleBtnClick (buttonType) {
    if (!inputBox.value) return;
    addMessage(inputBox.value, buttonType.target.classList[1]);
    inputBox.value = ''
}

form.addEventListener('submit', (e) => { e.preventDefault(); })

infoBtn.addEventListener('click', (e) => handleBtnClick(e));
errorBtn.addEventListener('click', (e) => handleBtnClick(e));
successBtn.addEventListener('click', (e) => handleBtnClick(e));