function Header() {

    return `
        <header class="header">

            <div class="header__logo">
                <img
                    src="assets/images/logotipo-h.webp"
                    alt="Logotipo del despacho"
                >
            </div>

            <nav class="header__nav" id="nav">

                <a href="index.html" class="header__link">
                    Inicio
                </a>

                
                <a href="servicios.html" class="header__link">
                    Servicios
                </a>

                <a href="colaboradores.html" class="header__link">
                    Colaboradores
                </a>

                <a href="#nosotros" class="header__link">
                    Nosotros
                </a>

            </nav>

            <a href="#contacto" class="header__link--private">

                <p>Consulta privada</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M17 7l-10 10" />
                    <path d="M8 7l9 0l0 9" />
                </svg>

            </a>

        </header>
    `;
}

document.getElementById("header").innerHTML = Header();


const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("header__nav--active");

    });

}

