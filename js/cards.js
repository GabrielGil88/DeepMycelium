import { basePath } from './productos.js';
import { agregarProductoAlCarrito } from './carrito.js';

// Cards productos

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


// Cards en carrito
function crearItemCarrito(prod, item) {
  const fileName = prod.imgSrc.replace(/^(\.\.\/)?imagenes\//, ''); // Normalizar la ruta de la imagen sin /imagenes

  const li = document.createElement('li');
  li.classList.add('cart-card');
  li.innerHTML = `
    <button class="erase-item" data-id="${item.id}">
      <i class="fa fa-trash" aria-hidden="true"></i>
    </button>
    <img src="${basePath + fileName}" alt="${prod.imgAlt}">
    <div class="item-details">
      <div class="item-row">
        <h4>${prod.titulo}</h4>
        <div class="item-quantity">
          <button class="btn-secondary btn-restar" data-id="${item.id}">
            <i class="fa-solid fa-minus"></i>
          </button>
          <input type="number" min="1" value="${item.cantidad}" class="input-cantidad" data-id="${item.id}">
          <button class="btn-secondary btn-sumar" data-id="${item.id}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="item-row">
        <p>${prod.descripcion}</p>
        <span class="item-price">$${(prod.precio * item.cantidad).toLocaleString('es-AR')}</span>
      </div>
    </div>
  `;
  return li;
}

export { crearCard, crearItemCarrito };