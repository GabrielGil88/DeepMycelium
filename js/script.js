
console.log("El script está conectado correctamente");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  // Setea aria-expanded inicialmente
  hamburger.setAttribute("aria-expanded", "false");

  // Toggle menú y aria-expanded
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Cierra el menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    const clickedOutside = !navMenu.contains(e.target) && !hamburger.contains(e.target);
    if (clickedOutside) {
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});
