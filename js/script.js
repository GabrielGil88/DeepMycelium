
console.log("El script está conectado correctamente");

// ───────────────────────────────────────────────────────────
// MENÚ HAMBURGUESA
// ───────────────────────────────────────────────────────────

// 1. Selección de elementos
const hamburgerBtn = document.querySelector('#hamburger-btn');
const navMenu = document.querySelector('#nav-menu');

// 2. Alternar estado del menú
const toggleNavbar = () => {
  navMenu.classList.toggle('active'); //crea la clase 'active' y la mete en un toggle (booleano)
};

// 3. Cerrar si clickeass fuera
const clickAfuera = event => {
  if (!event.target.closest('#nav-menu, #hamburger-btn')) {
    navMenu.classList.remove('active');
  }
};

// 4. Inicialización
document.addEventListener('DOMContentLoaded', () => {
  hamburgerBtn.addEventListener('click', toggleNavbar);
  document.addEventListener('click', clickAfuera);
});


// ───────────────────────────────────────────────────────────
// INSERTAR PRODUCTOS
// ───────────────────────────────────────────────────────────

// Definir los productos en un array
const productos = [
  {
    imgSrc: "imagenes/img_extractoReishi.jpg",
    imgAlt: "Extracto de Reishi",
    titulo: "Extracto de hongo Reishi",
    descripcion: "Tintura madre de Ganoderma Lucidum 1:1. 60ml.",
    precio: "$20.000",
    id: "#01"
  },
  {
    imgSrc: "imagenes/img_capsulasCordycep.jpg",
    imgAlt: "Capsulas de Cordyceps",
    titulo: "Capsulas de hongo Cordyceps",
    descripcion: "60 capsulas de 700mg de Cordyceps Militaris.",
    precio: "$28.700",
    id: "#02"
  },
  {
    imgSrc: "imagenes/img_extractoMelena.jpg",
    imgAlt: "Extracto de Melena de león",
    titulo: "Extracto de hongo Melena de León",
    descripcion: "Tintura madre de Hericium Erinaceus 1:1. 60ml.",
    precio: "$21.500",
    id: "#03"
  },
  {
    imgSrc: "imagenes/img_polvoReishi.jpg",
    imgAlt: "Polvo de Reishi",
    titulo: "Polvo de hongo Reishi",
    descripcion: "Molido de hongo deshidratado de Ganoderma Lucidum. 30gr.",
    precio: "$24.000",
    id: "#04"
  }, 
];

// Contendor donde se insertarán las cards
const cardsContainer = document.querySelector(".cards-container");

// ───────────────────────────────────────────────────────────
// CARRITO DE COMPRAS
// ───────────────────────────────────────────────────────────

// Array para el carrito y función para agregar productos
let carrito = [];

function agregarProductoAlCarrito(idProducto) {
  const productoEnCarrito = carrito.find(item => item.id === idProducto);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const productoOriginal = productos.find(producto => producto.id === idProducto);
    carrito.push({ ...productoOriginal, cantidad: 1 });
  }
  actualizarCarritoHTML();
}

// Función de ejemplo para refrescar el HTML del carrito (implementa según tu UI)
function actualizarCarritoHTML() {
  console.log('Carrito actual:', carrito);
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
  pPrecio.textContent = precio;
  precioBtn.appendChild(pPrecio);

  //       <button>Comprar</button>
  const comprar = document.createElement("button");
  comprar.textContent = "Comprar";

  // Agregar data-id al botón
  comprar.dataset.id = id;

  // Listener para agregar al carrito usando el data-id
  comprar.addEventListener("click", e => {
    const productoId = e.target.dataset.id;
    console.log("Producto agregado al carrito:", productoId);
    agregarProductoAlCarrito(productoId);
  });

  precioBtn.appendChild(comprar);
  texto.appendChild(precioBtn); // indica que el precio y botón de compra son hijos de card-text (texto)
  card.appendChild(texto); // indica que card-text es un hijo de la card

  return card; // devuelve la card completa
}

// Recorremos el array y agregamos cada card al DOM
productos.forEach(producto => {
  const cardElem = crearCard(producto);// crea una card para cada producto (con cada atributo del objeto{})
  cardsContainer.appendChild(cardElem);
});


