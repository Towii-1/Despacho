function Header() {

    return `
        <header class="header">

            <div class="header__inner">
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

                    <a href="nosotros.html" class="header__link">
                        Nosotros
                    </a>
                </nav>
                <button class="header__btn" id="menuIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="header__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-align-center-justified"><path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 6l16 0" />
                        <path d="M4 12l16 0" />
                        <path d="M7 18l10 0" />
                    </svg>
                </button>
            </div>

        </header>
    `;
}

document.getElementById("header").innerHTML = Header();


const nav = document.getElementById("nav");
const currentPage = window.location.pathname.split("/").pop();

/* Estado activo */
document.querySelectorAll(".header__link").forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("header__link--active");
    }

});

/* Menú desplegable */
const menuIcon = document.getElementById("menuIcon");

menuIcon.addEventListener("click", () => {

    nav.classList.toggle("header__nav--active");
    menuIcon.classList.toggle("header__btn--active");

});

