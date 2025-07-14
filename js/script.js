
console.log("El script está conectado correctamente");

// ───────────────────────────────────────────────────────────
// DATOS Y SELECTORES
// ───────────────────────────────────────────────────────────

// Definir los Productos Destacados en un array
const productosDestacados = [
  {
    imgSrc: "imagenes/img_extractoReishi.jpg",
    imgAlt: "Extracto de Reishi",
    titulo: "Extracto de hongo Reishi",
    descripcion: "Tintura madre de Ganoderma Lucidum 1:1. 60ml.",
    precio: 20000,
    id: "001"
  },
  {
    imgSrc: "imagenes/img_capsulasCordycep.jpg",
    imgAlt: "Capsulas de Cordyceps",
    titulo: "Capsulas de hongo Cordyceps",
    descripcion: "60 capsulas de 700mg de Cordyceps Militaris.",
    precio: 28700,
    id: "002"
  },
  {
    imgSrc: "imagenes/img_extractoMelena.jpg",
    imgAlt: "Extracto de Melena de león",
    titulo: "Extracto de hongo Melena de León",
    descripcion: "Tintura madre de Hericium Erinaceus 1:1. 60ml.",
    precio: 21500,
    id: "003"
  },
  {
    imgSrc: "imagenes/img_polvoReishi.jpg",
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
    const productoOriginal = productosDestacados.find(producto => producto.id === idProducto);
    if (productoOriginal) {
      carrito.push({ ...productoOriginal, cantidad: 1 });
    } else {
      console.error("Producto no encontrado con ID:", idProducto);
    }
  }

  guardarCarrito(); // Guardar el carrito actualizado en localStorage
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
  img.setAttribute("src", imgSrc);
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


// ───────────────────────────────────────────────────────────
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ───────────────────────────────────────────────────────────


document.addEventListener('DOMContentLoaded', () => {

  // Actualizar el carrito en el DOM al cargar la página
  actualizarCarritoHTML();

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
});


