/* ==========================================
   EYRA LEGAL - MODO OSCURO
========================================== */

// CREAR BOTÓN FLOTANTE

const botonTema = document.createElement("button");

botonTema.className = "theme-toggle";
botonTema.id = "theme-toggle";
botonTema.type = "button";

document.body.appendChild(botonTema);


// ICONO DE LUNA

const luna = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.9 13.35A9 9 0 1 1 10.65 3.1 7 7 0 0 0 20.9 13.35Z"/>
    </svg>
`;


// ICONO DE SOL

const sol = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="M4.93 4.93l1.42 1.42"/>
        <path d="M17.65 17.65l1.42 1.42"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="M4.93 19.07l1.42-1.42"/>
        <path d="M17.65 6.35l1.42-1.42"/>
    </svg>
`;


// APLICAR TEMA

function aplicarTema(oscuro) {

    document.body.classList.toggle("dark-mode", oscuro);

    botonTema.innerHTML = oscuro ? sol : luna;

    botonTema.title = oscuro
        ? "Activar modo claro"
        : "Activar modo oscuro";

    botonTema.setAttribute("aria-label", botonTema.title);
    botonTema.setAttribute("aria-pressed", String(oscuro));

    localStorage.setItem(
        "eyra-theme",
        oscuro ? "dark" : "light"
    );

}


// RECUPERAR TEMA GUARDADO

aplicarTema(localStorage.getItem("eyra-theme") === "dark");


// CAMBIAR TEMA

botonTema.addEventListener("click", () => {

    const oscuro = document.body.classList.contains("dark-mode");

    aplicarTema(!oscuro);

});
