const productos = [
    {
        id: "01",
        imagen: "imagenes/ACEITE-DE-PEPITAS-DE-UVA.jpg",
        alt: "Foto de un envase de crema",
        nombre: "Aceite de semillas de uva",
        precio: 5000
    },
    {
        id: "02",
        imagen: "imagenes/CREMA-HIDRATANTE-CON-EXTRACTO-DE-UVA.jpg",
        nombre: "Crema hidratante",
        precio: 7000
    },
    {
        id: "03",
        imagen: "imagenes/EXFOLIANTE-DE-SEMILLAS-DE-UVA.webp",
        nombre: "Exfoliante de semillas de uva",
        precio: 4000
    },
];

// Función de comparación para ordenar productos por ID de forma ascendente.
// Para usar con sort
function compararProductosPorIdAscendente(a, b) {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1;
    }
    return 0;
}

// Ordenar los productos por ID de forma descendente
productos.sort(compararProductosPorIdAscendente);

// Array para almacenar los productos en el carrito
let carrito = [];

// Agrega un producto al carrito o incrementa su cantidad si ya existe.
function agregarProductoAlCarrito(idProducto) {
    // Buscar si el producto ya está en el carrito
    let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break; // Salir del bucle una vez que se encuentra el producto
        }
    }

    if (productoEnCarrito) {
        // Si el producto ya está, incrementar la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, buscar el producto en el array 'productos' original
        let productoOriginal = null;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                productoOriginal = productos[i];
                break; // Salir del bucle
            }
        }

        // Añadir el producto al carrito con cantidad 1
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }
    actualizarCarritoHTML(); // Actualizar la vista del carrito
}

// Maneja el evento de clic en los botones "Comprar".
function manejarClicComprar(evento) {
    if (evento.target.classList.contains("btn-comprar")) {
    const productoId = evento.target.dataset.id;
    agregarProductoAlCarrito(productoId);}
}

// Agrega los productos del array 'productos' al DOM y configura los listeners de "Comprar".
function agregarProductos() {
    const divProductos = document.querySelector(".productos");

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        divProductos.insertAdjacentHTML("afterbegin",
            `
            <div class="card">
                <img src="${producto.imgSrc}" alt="${producto.Alt}">
                <div class="card-text">
                    <h3>${producto.titulo}</h3>
                    <p>${producto.descripcion}</p>
                    <div class="precio-btn">
                        <p>${producto.precio}</p>
                        <button type="button" data-id="${producto.id}">Comprar</button>
                    </div>
                </div>
            </div>            
            `
        );
    }

    // Delegación de eventos para los botones "Comprar"
    divProductos.addEventListener("click", manejarClicComprar); //handler
}

// Maneja el evento de clic en los botones de cantidad y eliminar del carrito.
function manejarClicCarrito(evento) {
    const target = evento.target;

    if (target.classList.contains("btn-cantidad") || target.classList.contains("btn-eliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarProductoDelCarrito(productoId);
        } else if (accion === "restar") {
            restarCantidadProducto(productoId);
        } else if (accion === "sumar") {
            sumarCantidadProducto(productoId);
        }
    }
}

