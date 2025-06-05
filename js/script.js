
console.log("El script está conectado correctamente");

// Script para el botón hamburguesa y el menú de navegación
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    // Toggle al hacer clic en el botón hamburguesa
    hamburger.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que se dispare el evento global
        navMenu.classList.toggle('active');
    });

    // Cerrar menú si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideMenu && !isClickOnHamburger) {
            navMenu.classList.remove('active');
        }
    });
});
