
console.log("El script está conectado correctamente");

// ───────────────────────────────────────────────────────────
// MENÚ HAMBURGUESA
// ───────────────────────────────────────────────────────────

// 1. Selección de elementos
const hamburgerBtn = document.querySelector('#hamburger-btn');
const navMenu      = document.querySelector('#nav-menu');

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

// 1. Definir los productos en un array
const productos = [
  {
    imgSrc: "imagenes/img_extractoReishi.jpg",
    imgAlt: "Extracto de Reishi",
    titulo: "Extracto de hongo Reishi",
    descripcion: "Tintura madre de Ganoderma Lucidum 1:1. 60ml.",
    precio: "$20.000",
    link: "#"
  },
  {
    imgSrc: "imagenes/img_capsulasCordycep.jpg",
    imgAlt: "Capsulas de Cordyceps",
    titulo: "Capsulas de hongo Cordyceps",
    descripcion: "60 capsulas de 700mg de Cordyceps Militaris.",
    precio: "$28.700",
    link: "#"
  },
  {
    imgSrc: "imagenes/img_extractoMelena.jpg",
    imgAlt: "Extracto de Melena de león",
    titulo: "Extracto de hongo Melena de León",
    descripcion: "Tintura madre de Hericium Erinaceus 1:1. 60ml.",
    precio: "$21.500",
    link: "#"
  },
  {
    imgSrc: "imagenes/img_polvoReishi.jpg",
    imgAlt: "Polvo de Reishi",
    titulo: "Polvo de hongo Reishi",
    descripcion: "Molido de hongo deshidratado de Ganoderma Lucidum. 30gr.",
    precio: "$24.000",
    link: "#"
  },
];

// 2. contendor donde se insertarán las cards
const container = document.querySelector(".cards-container");

// 3. Función que crea las clases de una card a partir de un objeto producto
function crearCard({imgSrc, imgAlt, titulo, descripcion, precio, link}) {

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

  //       <a href="#">Comprar</a>
  const comprar = document.createElement("a");
  comprar.setAttribute("href", link);
  comprar.textContent = "Comprar";
  precioBtn.appendChild(comprar);

  texto.appendChild(precioBtn); // indica que el precio y botón de compra son hijos de card-text (texto)
  card.appendChild(texto); // indica que card-text es un hijo de la card

  return card; // devuelve la card completa
}

// 4. Recorremos el array y agregamos cada card al DOM
productos.forEach(producto => {
  const cardElem = crearCard(producto);// crea una card para cada producto (con cada atributo del objeto{})
  container.appendChild(cardElem);
});