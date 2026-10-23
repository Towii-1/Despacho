
(() => {
  'use strict';

  // Información del despacho
  const CONFIG = {
    nombre: 'Tu despacho de abogados',

    servicios: 'EJEMPLO: asuntos civiles, familiares y mercantiles. Sustituye esta lista por los servicios reales.',

    horarios: 'Horario pendiente de configurar. Consulta directamente al despacho.',

    direccion: 'Dirección pendiente de configurar. Consulta directamente al despacho.',

    honorarios: 'El despacho debe confirmar el costo de la consulta y los honorarios antes de contratar.',

    whatsapp: '',

    privacidad: ''
  };

  // Obtener elementos del HTML
  const el = id => document.getElementById(id);

  const panel = el('legal-chat');
  const input = el('legal-input');
  const log = el('legal-log');
  const launch = el('legal-launch');

  el('legal-title').textContent = CONFIG.nombre;

  // Configurar WhatsApp
  if (/^\d{10,15}$/.test(CONFIG.whatsapp)) {
    const a = el('legal-contact');

    a.href = 'https://wa.me/' + CONFIG.whatsapp +
      '?text=' + encodeURIComponent(
        'Hola. Quisiera información para solicitar una cita.'
      );

    a.hidden = false;
  }

  // Aviso de privacidad
  if (CONFIG.privacidad.startsWith('https://')) {
    const a = document.createElement('a');

    a.href = CONFIG.privacidad;
    a.textContent = 'Aviso de privacidad';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    el('legal-footer').append(a);
  } else {
    el('legal-footer').textContent =
      'Demostración: configura el aviso de privacidad antes de publicar.';
  }

  // Mostrar mensajes
  function mensaje(texto, usuario = false) {
    const p = document.createElement('p');

    p.className = 'legal-message' +
      (usuario ? ' legal-user' : '');

    p.textContent =
      (usuario ? 'Tú: ' : 'Asistente: ') + texto;

    log.append(p);

    while (log.children.length > 60) {
      log.firstElementChild.remove();
    }

    log.scrollTop = log.scrollHeight;
  }

  // Normalizar texto
  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Respuestas del asistente
  function responder(texto) {
    const t = normalizar(texto);

    if (/\b(cita|citas|agendar|abogado|abogada|contacto|telefono|whatsapp)\b/.test(t)) {
      return /^\d{10,15}$/.test(CONFIG.whatsapp)
        ? 'Para solicitar una cita, utiliza el botón de WhatsApp. El equipo confirmará disponibilidad; aún no hay una cita reservada.'
        : 'El contacto para solicitar citas todavía no está configurado en esta demostración.';
    }

    if (/\b(servicios|areas|civil|familiar|mercantil|laboral|penal)\b/.test(t)) {
      return CONFIG.servicios;
    }

    if (/\b(horario|horarios|abren|cierran|atienden)\b/.test(t)) {
      return CONFIG.horarios;
    }

    if (/\b(ubicacion|direccion|oficina|oficinas|donde)\b/.test(t)) {
      return CONFIG.direccion;
    }

    if (/\b(honorarios|precio|precios|costo|costos|cuesta|cobran)\b/.test(t)) {
      return CONFIG.honorarios;
    }

    if (/\b(hola|buenas|buenos)\b/.test(t)) {
      return 'Hola. Puedo informarte sobre servicios, horarios, ubicación, honorarios y solicitudes de cita. Elige una opción.';
    }

    return 'No tengo una respuesta aprobada para esa pregunta. Puedo informar sobre servicios, horarios, ubicación, honorarios y citas. Para revisar un caso, contacta al despacho sin compartir aquí información confidencial.';
  }

  // Enviar mensaje
  function enviar(texto) {
    texto = texto.trim().slice(0, 300);

    if (!texto) return;

    mensaje(texto, true);
    mensaje(responder(texto));
  }

  // Abrir y cerrar asistente
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

  // Botón principal
  launch.addEventListener('click', () => {
    abrir(panel.hidden);
  });

  // Botón cerrar
  el('legal-close').addEventListener('click', () => {
    abrir(false);
  });

  // Cerrar con Escape
  panel.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      abrir(false);
    }
  });

  // Formulario de mensajes
  el('legal-form').addEventListener('submit', e => {
    e.preventDefault();

    enviar(input.value);

    input.value = '';
    input.focus();
  });

  // Botones de preguntas frecuentes
  panel.querySelectorAll('[data-question]').forEach(b => {
    b.addEventListener('click', () => {
      enviar(b.dataset.question);
    });
  });

  // Mensaje inicial
  mensaje(
    'Bienvenido. Soy el asistente automatizado del despacho. ¿Qué información necesitas?'
  );

})();
