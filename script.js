
(() => {
  'use strict';

  // ==========================================
  // 1. CONFIGURACIÓN DEL DESPACHO
  // ==========================================

  const CONFIG = {
    nombre: 'Atenea | Asistente Virtual',

    servicios: 'Nuestro despacho brinda información sobre asuntos civiles, familiares y mercantiles. Confirma las especialidades reales antes de publicar.',

    horarios: 'El horario de atención está pendiente de configurar. Para más información, comunícate con el despacho.',

    direccion: 'La dirección del despacho está pendiente de configurar.',

    // Agrega 52 seguido de los 10 dígitos
    whatsapp: '525519777010',

    // URL del aviso de privacidad
    privacidad: ''
  };

  // ==========================================
  // 2. ELEMENTOS DEL HTML
  // ==========================================

  const el = id => document.getElementById(id);

  const panel = el('legal-chat');
  const input = el('legal-input');
  const log = el('legal-log');
  const launch = el('legal-launch');
  const opciones = el('legal-options');
  const contacto = el('legal-contact');

  el('legal-title').textContent = CONFIG.nombre;

  // ==========================================
  // 3. CONFIGURAR WHATSAPP
  // ==========================================

  function numeroValido() {
    return /^\d{10,15}$/.test(CONFIG.whatsapp);
  }

  function enlaceWhatsApp(texto) {
    return 'https://wa.me/' + CONFIG.whatsapp +
      '?text=' + encodeURIComponent(texto);
  }

  if (numeroValido()) {
    contacto.href = enlaceWhatsApp(
      'Hola, quisiera información sobre los servicios del despacho jurídico.'
    );

    contacto.hidden = false;
  } else {
    contacto.hidden = true;
  }

  function abrirWhatsApp() {
    if (!numeroValido()) {
      mensaje(
        'El número de WhatsApp del despacho todavía no está configurado.'
      );
      return;
    }

    const url = enlaceWhatsApp(
      'Hola, quisiera comunicarme con el despacho jurídico para recibir atención.'
    );

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // ==========================================
  // 4. AVISO DE PRIVACIDAD
  // ==========================================

  const footer = el('legal-footer');

  if (CONFIG.privacidad.startsWith('https://')) {
    const enlace = document.createElement('a');

    enlace.href = CONFIG.privacidad;
    enlace.textContent = 'Aviso de privacidad';
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';

    footer.appendChild(enlace);
  } else {
    footer.textContent =
      'Demostración: configura el aviso de privacidad antes de publicar.';
  }

  // ==========================================
  // 5. MENSAJES DE CONVERSACIÓN
  // ==========================================

  function mensaje(texto, usuario = false) {
    const p = document.createElement('p');

    p.className = 'legal-message' +
      (usuario ? ' legal-user' : '');

    p.textContent =
      (usuario ? 'Tú: ' : 'Atenea: ') + texto;

    log.appendChild(p);

    // Limitar el historial a 60 mensajes
    while (log.children.length > 60) {
      log.firstElementChild.remove();
    }

    log.scrollTop = log.scrollHeight;
  }

  // ==========================================
  // 6. NORMALIZAR TEXTO
  // ==========================================

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,;:]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ==========================================
  // 7. BOTONES DINÁMICOS
  // ==========================================

  function mostrarOpciones(botones) {
    // Borrar los botones anteriores
    opciones.replaceChildren();

    botones.forEach(opcion => {
      const boton = document.createElement('button');

      boton.type = 'button';
      boton.textContent = opcion.texto;

      boton.addEventListener('click', () => {
        mensaje(opcion.texto, true);
        opcion.accion();
      });

      opciones.appendChild(boton);
    });

    // Mantener visible la respuesta nueva
    log.scrollTop = log.scrollHeight;
  }

  // ==========================================
  // 8. MENÚ PRINCIPAL
  // ==========================================

  function menuPrincipal() {
    mensaje(
      'Con gusto te ayudaré. Selecciona una de las siguientes opciones:'
    );

    mostrarOpciones([
      {
        texto: 'Servicios jurídicos',
        accion: menuServicios
      },
      {
        texto: 'Horarios',
        accion: mostrarHorarios
      },
      {
        texto: 'Ubicación',
        accion: mostrarUbicacion
      },
      {
        texto: 'Solicitar cita',
        accion: menuCitas
      }
    ]);
  }

  // ==========================================
  // 9. SERVICIOS JURÍDICOS
  // ==========================================

  function menuServicios() {
    mensaje(
      '⚖️ Con gusto. ¿Sobre qué área jurídica deseas obtener información?'
    );

    mostrarOpciones([
      {
        texto: 'Derecho civil',
        accion: () => mostrarServicio('civil')
      },
      {
        texto: 'Derecho familiar',
        accion: () => mostrarServicio('familiar')
      },
      {
        texto: 'Derecho mercantil',
        accion: () => mostrarServicio('mercantil')
      },
      {
        texto: 'Volver al menú',
        accion: menuPrincipal
      }
    ]);
  }

  function mostrarServicio(tipo) {
    const respuestas = {
      civil:
        'El derecho civil comprende asuntos relacionados con contratos, obligaciones y bienes, entre otros. Consulta con el despacho si atiende tu situación.',

      familiar:
        'El derecho familiar comprende asuntos como divorcios, pensiones alimenticias y custodia, entre otros. Consulta con el despacho los servicios disponibles.',

      mercantil:
        'El derecho mercantil comprende asuntos relacionados con contratos y operaciones comerciales, entre otros. Consulta con el despacho si atiende tu situación.'
    };

    mensaje(respuestas[tipo]);

    mostrarOpciones([
      {
        texto: 'Solicitar cita',
        accion: menuCitas
      },
      {
        texto: 'Hablar con un asesor',
        accion: menuAsesor
      },
      {
        texto: 'Ver otros servicios',
        accion: menuServicios
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 10. HORARIOS
  // ==========================================

  function mostrarHorarios() {
    mensaje(CONFIG.horarios);

    mostrarOpciones([
      {
        texto: 'Solicitar cita',
        accion: menuCitas
      },
      {
        texto: 'Hablar con un asesor',
        accion: menuAsesor
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 11. UBICACIÓN
  // ==========================================

  function mostrarUbicacion() {
    mensaje(CONFIG.direccion);

    mostrarOpciones([
      {
        texto: 'Solicitar cita',
        accion: menuCitas
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 12. SOLICITAR CITA
  // ==========================================

  function menuCitas() {
    mensaje(
      '📅 ¡Con gusto! Para solicitar una cita con nuestro despacho jurídico, puedes comunicarte por WhatsApp. Nuestro equipo confirmará la disponibilidad.'
    );

    mostrarOpciones([
      {
        texto: 'Abrir WhatsApp',
        accion: abrirWhatsApp
      },
      {
        texto: 'Hablar con un asesor',
        accion: menuAsesor
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 13. HABLAR CON UN ASESOR
  // ==========================================

  function menuAsesor() {
    mensaje(
      '⚖️ ¡Por supuesto! Con gusto puedo ayudarte a contactar con uno de nuestros asesores jurídicos. Para recibir atención personalizada, selecciona "Hablar por WhatsApp".'
    );

    mostrarOpciones([
      {
        texto: 'Hablar por WhatsApp',
        accion: abrirWhatsApp
      },
      {
        texto: 'Volver al menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 14. RECONOCIMIENTO DE PREGUNTAS
  // ==========================================

  function responder(texto) {
    const t = normalizar(texto);

    // Solicitudes de atención humana
    if (
      /\b(asesor|asesora|asesores|abogado|abogada|representante|humano|humana)\b/.test(t) ||
      /atencion personalizada/.test(t) ||
      /\b(hablar|comunicarme|contactar)\b/.test(t) &&
      /\b(alguien|persona|despacho)\b/.test(t)
    ) {
      menuAsesor();
      return;
    }

    // Solicitudes de cita
    if (
      /\b(cita|citas|agendar|reservar|reservacion)\b/.test(t)
    ) {
      menuCitas();
      return;
    }

    // Derecho civil
    if (/\b(civil|civiles)\b/.test(t)) {
      mostrarServicio('civil');
      return;
    }

    // Derecho familiar
    if (
      /\b(familiar|familia|divorcio|custodia)\b/.test(t)
    ) {
      mostrarServicio('familiar');
      return;
    }

    // Derecho mercantil
    if (/\b(mercantil|comercial)\b/.test(t)) {
      mostrarServicio('mercantil');
      return;
    }

    // Servicios
    if (
      /\b(servicio|servicios|areas|especialidades)\b/.test(t)
    ) {
      menuServicios();
      return;
    }

    // Horarios
    if (
      /\b(horario|horarios|abren|cierran|atienden)\b/.test(t)
    ) {
      mostrarHorarios();
      return;
    }

    // Ubicación
    if (
      /\b(ubicacion|direccion|oficina|oficinas|donde)\b/.test(t)
    ) {
      mostrarUbicacion();
      return;
    }

    // WhatsApp y contacto
    if (
      /\b(whatsapp|telefono|contacto|numero)\b/.test(t)
    ) {
      menuAsesor();
      return;
    }

    // Saludos
    if (/\b(hola|buenas|buenos|saludos)\b/.test(t)) {
      menuPrincipal();
      return;
    }

    // Volver al menú
    if (
      /\b(menu|inicio|volver|regresar)\b/.test(t)
    ) {
      menuPrincipal();
      return;
    }

    // Pregunta desconocida
    mensaje(
      'Lo siento, todavía no cuento con una respuesta para esa pregunta. Puedo orientarte sobre nuestros servicios, horarios, ubicación y solicitudes de cita.'
    );

    mostrarOpciones([
      {
        texto: 'Ver servicios',
        accion: menuServicios
      },
      {
        texto: 'Hablar con un asesor',
        accion: menuAsesor
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 15. ENVIAR MENSAJES ESCRITOS
  // ==========================================

  function enviar(texto) {
    texto = texto.trim().slice(0, 300);

    if (!texto) return;

    mensaje(texto, true);
    responder(texto);
  }

  // ==========================================
  // 16. ABRIR Y CERRAR ATENEA
  // ==========================================

  function abrir(abierto) {
    panel.hidden = !abierto;

    launch.setAttribute(
      'aria-expanded',
      String(abierto)
    );

    launch.textContent = abierto
      ? 'Cerrar asistente'
      : 'Abrir asistente';

    if (abierto) {
      input.focus();
    } else {
      launch.focus();
    }
  }

  launch.addEventListener('click', () => {
    abrir(panel.hidden);
  });

  el('legal-close').addEventListener('click', () => {
    abrir(false);
  });

  panel.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      abrir(false);
    }
  });

  // ==========================================
  // 17. FORMULARIO DEL CHAT
  // ==========================================

  el('legal-form').addEventListener('submit', e => {
    e.preventDefault();

    enviar(input.value);

    input.value = '';
    input.focus();
  });

  // ==========================================
  // 18. BIENVENIDA DE ATENEA
  // ==========================================

  mensaje(
    '¡Bienvenido(a)! ⚖️ Soy Atenea, tu asistente virtual del despacho jurídico. Estoy aquí para brindarte información sobre nuestros servicios y orientarte en tus consultas generales. ¿En qué puedo ayudarte hoy?'
  );

  // Mostrar botones iniciales
  mostrarOpciones([
    {
      texto: 'Servicios jurídicos',
      accion: menuServicios
    },
    {
      texto: 'Horarios',
      accion: mostrarHorarios
    },
    {
      texto: 'Ubicación',
      accion: mostrarUbicacion
    },
    {
      texto: 'Solicitar cita',
      accion: menuCitas
    }
  ]);

})();

