// js/utils/support.js
export function checkBrowserSupport() {
  if (!window.IntersectionObserver) {
    console.warn(
      "IntersectionObserver no está soportado. Animaciones de scroll deshabilitadas.",
    );
    // Fallback gently: make everything visible
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
  }
}
