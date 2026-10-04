# Orma Logistics — React + Vite

Sitio web oficial clonado y modernizado para **Orma Logistics** en **React + Vite**, con diseño premium, 100% de assets locales (imágenes, logotipos, mapas y tipografías) y componentes interactivos.

## 🚀 Tecnologías

- **Framework**: React 19 + Vite 8
- **Estilos**: Vanilla CSS Design System con tokens modernos y diseño responsivo
- **Iconos**: Lucide React
- **Rendimiento**: Carga instantánea, animaciones a 60fps y bundle optimizado

## 📁 Estructura del Proyecto

```text
├── index.html                   # HTML base con favicons y Google Fonts (Poppins & Roboto)
├── public/
│   └── assets/
│       └── images/              # Fotografías originales, logo, mapa interactivo y clientes
├── src/
│   ├── App.jsx                  # Componente principal con todas las secciones interactivas
│   ├── index.css                # Sistema de diseño, temas de color y responsive queries
│   └── main.jsx                 # Montaje de React DOM
├── package.json
└── vite.config.js
```

## 🛠️ Comandos

### Modo Desarrollo
```bash
npm run dev
```
Servidor local disponible en: **http://localhost:5173**

### Compilar para Producción
```bash
npm run build
```
Genera los archivos optimizados en la carpeta `dist/`.

## ✨ Secciones y Funcionalidades Incluidas

1. **Top Bar**: Teléfono directo `(+52) 442 799 9440`, correo `ormalogistics@gmail.com` y enlaces a redes.
2. **Navbar Sticky**: Logotipo oficial, navegación suave por anclas (`#inicio`, `#nosotros`, `#servicios`, `#sucursales`, `#proyectos`, `#clientes`, `#contacto`) y botón de cotización.
3. **Menú Móvil**: Drawer lateral interactivo para smartphones y tablets.
4. **Hero Slider Dinámico**: Carrusel automático con transiciones suaves, controles manuales e indicadores para "Renta de Maquinaria" y "Tramo 4 y 5 del Tren Maya".
5. **Historia y Experiencia**: Contador insignia "33 Años de experiencia nos respaldan" y pilares de calidad.
6. **Servicios**: Tarjetas con imágenes originales para:
   - Logística
   - Renta de Maquinaria
   - Pipas de 10 y 20 mil litros
   - Autobuses y Van para Transporte de Personal
7. **Banner de Llamada a la Acción (CTA)**: Acceso directo telefónico y botón de WhatsApp.
8. **Sucursales Interactivas**: Mapa de la República Mexicana con pines interactivos para Mérida (Matriz), Playa del Carmen, Valladolid y Cancún.
9. **Casos de Éxito y Proyectos**: Tren Maya, Cimentaciones a Base de Pilas Cortas y Obras Civiles.
10. **Testimonios y Clientes**: Opiniones de directores de proyectos con calificación de 5 estrellas y logotipos de aliados.
11. **Banner de Calidad y Confianza**: Invitación a cotizar proyectos de gran escala.
12. **Footer Integral**: Datos fiscales, dirección de matriz en Mérida, Yucatán, mapa de sitio y avisos legales.
13. **Botón Flotante de WhatsApp**: Chat directo inmediato con mensaje predefinido.
14. **Modal de Cotización**: Formulario interactivo que permite cotizar servicios específicos y conecta automáticamente con WhatsApp.
