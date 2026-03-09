// js/modules/ui.js
import { debounce } from '../utils/helpers.js';

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const scrollThreshold = 60;

  function handleNavbarScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", debounce(handleNavbarScroll, 10), { passive: true });
  handleNavbarScroll();
}

export function initMobileMenu() {
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
  
  if (mobileToggle) mobileToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMenu);
  if (mobileLinks) mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
}

export function initSmoothScroll() {
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
}

export function initFlipCards() {
  document.querySelectorAll(".service-card-flip").forEach((card) => {
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) {
      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    }

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
}

export function initScrollSpy() {
  if (!window.IntersectionObserver) return;
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.fontWeight = '';
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => spyObserver.observe(s));
}
