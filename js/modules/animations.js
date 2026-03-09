// js/modules/animations.js
import { debounce } from '../utils/helpers.js';

/* ---- PARTICLE SYSTEM ---- */
export function initParticles() {
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

/* ---- REVEAL ON SCROLL ---- */
export function initScrollReveal() {
  if (!window.IntersectionObserver) return;
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

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

export function staggerReveal(selector, delay = 100) {
  if (!window.IntersectionObserver) return;
  const items = document.querySelectorAll(selector);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add("visible"), i * delay);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  if (items.length) obs.observe(items[0].closest("section") || items[0]);
}

/* ---- PARALLAX ---- */
export function initParallax() {
  const heroBg = document.querySelector(".hero-bg-gradient");
  function handleParallax() {
    if (!heroBg || window.innerWidth < 768) return;
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
  }
  window.addEventListener("scroll", debounce(handleParallax, 8), { passive: true });
}

/* ---- ANIMATED COUNTERS ---- */
export function initCounters() {
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); 
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  window.addEventListener("load", () => {
    document.querySelectorAll(".hero-stats .stat-number").forEach((el) => {
      animateCounter(el, parseInt(el.dataset.target, 10));
    });
  });

  if (!window.IntersectionObserver) return;
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".counter-anim").forEach((el) => {
            animateCounter(el, parseInt(el.dataset.target, 10));
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  const statsBand = document.querySelector(".stats-band");
  if (statsBand) counterObserver.observe(statsBand);
}
