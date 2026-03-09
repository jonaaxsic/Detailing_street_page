// js/modules/form.js
export function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = document.getElementById("form-submit-btn");
    const nombre = form.querySelector("#nombre").value.trim();
    const telefono = form.querySelector("#telefono").value.trim();
    const auto = form.querySelector("#auto").value.trim();
    const mensaje = form.querySelector("#mensaje").value.trim();

    if (!nombre || !telefono || !auto || !mensaje) {
      showFormMessage("Por favor completa todos los campos.", "error");
      return;
    }

    btn.disabled = true;
    btn.innerHTML = "<span>Enviando...</span>";

    setTimeout(() => {
      // Formatear el mensaje para WhatsApp
      const mensajeWA = `Hola! Me gustaría agendar una hora para mis focos.%0A%0A*Nombre:* ${nombre}%0A*Teléfono:* ${telefono}%0A*Auto:* ${auto}%0A*Estado:* ${mensaje}`;
      const numeroWA = "56927450414"; // Número extraído del href flotante
      const urlWA = `https://wa.me/${numeroWA}?text=${mensajeWA}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(urlWA, "_blank");

      showFormMessage("✅ ¡Redirigiendo a WhatsApp!", "success");
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<span>Agenda tu hora</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }, 600);
  });

  function showFormMessage(text, type) {
    let msg = document.getElementById("form-message");
    if (!msg) {
      msg = document.createElement("div");
      msg.id = "form-message";
      form.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.cssText = `
      margin-top: 14px; padding: 12px 18px; border-radius: 10px; font-size: 0.88rem; font-weight: 600; text-align: center;
      background: ${type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)"};
      color: ${type === "success" ? "#15803d" : "#dc2626"};
      border: 1px solid ${type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"};
      animation: fadeUp 0.4s ease both;
    `;
    setTimeout(() => { if (msg) msg.remove(); }, 5000);
  }
}
