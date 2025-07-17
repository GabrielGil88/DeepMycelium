// menu.js
import { hamburgerBtn, navMenu } from './selectors.js';

const toggleNavbar = () => {
    navMenu.classList.toggle('active');
};

const clickAfuera = event => {
    if (!event.target.closest('#nav-menu, #hamburger-btn')) {
        navMenu.classList.remove('active');
    }
};

function initMenu() {
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', toggleNavbar);
        document.addEventListener('click', clickAfuera);
    }
}

export { toggleNavbar, clickAfuera, initMenu };
