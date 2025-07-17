import { basePath } from './productos.js';
import { agregarProductoAlCarrito } from './carrito.js';

function crearCard({ imgSrc, imgAlt, titulo, descripcion, precio, id }) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = basePath + imgSrc;
  img.alt = imgAlt;
  card.appendChild(img);

  const texto = document.createElement("div");
  texto.classList.add("card-text");

  const h3 = document.createElement("h3");
  h3.textContent = titulo;
  texto.appendChild(h3);

  const pDesc = document.createElement("p");
  pDesc.textContent = descripcion;
  texto.appendChild(pDesc);

  const precioBtn = document.createElement("div");
  precioBtn.classList.add("precio-btn");

  const pPrecio = document.createElement("p");
  pPrecio.textContent = `$${precio.toLocaleString('es-AR')}`;
  precioBtn.appendChild(pPrecio);

  const btn = document.createElement("button");
  btn.classList.add("btn-secondary");
  btn.textContent = "Comprar";
  btn.dataset.id = id;
  btn.addEventListener("click", () => {
    agregarProductoAlCarrito(id);
  });

  precioBtn.appendChild(btn);
  texto.appendChild(precioBtn);
  card.appendChild(texto);

  return card;
}

export { crearCard };
