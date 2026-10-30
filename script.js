
(() => {
  'use strict';

  // ==========================================
  // 1. INFORMACIÓN DEL DESPACHO
  // ==========================================

  const CONFIG = {
    nombre: 'Atenea',
    despacho: 'EYRA LEGAL',

    horarios:
      'Nuestros horarios de atención son:\n\n' +
      'Lunes a viernes: 9:00 a. m. a 6:00 p. m.\n' +
      'Sábados: 9:00 a. m. a 2:00 p. m.',

    direccion:
      'EYRA LEGAL se encuentra en Universidad Lucerna. ' +
      'Para conocer indicaciones más precisas, ' +
      'puedes comunicarte con nuestro equipo.',

    // Código 52 + los 10 dígitos del teléfono
    whatsapp: '',

    // URL HTTPS del aviso de privacidad
    privacidad: ''
  };

  // ==========================================
  // 2. ELEMENTOS HTML
  // ==========================================

  const el = id => document.getElementById(id);

  const panel = el('legal-chat');
  const launch = el('legal-launch');
  const input = el('legal-input');
  const log = el('legal-log');
  const opciones = el('legal-options');
  const contenido = el('legal-content');
  const contacto = el('legal-contact');
  const footer = el('legal-footer');

  el('legal-title').textContent = CONFIG.nombre;

  // ==========================================
  // 3. MOSTRAR MENSAJES
  // ==========================================

  function desplazarChat() {
    requestAnimationFrame(() => {
      contenido.scrollTop = contenido.scrollHeight;
    });
  }

  function mensaje(texto, usuario = false) {
    const p = document.createElement('p');

    p.className = usuario
      ? 'legal-message legal-user'
      : 'legal-message';

    p.textContent =
      (usuario ? 'Tú: ' : 'Atenea: ') + texto;

    log.appendChild(p);

    // Máximo de 60 mensajes visibles
    while (log.children.length > 60) {
      log.firstElementChild.remove();
    }

    desplazarChat();
  }

  // ==========================================
  // 4. WHATSAPP
  // ==========================================

  function numeroValido() {
    return /^\d{10,15}$/.test(CONFIG.whatsapp);
  }

  function enlaceWhatsApp(texto) {
    return 'https://wa.me/' + CONFIG.whatsapp +
      '?text=' + encodeURIComponent(texto);
  }

  // Mostrar botón inferior de WhatsApp
  if (numeroValido()) {
    contacto.href = enlaceWhatsApp(
      'Hola, quisiera información sobre EYRA LEGAL.'
    );

    contacto.hidden = false;
  } else {
    contacto.hidden = true;
  }

  // Abrir WhatsApp desde los menús
  function abrirWhatsApp() {
    if (!numeroValido()) {
      mensaje(
        'El número de WhatsApp del despacho ' +
        'todavía no está configurado.'
      );
      return;
    }

    const url = enlaceWhatsApp(
      'Hola, quisiera comunicarme con un asesor ' +
      'jurídico de EYRA LEGAL.'
    );

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }

  // ==========================================
  // 5. AVISO DE PRIVACIDAD
  // ==========================================

  if (CONFIG.privacidad.startsWith('https://')) {
    const enlace = document.createElement('a');

    enlace.href = CONFIG.privacidad;
    enlace.textContent = 'Aviso de privacidad';
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';

    footer.appendChild(enlace);
  } else {
    footer.textContent =
      'Demostración: configura el aviso de privacidad ' +
      'antes de publicar.';
  }

  // ==========================================
  // 6. NORMALIZAR PREGUNTAS
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
    // Eliminar las opciones anteriores
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

    desplazarChat();
  }

  // ==========================================
  // 8. MENÚ PRINCIPAL
  // ==========================================

  function menuPrincipal() {
    mensaje(
      '¿Qué información deseas consultar? ' +
      'Selecciona una de las siguientes opciones.'
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
      '⚖️ EYRA LEGAL cuenta con cuatro áreas ' +
      'jurídicas. ¿Sobre cuál deseas obtener información?'
    );

    mostrarOpciones([
      {
        texto: 'Derecho laboral',
        accion: () => mostrarServicio('laboral')
      },
      {
        texto: 'Derecho mercantil',
        accion: () => mostrarServicio('mercantil')
      },
      {
        texto: 'Derecho familiar',
        accion: () => mostrarServicio('familiar')
      },
      {
        texto: 'Derecho penal',
        accion: () => mostrarServicio('penal')
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 10. INFORMACIÓN DE CADA ÁREA
  // ==========================================

  function mostrarServicio(tipo) {
    const respuestas = {
      laboral:
        '⚖️ DERECHO LABORAL\n\n' +
        'Esta área aborda las relaciones entre ' +
        'trabajadores y empleadores, incluyendo ' +
        'despidos, contratos laborales, salarios ' +
        'y prestaciones.',

      mercantil:
        '⚖️ DERECHO MERCANTIL\n\n' +
        'Esta área comprende contratos comerciales, ' +
        'operaciones mercantiles y asuntos ' +
        'relacionados con empresas y comerciantes.',

      familiar:
        '⚖️ DERECHO FAMILIAR\n\n' +
        'Esta área comprende divorcios, pensiones ' +
        'alimenticias, guarda y custodia ' +
        'y otros asuntos familiares.',

      penal:
        '⚖️ DERECHO PENAL\n\n' +
        'Esta área comprende asuntos relacionados ' +
        'con delitos, denuncias, procesos penales ' +
        'y los derechos de las personas involucradas.'
    };

    mensaje(
      respuestas[tipo] +
      '\n\nPara revisar tu situación particular, ' +
      'puedes solicitar una consulta con un abogado.'
    );

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
        texto: 'Otros servicios',
        accion: menuServicios
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 11. HORARIOS
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
  // 12. UBICACIÓN
  // ==========================================

  function mostrarUbicacion() {
    mensaje(CONFIG.direccion);

    mostrarOpciones([
      {
        texto: 'Buscar en Google Maps',
        accion: abrirMapa
      },
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

  function abrirMapa() {
    const url =
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Universidad Lucerna');

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  }

  // ==========================================
  // 13. SOLICITAR CITA
  // ==========================================

  function menuCitas() {
    mensaje(
      '📅 ¡Con gusto!\n\n' +
      'Para solicitar una cita en EYRA LEGAL, ' +
      'puedes comunicarte por WhatsApp.\n\n' +
      'Nuestro equipo confirmará la disponibilidad ' +
      'de acuerdo con los horarios de atención.'
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
  // 14. HABLAR CON UN ASESOR
  // ==========================================

  function menuAsesor() {
    mensaje(
      '⚖️ ¡Por supuesto!\n\n' +
      'Con gusto puedo ayudarte a contactar ' +
      'con un asesor jurídico de EYRA LEGAL.\n\n' +
      'Selecciona "Hablar por WhatsApp" para ' +
      'continuar. La atención dependerá de ' +
      'la disponibilidad de nuestro equipo.'
    );

    mostrarOpciones([
      {
        texto: 'Hablar por WhatsApp',
        accion: abrirWhatsApp
      },
      {
        texto: 'Menú principal',
        accion: menuPrincipal
      }
    ]);
  }

  // ==========================================
  // 15. RECONOCIMIENTO DE PREGUNTAS
  // ==========================================

  function responder(texto) {
    const t = normalizar(texto);

    // Hablar con una persona o asesor
    if (
      /\b(asesor|asesora|asesores|abogado|abogada|representante|humano|humana)\b/.test(t) ||
      /atencion personalizada/.test(t) ||
      (
        /\b(hablar|comunicarme|contactar)\b/.test(t) &&
        /\b(alguien|persona|despacho)\b/.test(t)
      )
    ) {
      menuAsesor();
      return;
    }

    // Solicitud de cita
    if (
      /\b(cita|citas|agendar|reservar|reservacion)\b/.test(t)
    ) {
      menuCitas();
      return;
    }

    // Derecho laboral
    if (
      /\b(laboral|trabajo|despido|salario|empleo|prestaciones)\b/.test(t)
    ) {
      mostrarServicio('laboral');
      return;
    }

    // Derecho mercantil
    if (
      /\b(mercantil|comercial|empresa|comercio)\b/.test(t)
    ) {
      mostrarServicio('mercantil');
      return;
    }

    // Derecho familiar
    if (
      /\b(familiar|familia|divorcio|custodia|alimentos)\b/.test(t)
    ) {
      mostrarServicio('familiar');
      return;
    }

    // Derecho penal
    if (
      /\b(penal|delito|denuncia|delincuencia)\b/.test(t)
    ) {
      mostrarServicio('penal');
      return;
    }

    // Servicios generales
    if (
      /\b(servicio|servicios|areas|especialidades)\b/.test(t)
    ) {
      menuServicios();
      return;
    }

    // Horarios
    if (
      /\b(horario|horarios|abren|cierran|atienden|sabado|lunes|viernes)\b/.test(t)
    ) {
      mostrarHorarios();
      return;
    }

    // Ubicación
    if (
      /\b(ubicacion|direccion|oficina|oficinas|donde|lucerna|universidad)\b/.test(t)
    ) {
      mostrarUbicacion();
      return;
    }

    // Contacto
    if (
      /\b(whatsapp|telefono|contacto|numero)\b/.test(t)
    ) {
      menuAsesor();
      return;
    }

    // Saludos
    if (
      /\b(hola|buenas|buenos|saludos)\b/.test(t)
    ) {
      menuPrincipal();
      return;
    }

    // Regresar
    if (
      /\b(menu|inicio|volver|regresar)\b/.test(t)
    ) {
      menuPrincipal();
      return;
    }

    // Preguntas no reconocidas
    mensaje(
      'No tengo una respuesta preparada para ' +
      'esa pregunta. Puedo informarte sobre ' +
      'derecho laboral, mercantil, familiar ' +
      'y penal, además de horarios, ubicación ' +
      'y solicitudes de cita.'
    );

    mostrarOpciones([
      {
        texto: 'Servicios jurídicos',
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
  // 16. ENVIAR MENSAJES ESCRITOS
  // ==========================================

  function enviar(texto) {
    texto = texto.trim().slice(0, 300);

    if (!texto) return;

    mensaje(texto, true);
    responder(texto);
  }

  el('legal-form').addEventListener('submit', e => {
    e.preventDefault();

    enviar(input.value);

    input.value = '';
    input.focus();
  });

  // ==========================================
  // 17. ABRIR Y CERRAR ATENEA
  // ==========================================

  function abrir(abierto) {
    panel.hidden = !abierto;

    launch.setAttribute(
      'aria-expanded',
      String(abierto)
    );

    // Conservamos el texto original del botón
    launch.textContent = 'Abrir asistente';

    if (abierto) {
      input.focus();
      desplazarChat();
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
  // 18. BIENVENIDA DE ATENEA
  // ==========================================

  mensaje(
    '¡Bienvenido(a)! ⚖️ Soy Atenea, ' +
    'tu asistente virtual de EYRA LEGAL.\n\n' +
    'Estoy aquí para brindarte información ' +
    'sobre nuestros servicios jurídicos ' +
    'y orientarte en tus consultas generales.\n\n' +
    '¿En qué puedo ayudarte hoy?'
  );

  // Primer menú
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