// Actualiza el contenido HTML del carrito de compras basado en el array 'carrito'.
function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector(".carritoCompras");

    if (!carritoCompras) {
        console.error("Error: No se encontró el contenedor con la clase 'CarritoCompras'. Asegúrate de que exista en tu HTML.");
        return;
    }

    // Limpiar el contenido actual del carrito y recrear la estructura base
    carritoCompras.innerHTML = `
        <h2>Tu Carrito de Compras</h2>
        <ul class="lista-carrito"></ul>
        <p class="total-carrito"></p>
        <p class="cantidad-carrito"></p>
    `;

    const listaCarrito = carritoCompras.querySelector(".lista-carrito");
    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
                <div>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="restar">-</button>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="sumar">+</button>
                    <button class="btn-eliminar" data-id="${item.id}" data-action="eliminar">x</button>
                </div>
            `;
            listaCarrito.appendChild(li);
            totalPagar += item.precio * item.cantidad;
            cantidadProductosUnicos++;
        }
    }

    // Mostrar el total a pagar y la cantidad de productos
    carritoCompras.querySelector(".total-carrito").textContent = `Total a pagar: $${totalPagar}`;
    carritoCompras.querySelector(".cantidad-carrito").textContent = `Productos en carrito: ${cantidadProductosUnicos}`;

    // Configurar el Event Listener para los botones de cantidad y eliminar
    const nuevoListaCarrito = carritoCompras.querySelector(".lista-carrito");
    nuevoListaCarrito.addEventListener("click", manejarClicCarrito);
}

// Suma una unidad a la cantidad de un producto en el carrito.
function sumarCantidadProducto(idProducto) {
    let productoEnCarrito = null;

    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarritoHTML(); // Actualizar la vista
    }
}

// Resta una unidad a la cantidad de un producto en el carrito.
function restarCantidadProducto(idProducto) {
    let productoEnCarrito = null;
    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idProducto); // Eliminar si la cantidad llega a 0
        } else {
            actualizarCarritoHTML(); // Solo actualizar si la cantidad aún es positiva
        }
    }
}

// Elimina completamente un producto del carrito.
function eliminarProductoDelCarrito(idProducto) {
    // Reconstruir el array carrito sin el producto a eliminar
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        // Buscar los elementos distintos al que hay que eliminar
        if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarritoHTML();
}


// Inicializar la aplicación
agregarProductos();
actualizarCarritoHTML(); // Llamar al inicio para mostrar el carrito vacío si no hay productos









// ───────────────────────────────────────────────────────────
// RENDERIZAR CARRITO EN HTML
// ───────────────────────────────────────────────────────────
function renderizarCarrito() {
  const lista = document.getElementById('cart-items');
  lista.innerHTML = ''; // lo limpiamos

  // Si está vacío mostramos mensaje
  if (carrito.length === 0) {
    lista.innerHTML = '<p>¡Tu carrito está vacío!</p>';
    document.getElementById('cart-summary').style.display = 'none';
    return;
  }
  document.getElementById('cart-summary').style.display = 'block';

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart-item');

    // Calculamos subtotal (quitamos el signo y puntos)
    const precioNum = Number(item.precio.replace(/[$.]/g, ''));
    const subtotal = (precioNum * item.cantidad) / 1000; // asumiendo que los miles vienen con punto

    li.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.imgAlt}" class="cart-item__img">
      <div class="cart-item__info">
        <h4>${item.titulo}</h4>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${(subtotal).toLocaleString('de')}</p>
      </div>
      <button class="cart-item__remove" data-id="${item.id}">&times;</button>
    `;

    // evento para eliminar
    li.querySelector('.cart-item__remove').addEventListener('click', e => {
      const id = e.target.dataset.id;
      carrito = carrito.filter(prod => prod.id !== id);
      guardarCarrito();
      actualizarCarritoHTML();
      renderizarCarrito();
    });

    lista.appendChild(li);
  });
}

// Modifica tu función actualizarCarritoHTML para que también renderice
function actualizarCarritoHTML() {
  // ... tu código de contador

  // Renderizamos listado y total
  renderizarCarrito();

  // Actualizamos total acumulado
  const totalElem = document.getElementById('cart-total');
  const total = carrito.reduce((acc, item) => {
    const precioNum = Number(item.precio.replace(/[$.]/g, ''));
    return acc + (precioNum * item.cantidad);
  }, 0);
  // Dividimos entre 1000 para ajustar miles si usas puntos: ojo con tu formato
  totalElem.textContent = (total / 1000).toLocaleString('de');
}

// Al cargar la página, además de actualizar el contador, imprime el carrito
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarritoHTML();
  // ...
});