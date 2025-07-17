// main.js
import { productosDestacados } from './productos.js';
import { crearCard } from './cards.js';
import { initMenu } from './menu.js';
import { renderizarCarrito, actualizarCarritoHTML } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
  // Generar cards de productos
  const cardsContainer = document.querySelector(".cards-container");
  if (cardsContainer) {
    productosDestacados.forEach(producto => {
      const cardElem = crearCard(producto);
      cardsContainer.appendChild(cardElem);
    });
  }

  // Inicializar menú hamburguesa
  initMenu();

  // Inicializar carrito
  renderizarCarrito();
  actualizarCarritoHTML();
});