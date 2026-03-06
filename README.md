# Detailing Street — Landing Page

## 🚗 Descripción

Landing page profesional para **Detailing Street**, negocio local especializado en pulido y restauración de focos de autos. Construida con HTML, CSS y JavaScript puro.

---

## 🎨 Paleta de Colores

| Variable         | Valor     | Uso                            |
| ---------------- | --------- | ------------------------------ |
| `--navy`         | `#011218` | Fondo oscuro, hero, footer     |
| `--accent`       | `#0D8ECF` | Botones activos, badges, links |
| `--accent-light` | `#3aaee0` | Textos sobre fondo oscuro      |
| `--bg`           | `#ffffff` | Fondo principal (blanco)       |
| `--bg-alt`       | `#f5f8fa` | Secciones alternadas           |
| `--text-3`       | `#64748b` | Texto secundario               |

---

## 📁 Estructura de Archivos

```
landingpage/
├── index.html          ← Estructura HTML completa
├── styles.css          ← Sistema de diseño y estilos
├── script.js           ← Animaciones e interacciones
├── README.md           ← Esta documentación
└── images/
    ├── logo.png        ← Logo principal (generado con IA)
    ├── hero_visual.png ← Visual del hero (generado con IA)
    ├── service_1.png   ← Imagen: Pulido de focos (IA)
    └── service_2.png   ← Imagen: Antes y Después (IA)
```

---

## 🖼️ Imágenes Generadas con IA

| Archivo           | Uso en la web                             |
| ----------------- | ----------------------------------------- |
| `logo.png`        | Navbar + Footer + Sección Nosotros        |
| `hero_visual.png` | Sección Hero (visual flotante)            |
| `service_1.png`   | Card 1: Pulido de Focos (flip card)       |
| `service_2.png`   | Card 2: Restauración Completa (flip card) |

Las Cards 3–6 usan **iconos SVG animados** integrados en el HTML.

---

## ✅ Funcionalidades

- **Navbar sticky** con efecto blur al hacer scroll
- **Menú hamburguesa** para móvil con overlay
- **Flip cards 3D** — hover en desktop / tap en móvil
- **Partículas flotantes** animadas en el hero (50 pcs)
- **Contadores animados** (500+, 98%, 3+, 24h)
- **Scroll reveal** con Intersection Observer
- **Formulario de contacto** con validación
- **Scroll spy** en navbar (link activo por sección)
- **Smooth scroll** personalizado
- **Animación del hero** (elemento flotante con glow)
- **Banda de marcas** con scroll infinito
- **100% Responsive** (Mobile / Tablet / Desktop / XL)

---

## 📱 Breakpoints Responsive

| Ancho        | Layout                                 |
| ------------ | -------------------------------------- |
| `> 1024px`   | Grids de 3 columnas, layout completo   |
| `768–1024px` | Grids de 2 columnas, ajuste tablet     |
| `< 768px`    | 1 columna, menú hamburguesa            |
| `< 480px`    | Espaciados compactos, menos partículas |

---

## ⚙️ Personalización Rápida

### Cambiar número de WhatsApp

Busca y reemplaza `1234567890` con tu número en `index.html`:

```html
href="https://wa.me/TU_NUMERO?text=..."
```

### Cambiar redes sociales

Busca `@detailingstreet` en `index.html` y actualiza los links.

### Cambiar colores

Edita las variables en `styles.css`:

```css
:root {
  --navy: #011218; /* cambiar aquí */
  --accent: #0d8ecf; /* cambiar aquí */
}
```

---

## 🚀 Cómo usar

1. Abre `index.html` directamente en tu navegador
2. No requiere servidor ni instalación
3. Para publicar: sube todos los archivos a tu hosting

---

© 2026 Detailing Street. Todos los derechos reservados.
