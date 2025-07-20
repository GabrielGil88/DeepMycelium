import { productosDestacados, basePath } from './productos.js';
import { contador } from './selectors.js';
import { crearItemCarrito } from './cards.js';


// Carrito actual (se recupera del localStorage o arranca vacío)
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guarda el estado actual del carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Actualiza el contador del carrito en el badge
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

// Calcula y muestra el total en $ del carrito
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

// Dibuja visualmente los productos del carrito (crearItemCarrito)
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

  // Renderizar cada ítem en el contenedor
  carrito.forEach(item => {
    const prod = productosDestacados.find(p => p.id === item.id);
    if (!prod) return;
    const cardElem = crearItemCarrito(prod, item);
    contenedor.appendChild(cardElem);
  });

  guardarCarrito(); // Guarda el carrito actualizado en localStorage
  actualizarResumen(); // Actualiza el total $ del carrito
  actualizarCarritoHTML(); // Actualiza el contador del carrito
  asignarListeners(); // Asigna los listeners a los botones de eliminar y modificar cantidad
}


// Asignar listeners a los botones de eliminar y modificar cantidad
function asignarListeners() {
  // Eliminar del carrito
  document.querySelectorAll('.erase-item').forEach(btn =>
    btn.addEventListener('click', () => {
      eliminarDelCarrito(btn.dataset.id);
    })
  );
  // Modificar cantidad (suma)
  document.querySelectorAll('.btn-sumar').forEach(btn =>
    btn.addEventListener('click', () => {
      modificarCantidad(btn.dataset.id, 1);
    })
  );
  // Modificar cantidad (resta)
  document.querySelectorAll('.btn-restar').forEach(btn =>
    btn.addEventListener('click', () => {
      modificarCantidad(btn.dataset.id, -1);
    })
  );
 // Cambiar cantidad (manual)
  document.querySelectorAll('.input-cantidad').forEach(input =>
    input.addEventListener('change', () => {
      const nuevaCantidad = parseInt(input.value);
      if (nuevaCantidad >= 1) {
        cambiarCantidadManual(input.dataset.id, nuevaCantidad);
      }
    })
  );
  // Vaciar carrito
  document.getElementById("bin-button").addEventListener('click', vaciarCarrito);

  // Finalizar compra
  document.getElementById("checkout-button").addEventListener('click', finalizarCompra);
}

// Filtra el carrito para eliminar el producto con el id especificado
function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito();            
  renderizarCarrito();
  actualizarCarritoHTML();  
}

// Sumar o restar cantidad de un producto
function modificarCantidad(idProducto, cambio) {
  const item = carrito.find(i => i.id === idProducto);
  if (item) {
    item.cantidad = Math.max(1, item.cantidad + cambio);
    renderizarCarrito();
  }
}
// Cambia la cantidad manualmente desde el input
function cambiarCantidadManual(idProducto, nuevaCantidad) {
  const item = carrito.find(i => i.id === idProducto);
  if (item) {
    item.cantidad = nuevaCantidad;
    renderizarCarrito();
  }
}

// Vacia el carrito y actualiza el HTML
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();            
  renderizarCarrito();
  actualizarCarritoHTML();  
}

// Finalizar la compra (aquí podrías integrar con un backend o API)
function finalizarCompra() {
  alert('¡Gracias por tu compra! Pronto recibirás la confirmación por email. 🛒✨');

  carrito = [];
  guardarCarrito();
  renderizarCarrito();
  actualizarCarritoHTML();

  // Redirigir a home después de la alerta
  window.location.href = '/'; 
}

export {
  agregarProductoAlCarrito,
  renderizarCarrito,
  actualizarCarritoHTML
};
