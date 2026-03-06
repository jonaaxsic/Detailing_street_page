/* =====================================================
   DETAILING STREET — script.js
   Animations, interactions & effects
   ===================================================== */

"use strict";

/* ---- NAVBAR ---- */
const navbar = document.getElementById("navbar");
const scrollThreshold = 60;

function handleNavbarScroll() {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", debounce(handleNavbarScroll, 10), {
  passive: true,
});
handleNavbarScroll();

/* ---- MOBILE MENU ---- */
const mobileToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileClose = document.getElementById("mobile-menu-close");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");

function openMenu() {
  mobileMenu.classList.add("open");
  mobileOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  mobileMenu.classList.remove("open");
  mobileOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

mobileToggle.addEventListener("click", openMenu);
mobileClose.addEventListener("click", closeMenu);
mobileOverlay.addEventListener("click", closeMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ---- PARTICLE SYSTEM ---- */
function initParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;
  const count = window.innerWidth < 768 ? 20 : 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: -${Math.random() * 20}s;
      animation-duration: ${15 + Math.random() * 12}s;
      width: ${1.5 + Math.random() * 3}px;
      height: ${1.5 + Math.random() * 3}px;
      opacity: ${0.2 + Math.random() * 0.4};
    `;
    container.appendChild(p);
  }
}
initParticles();

/* ---- REVEAL ON SCROLL (Intersection Observer) ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ---- ANIMATED COUNTERS ---- */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4); // ease-out quart
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Hero counters (run on load)
window.addEventListener("load", () => {
  document.querySelectorAll(".hero-stats .stat-number").forEach((el) => {
    animateCounter(el, parseInt(el.dataset.target));
  });
});

// Section counters (run when visible)
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".counter-anim").forEach((el) => {
          animateCounter(el, parseInt(el.dataset.target));
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const statsBand = document.querySelector(".stats-band");
if (statsBand) counterObserver.observe(statsBand);

/* ---- FLIP CARDS (mobile tap support) ---- */
document.querySelectorAll(".service-card-flip").forEach((card) => {
  let isMobile = window.matchMedia("(hover: none)").matches;

  if (isMobile) {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  }

  // Keyboard accessibility
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("flipped");
    }
  });
});

/* ---- PARALLAX (Hero background) ---- */
const heroBg = document.querySelector(".hero-bg-gradient");
function handleParallax() {
  if (!heroBg || window.innerWidth < 768) return;
  const scrolled = window.scrollY;
  heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
}
window.addEventListener("scroll", debounce(handleParallax, 8), {
  passive: true,
});

/* ---- FORM SUBMIT ---- */
const form = document.getElementById("contact-form");
if (form) {
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

    // Simulate sending
    btn.disabled = true;
    btn.innerHTML = "<span>Enviando...</span>";

    setTimeout(() => {
      showFormMessage(
        "✅ ¡Mensaje enviado! Te respondo muy pronto por WhatsApp.",
        "success",
      );
      form.reset();
      btn.disabled = false;
      btn.innerHTML =
        '<span>Solicitar Cotización Gratis</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }, 1600);
  });
}

function showFormMessage(text, type) {
  let msg = document.getElementById("form-message");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "form-message";
    form.appendChild(msg);
  }
  msg.textContent = text;
  msg.style.cssText = `
    margin-top: 14px;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 600;
    text-align: center;
    background: ${type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)"};
    color: ${type === "success" ? "#15803d" : "#dc2626"};
    border: 1px solid ${type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"};
    animation: fadeUp 0.4s ease both;
  `;
  setTimeout(() => {
    if (msg) msg.remove();
  }, 5000);
}

/* ---- ACTIVE NAV LINK (scroll spy) ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        // Reset all
        link.style.color = '';
        link.style.fontWeight = '';
        link.classList.remove('nav-active');
        // Activate current
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('nav-active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => spyObserver.observe(s));

/* ---- UTILITY: DEBOUNCE ---- */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/* ---- STAGGER REVEAL for grids ---- */
function staggerReveal(selector, delay = 100) {
  const items = document.querySelectorAll(selector);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("visible"), i * delay);
          });
          obs.disconnect();
        }
      });
    },
    { threshold: 0.1 },
  );

  if (items.length) obs.observe(items[0].closest("section") || items[0]);
}

staggerReveal(".service-card-flip", 80);
staggerReveal(".testimonio-card", 100);
staggerReveal(".resultado-card", 100);

console.log(
  "%c✨ Detailing Street — Deja tus focos como nuevos",
  "background:#011218;color:#0D8ECF;padding:8px 16px;border-radius:6px;font-weight:bold;font-size:13px;",
);
