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

export { basePath, productosDestacados };