// Cambiar de sección
function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('activa');
    });
    document.getElementById(id).classList.add('activa');
}

// Mostrar/ocultar redes sociales
function toggleRedes() {
    let redes = document.getElementById('redes');
    if (redes.style.display === 'block') {
        redes.style.opacity = '0';
        setTimeout(() => redes.style.display = 'none', 300);
    } else {
        redes.style.display = 'block';
        setTimeout(() => redes.style.opacity = '1', 50);
    }
}

// Ajustes para dispositivos móviles
window.addEventListener('resize', ajustarMenu);
function ajustarMenu() {
    if (window.innerWidth <= 768) {
        document.querySelector('nav').classList.add('menu-movil');
    } else {
        document.querySelector('nav').classList.remove('menu-movil');
    }
}
ajustarMenu();

// Carrito de compras
let carrito = [];

function agregarAlCarrito(nombre) {
    carrito.push(nombre);
    mostrarNotificacion("✅ Producto agregado al carrito");
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoContenido = document.querySelector('.carrito-contenido');
    
    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>Tu carrito está vacío. Explora nuestra tienda y agrega productos.</p>";
    } else {
        carritoContenido.innerHTML = carrito.map((producto, index) => 
            `<p>${index + 1}. ${producto}</p>`
        ).join('');

        carritoContenido.innerHTML += `
            <button onclick="enviarPedidoWhatsApp()">📩 Finalizar Compra</button>
        `;
    }
}

// Notificación al agregar productos
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.add("cerrando");
        setTimeout(() => notificacion.remove(), 500);
    }, 1000);
}

// Enviar pedido a WhatsApp
function enviarPedidoWhatsApp() {
    const numero = "573214473110"; // ✅ Número actualizado

    if (carrito.length === 0) {
        mostrarNotificacion("⚠️ No tienes productos en el carrito");
        return;
    }

    let mensaje = "🛒 *Pedido desde Estudio y marqueteria ANDINA*%0A%0A";
    
    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto} %0A`;
    });

    mensaje += `%0A📞 *Por favor, confirma tu telefono y municipio.*`;

    let url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, "_blank");
}

// Ocultar/mostrar header al hacer scroll
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header.classList.add("hidden-header");
    } else {
        header.classList.remove("hidden-header");
    }

    lastScrollTop = scrollTop;
});
