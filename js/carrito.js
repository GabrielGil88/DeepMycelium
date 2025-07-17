import { productosDestacados, basePath } from './productos.js';
import { contador } from './selectors.js';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarritoHTML() {  
  if (!contador) return;

  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = total;
  contador.style.display = total > 0 ? 'inline-block' : 'none';
}

function agregarProductoAlCarrito(idProducto) {
  const item = carrito.find(p => p.id === idProducto);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarritoHTML();
  renderizarCarrito();
}

function actualizarResumen() {
  const resumen = document.querySelector('#cart-summary h3');
  if (!resumen) return;

  // Calcula siempre el total; si no hay productos, total = 0
  const total = carrito.reduce((sum, item) => {
    const prod = productosDestacados.find(p => p.id === item.id);
    return prod ? sum + prod.precio * item.cantidad : sum;
  }, 0);

  // Solo actualiza el texto; el resto (mostrar/ocultar) ya lo hace renderizarCarrito()
  resumen.textContent = `Total: $${total.toLocaleString('es-AR')}`;
}

// ① Renderizar el carrito
function renderizarCarrito() {
  const contenedor = document.getElementById('cart-items');
  if (!contenedor) return;

  // Limpiar contenedor
  contenedor.innerHTML = '';

  // Si está vacío, mostrar mensaje y salir
  if (carrito.length === 0) {
    contenedor.innerHTML = '<h2>Tu carrito está vacío.</h2>';
    actualizarResumen();
    return;
  }

// ③ Construir el HTML completo en una variable
  let html = '';
  // Renderizar cada ítem
  carrito.forEach(item => {
    const prod = productosDestacados.find(p => p.id === item.id);
    if (!prod) return;
    // Obtener nombre de archivo sin prefijo
    const fileName = prod.imgSrc.replace(/^(\.\.\/)?imagenes\//, '');
    html +=`
      <li class="cart-card">
        <button class="btn-tertiary erase-item" data-id="${item.id}">
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
      </li>
    `;
  });

  // ④ Asignar todo el HTML de una sola vez
  contenedor.innerHTML = html;

  // ⑤ Actualizar resumen, badge y listeners solo UNA vez
  actualizarResumen();
  actualizarCarritoHTML();
  asignarListeners();
}

function asignarListeners() {
  document.querySelectorAll('.erase-item').forEach(btn =>
    btn.addEventListener('click', () => {
      eliminarDelCarrito(btn.dataset.id);
    })
  );

  document.querySelectorAll('.btn-sumar').forEach(btn =>
    btn.addEventListener('click', () => {
      modificarCantidad(btn.dataset.id, 1);
    })
  );

  document.querySelectorAll('.btn-restar').forEach(btn =>
    btn.addEventListener('click', () => {
      modificarCantidad(btn.dataset.id, -1);
    })
  );

  document.querySelectorAll('.input-cantidad').forEach(input =>
    input.addEventListener('change', () => {
      const nuevaCantidad = parseInt(input.value);
      if (nuevaCantidad >= 1) {
        cambiarCantidadManual(input.dataset.id, nuevaCantidad);
      }
    })
  );
}


function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito();
  renderizarCarrito();
  actualizarCarritoHTML();
}

function modificarCantidad(idProducto, cambio) {
  const item = carrito.find(i => i.id === idProducto);
  if (item) {
    item.cantidad = Math.max(1, item.cantidad + cambio);
    guardarCarrito();
    renderizarCarrito();
    actualizarCarritoHTML();
  }
}

function cambiarCantidadManual(idProducto, nuevaCantidad) {
  const item = carrito.find(i => i.id === idProducto);
  if (item) {
    item.cantidad = nuevaCantidad;
    guardarCarrito();
    renderizarCarrito();
    actualizarCarritoHTML();
  }
}

export {
  carrito,
  guardarCarrito,
  actualizarCarritoHTML,
  actualizarResumen,
  agregarProductoAlCarrito,
  renderizarCarrito,  
  asignarListeners,
  eliminarDelCarrito,
  modificarCantidad,
  cambiarCantidadManual
};
