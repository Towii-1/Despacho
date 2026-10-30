
// Componente Header
function Header() {
    return `
        <header class="header">

            <div class="logo">
                <img src="assets/images/logotipo-h.webp" alt="">
            </div>

            <nav class="nav" id="nav">
                <a href="#inicio">Inicio</a>
                <a href="#nosotros">Nosotros</a>
                <a href="#servicios">Servicios</a>
                <a href="#contacto">Contacto</a>
            </nav>

            <div class="menu-btn" id="menuBtn">
                ☰
            </div>

        </header>
    `;
}

// Renderizar componente
document.getElementById("header").innerHTML = Header();

// Funcionalidad del menú
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});
