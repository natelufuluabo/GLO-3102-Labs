const navMenuContainer = document.getElementById("nav-menu-container");
console.log(navMenuContainer)
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');

if (window.screen.width <= 425) {
    navMenuContainer.classList.add('hidden');
    navMenuContainer.classList.remove('desktop-css');
} else if (window.screen.width >= 425 && window.screen.width <= 768) {
    navMenuContainer.classList.remove('hidden');
    navMenuContainer.classList.add('desktop-css');
} 

menuBtn.addEventListener('click', () => {
    navMenuContainer.classList.remove('hidden');
    // navMenuContainer.style.display = "flex";
    navMenuContainer.classList.add('phone-css');
    closeBtn.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    navMenuContainer.classList.remove('phone-css');
    navMenuContainer.classList.add('hidden');
})