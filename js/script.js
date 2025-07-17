
console.log("El script está conectado correctamente");

// ───────────────────────────────────────────────────────────
// DATOS Y SELECTORES
// ───────────────────────────────────────────────────────────

  // Definir la ruta base para las imágenes
  const basePath = window.location.pathname.includes('/pages/') 
    ? '../imagenes/' 
    : 'imagenes/';


// Definir los Productos Destacados en un array
const productosDestacados = [
  {
    imgSrc: "img_extractoReishi.jpg",
    imgAlt: "Extracto de Reishi",
    titulo: "Extracto de hongo Reishi",
    descripcion: "Tintura madre de Ganoderma Lucidum 1:1. 60ml.",
    precio: 20000,
    id: "001"
  },
  {
    imgSrc: "img_capsulasCordycep.jpg",
    imgAlt: "Capsulas de Cordyceps",
    titulo: "Capsulas de hongo Cordyceps",
    descripcion: "60 capsulas de 700mg de Cordyceps Militaris.",
    precio: 28700,
    id: "002"
  },
  {
    imgSrc: "img_extractoMelena.jpg",
    imgAlt: "Extracto de Melena de león",
    titulo: "Extracto de hongo Melena de León",
    descripcion: "Tintura madre de Hericium Erinaceus 1:1. 60ml.",
    precio: 21500,
    id: "003"
  },
  {
    imgSrc: "img_polvoReishi.jpg",
    imgAlt: "Polvo de Reishi",
    titulo: "Polvo de hongo Reishi",
    descripcion: "Molido de hongo deshidratado de Ganoderma Lucidum. 30gr.",
    precio: 24000,
    id: "004"
  },
];


// Selectores en el DOM

// Selección de elementos del MENÚ HAMBURGUESA
const hamburgerBtn = document.querySelector('#hamburger-btn');
const navMenu = document.querySelector('#nav-menu');

// Selección del contenedor de las cards
const cardsContainer = document.querySelector(".cards-container");



// ───────────────────────────────────────────────────────────
// MENÚ HAMBURGUESA
// ───────────────────────────────────────────────────────────


// Alternar estado del menú
const toggleNavbar = () => {
  navMenu.classList.toggle('active'); //crea la clase 'active' y la mete en un toggle (booleano)
};

// Cerrarse si clickeas afuera
const clickAfuera = event => {
  if (!event.target.closest('#nav-menu, #hamburger-btn')) {
    navMenu.classList.remove('active');
  }
};


// ───────────────────────────────────────────────────────────
// CARRITO DE COMPRAS
// ───────────────────────────────────────────────────────────

// Recuperá el carrito de localStorage o creá uno vacío:
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Siempre que se modifique el carrito, guardá los cambios en localStorage:
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el badge del carrito en el DOM
function actualizarCarritoHTML() {
  //Calcular el total de productos en el carrito
  let cantidadTotal = 0;
  carrito.forEach(item => { cantidadTotal += item.cantidad; });

  //Actualizar el contador del ícono
  const contador = document.getElementById('contador-carrito');
  if (!contador) return;

  contador.textContent = cantidadTotal;

  //Mostrar u ocultar el contador según el total
  if (cantidadTotal > 0) {
    contador.style.display = 'inline-block';
  } else {
    contador.style.display = 'none';
  }
}

// Función para agregar un producto al carrito
// Recibe el id del producto y lo agrega al carrito o incrementa la cantidad si ya existe
function agregarProductoAlCarrito(idProducto) {
  const productoEnCarrito = carrito.find(item => item.id === idProducto);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarritoHTML();
}


// ───────────────────────────────────────────────────────────
// CREAR LAS CARD DE PRODUCTOS
// ───────────────────────────────────────────────────────────

// Función que crea las clases de una card a partir de un objeto producto
function crearCard({ imgSrc, imgAlt, titulo, descripcion, precio, id }) {

  // <div class="card">
  const card = document.createElement("div");
  card.classList.add("card");

  //   <img src="..." alt="...">
  const img = document.createElement("img");
  img.setAttribute("src", basePath + imgSrc);
  img.setAttribute("alt", imgAlt);
  card.appendChild(img);// indica que la imagen es un hijo de la card

  //   <div class="card-text">
  const texto = document.createElement("div");
  texto.classList.add("card-text");

  //     <h3>...</h3>
  const h3 = document.createElement("h3");
  h3.textContent = titulo;
  texto.appendChild(h3);// indica que el título es un hijo de card-text (texto)

  //     <p>...</p>
  const pDesc = document.createElement("p");
  pDesc.textContent = descripcion;
  texto.appendChild(pDesc);// indica que la descripción es un hijo de card-text (texto)

  //     <div class="precio-btn">
  const precioBtn = document.createElement("div");
  precioBtn.classList.add("precio-btn");

  //       <p>$...</p>
  const pPrecio = document.createElement("p");
  pPrecio.textContent = `$${precio.toLocaleString('es-AR')}`; // Formatear el precio con separador de miles
  precioBtn.appendChild(pPrecio);

  //       <button>Comprar</button>
  const comprar = document.createElement("button");
  comprar.classList.add("btn-secondary"); // Agregar clase para estilos
  comprar.textContent = "Comprar";
  comprar.dataset.id = id; // Agregar data-id al botón  
  comprar.addEventListener("click", e => { // Listener para agregar al carrito usando el data-id
    const productoId = e.target.dataset.id;
    console.log("Producto agregado al carrito:", productoId);
    agregarProductoAlCarrito(productoId);
  });
  precioBtn.appendChild(comprar);// indica que el botón de compra es un hijo de precio-btn

  texto.appendChild(precioBtn); // indica que el precio y botón de compra son hijos de card-text (texto)
  card.appendChild(texto); // indica que card-text es un hijo de la card

  return card; // devuelve la card completa
}


// —————————————————————————————————————————————————————
// Función para actualizar el total y ocultar/marcar carrito vacío
// —————————————————————————————————————————————————————
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

// —————————————————————————————————————————————————————
// Función para eliminar y refrescar badge
// —————————————————————————————————————————————————————
function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito();
  renderizarCarrito();
  actualizarCarritoHTML();
}

// —————————————————————————————————————————————————————
// Función simplificada de renderizado de carrito
// —————————————————————————————————————————————————————
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


// ───────────────────────────────────────────────────────────
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ───────────────────────────────────────────────────────────


document.addEventListener('DOMContentLoaded', () => {
  // Generar las cards de productos y agregarlas al contenedor en caso de que exista
  if (cardsContainer) {
    productosDestacados.forEach(producto => {
      const cardElem = crearCard(producto);// crea una card para cada producto (con cada atributo del objeto{})
      cardsContainer.appendChild(cardElem); // agrega la card al contenedor de cards
    });

  }

  // Listeners del menú hamburguesa
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', toggleNavbar);
    document.addEventListener('click', clickAfuera);
  }

  renderizarCarrito();
  actualizarCarritoHTML();
});


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




function modificarCantidad(idProducto, cambio) {
  const producto = carrito.find(item => item.id === idProducto);
  if (producto) {
    producto.cantidad += cambio;
    if (producto.cantidad < 1) producto.cantidad = 1;
    guardarCarrito();
    renderizarCarrito();
    actualizarCarritoHTML();
  }
}

function cambiarCantidadManual(idProducto, nuevaCantidad) {
  const producto = carrito.find(item => item.id === idProducto);
  if (producto) {
    producto.cantidad = nuevaCantidad;
    guardarCarrito();
    renderizarCarrito();
    actualizarCarritoHTML();
  }
}

