console.log("Atenea está conectado");
document.getElementById("atenea").innerHTML = `

 <button
    id="legal-launch"
    class="legal-launch"
    type="button"
    aria-controls="legal-chat"
    aria-expanded="false">
    Abrir asistente
  </button>

  <!-- ATENEA: ASISTENTE VIRTUAL -->
  <section
    id="legal-chat"
    class="legal-chat"
    aria-labelledby="legal-title"
    hidden>

    <!-- Encabezado -->
    <header class="legal-header">

      <!-- Avatar de balanza plateada -->
      <div class="legal-avatar" aria-hidden="true">

        <svg
          viewBox="0 0 64 64"
          width="34"
          height="34"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round">

          <path d="M32 8V52"/>
          <path d="M19 56H45"/>
          <path d="M25 52H39"/>
          <path d="M11 20H53"/>
          <path d="M32 12L11 20"/>
          <path d="M32 12L53 20"/>

          <path d="M12 20L5 39H19L12 20Z"/>
          <path d="M52 20L45 39H59L52 20Z"/>

          <path d="M5 39Q12 48 19 39"/>
          <path d="M45 39Q52 48 59 39"/>

          <circle
            cx="32"
            cy="9"
            r="3"
            fill="currentColor"/>
        </svg>

      </div>

      <!-- Nombre del asistente -->
      <div class="legal-identity">
        <strong id="legal-title">Atenea</strong>
        <span>Asistente virtual de EYRA LEGAL</span>
      </div>

      <!-- Cerrar asistente -->
      <button
        id="legal-close"
        class="legal-close"
        type="button"
        aria-label="Cerrar asistente">
        &times;
      </button>

    </header>

    <!-- Aviso informativo -->
    <p class="legal-notice">
      Asistente automatizado de información general.
      No sustituye la asesoría jurídica ni confirma citas.
      No compartas documentos ni datos confidenciales.
    </p>

    <!-- Conversación y menús -->
    <div id="legal-content" class="legal-content">

      <!-- Mensajes -->
      <div
        id="legal-log"
        class="legal-log"
        role="log"
        aria-live="polite"
        aria-label="Conversación">
      </div>

      <!-- Botones dinámicos -->
      <nav
        id="legal-options"
        class="legal-options"
        aria-label="Opciones de Atenea">
      </nav>

    </div>

    <!-- Escribir preguntas -->
    <form id="legal-form" class="legal-form">

      <input
        id="legal-input"
        type="text"
        aria-label="Pregunta para Atenea"
        placeholder="¿En qué puedo orientarte hoy?"
        maxlength="300"
        required
        autocomplete="off">

      <button type="submit">
        Enviar
      </button>

    </form>

    <!-- WhatsApp inferior -->
    <a
      id="legal-contact"
      class="legal-contact"
      target="_blank"
      rel="noopener noreferrer"
      hidden>
      Continuar en WhatsApp
    </a>

    <!-- Aviso de privacidad -->
    <footer id="legal-footer"></footer>

  </section> `;