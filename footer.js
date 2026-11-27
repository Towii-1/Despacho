const footer = document.getElementById("footer");

if (footer) {

    footer.innerHTML = `

        <footer class="footer">
            <div class="footer__contenedor">

                <h3 class="footer__marca">EYRA LEGAL</h3>

                <p class="footer__copyright">
                    © 2026 EYRA LEGAL. Todos los derechos reservados.
                </p>

                <button class="footer__developers"
                        id="abrir-desarrolladores"
                        type="button">
                    Equipo de desarrollo
                </button>

            </div>
        </footer>

        <!-- VENTANA EMERGENTE -->

        <dialog class="developers" id="developers"
                aria-labelledby="developers-title">

            <div class="developers__container">

                <button class="developers__close"
                        id="cerrar-desarrolladores"
                        type="button"
                        aria-label="Cerrar ventana">
                    &times;
                </button>

                <div class="developers__header">

                    <p class="developers__eyebrow">
                        CRÉDITOS DEL PROYECTO
                    </p>

                    <h2 class="developers__title" id="developers-title">
                        Equipo de desarrollo
                    </h2>

                    <p class="developers__description">
                        Diseño y desarrollo de la plataforma digital
                        de EYRA LEGAL.
                    </p>

                </div>

                <div class="developers__grid">

                    <article class="developers__member">
                        <img class="developers__image"
                             src="${new URL('./assets/images/desarrollador1.jpg', import.meta.url).href}"
                             alt="Primer integrante">

                        <h3 class="developers__name">Nombre completo 1</h3>
                        <p class="developers__role">Desarrollo web</p>
                    </article>

                    <article class="developers__member">
                        <img class="developers__image"
                             src="${new URL('./assets/images/desarrollador2.jpg', import.meta.url).href}"
                             alt="Segundo integrante">

                        <h3 class="developers__name">Nombre completo 2</h3>
                        <p class="developers__role">Desarrollo web</p>
                    </article>

                    <article class="developers__member">
                        <img class="developers__image"
                             src="${new URL('./assets/images/desarrollador3.jpg', import.meta.url).href}"
                             alt="Tercer integrante">

                        <h3 class="developers__name">Nombre completo 3</h3>
                        <p class="developers__role">Desarrollo web</p>
                    </article>

                    <article class="developers__member">
                        <img class="developers__image"
                             src="${new URL('./assets/images/desarrollador4.jpg', import.meta.url).href}"
                             alt="Cuarto integrante">

                        <h3 class="developers__name">Nombre completo 4</h3>
                        <p class="developers__role">Desarrollo web</p>
                    </article>

                </div>

                <div class="developers__footer">

                    <p class="developers__career">
                        Ingeniería en Desarrollo de Aplicaciones y Software
                    </p>

                    <p class="developers__university">
                        Universidad Lucerna
                    </p>

                    <p class="developers__year">2026</p>

                </div>

            </div>

        </dialog>
    `;

    // FUNCIONAMIENTO DE LA VENTANA EMERGENTE

    const modal = document.getElementById("developers");
    const abrir = document.getElementById("abrir-desarrolladores");
    const cerrar = document.getElementById("cerrar-desarrolladores");

    abrir.addEventListener("click", () => {
        modal.showModal();
        document.body.style.overflow = "hidden";
    });

    cerrar.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });

    modal.addEventListener("close", () => {
        document.body.style.overflow = "";
    });

}