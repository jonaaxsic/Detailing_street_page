// js/main.js
import { checkBrowserSupport } from './utils/support.js';
import { initNavbar, initMobileMenu, initSmoothScroll, initFlipCards, initScrollSpy } from './modules/ui.js';
import { initParticles, initScrollReveal, staggerReveal, initParallax, initCounters } from './modules/animations.js';
import { initForm } from './modules/form.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Feature Detection
  checkBrowserSupport();

  // 2. UI Modules
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initFlipCards();
  initScrollSpy();

  // 3. Animation Modules
  initParticles();
  initScrollReveal();
  staggerReveal(".service-card-flip", 80);
  staggerReveal(".testimonio-card", 100);
  staggerReveal(".resultado-card", 100);
  initParallax();
  initCounters();

  // 4. Form Logic
  initForm();
  
  console.log("%c✨ Detailing Street — Deja tus focos como nuevos", "background:#011218;color:#0D8ECF;padding:8px 16px;border-radius:6px;font-weight:bold;font-size:13px;");
});
