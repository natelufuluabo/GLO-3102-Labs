const navMenuContainer = document.querySelector(".nav-links-phone");
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => {
    navMenuContainer.classList.remove('slideOutLeft');
    navMenuContainer.classList.remove('hidden');
    navMenuContainer.classList.add('slideInRight');
});

closeBtn.addEventListener('click', () => {
    navMenuContainer.classList.remove('slideInRight');
    navMenuContainer.classList.add('slideOutLeft');
});

navMenuContainer.addEventListener('animationend', (event) => {
    if (event.animationName === "slideOutLeft") { // Ensure it's the correct animation
        navMenuContainer.classList.remove('slideOutLeft');
        navMenuContainer.classList.add('hidden');
    }
});