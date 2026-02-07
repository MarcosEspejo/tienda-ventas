# 🛍️ TiendaPremium - Plataforma de E-Commerce

Plataforma profesional de venta de productos con **diseño oscuro único** y moderno, completamente responsive.

## ✨ Características

### Diseño
- **🌙 Tema oscuro moderno** con gradientes personalizados y efectos de neón
- **✨ Efectos visuales únicos**: partículas flotantes, efectos glassmorphism, sombras con glow
- **🎨 Paleta de colores vibrante** con tonos púrpura, índigo y cyan
- **🌊 Animaciones fluidas** y transiciones suaves con cubic-bezier
- **📱 Totalmente responsive** - adaptable a móviles, tablets y escritorio
- **🎭 Efectos glassmorphism** con blur y transparencias
- **⚡ Efectos parallax** en scroll

### Funcionalidades del Frontend
- 🏠 **Página principal** con hero section atractivo y efectos de grid animado
- 📦 **Catálogo de productos** con sistema de filtrado por categorías
- 🛒 **Carrito de compras** lateral funcional con glassmorphism
- 🔍 **Búsqueda en tiempo real** de productos
- ⭐ **Sistema de valoraciones** con estrellas
- 🏷️ **Badges** para ofertas y productos nuevos
- 📱 **Menú responsive** para dispositivos móviles
- 👤 **Sistema de autenticación completo**:
  - Modal de login/registro con tabs
  - Panel de usuario con menú de opciones
  - Gestión de sesión
  - Perfil de usuario
  - Opciones de redes sociales
- 💳 **Sección de checkout** (interfaz lista)
- 📧 **Newsletter** para suscripciones
- 🎨 **6 categorías** de productos diferentes
- ✨ **Efectos especiales**: partículas animadas, scroll parallax, appear on scroll

### Diseño de Interfaz
- Header sticky con navegación, búsqueda y efectos glassmorphism
- Categorías con iconos y efectos glow en hover
- Grid de productos adaptativo con bordes iluminados
- Sistema de filtros interactivo con gradientes
- Footer informativo con backdrop blur
- Overlay para modales con efectos de oscurecimiento
- Notificaciones toast animadas
- Modales con glassmorphism y animaciones de entrada
- Panel lateral de usuario con menú completo
- Efectos de partículas en el fondo
- Animaciones de aparición en scroll (Intersection Observer)
- Efectos parallax suaves

## 🚀 Cómo usar

1. **Abrir el proyecto**
   - Simplemente abre el archivo `index.html` con modales de usuario
   ├── css/
   │   ├── styles.css      # Estilos completos tema oscuro
   │   └── animations.css  # Animaciones especiales
   ├── js/
   │   └── main.js         # Funcionalidad completa + efectos
   ├── index.html          # Página principal
   ├── css/
   │   └── styles.css      # Estilos completos
   ├── js/
   │   └── main.js         # Funcionalidad JavaScript
   └── README.md           # Esta documentación
   ```

## 🎨 Personalización
 (Tema Oscuro)
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #6366f1;      /* Índigo vibrante */
    --accent-purple: #a855f7;       /* Púrpura */
    --accent-cyan: #06b6d4;         /* Cyan */
    --bg-primary: #0f172a;          /* Fondo oscuro */
    --bg-secondary: #1e293b;        /* Fondo secundario */
    /* ... más colores personalizabl#f59e0b;
    /* ... más colores */
}
```

### Productos
Modifica el array `productsData` en `main.js` para añadir/editar productos:
```javascript
const productsData = [
    {
        id: 1,
        title: "Nombre del producto",
        category: "electronica",
        price: 99.99,
        // ... más propiedades
    }
];
```

## 📋 Próximos pasos (Backend)

Para la siguiente fase del backend, se recomienda implementar:
- API REST con Node.js/Express o similar
- Base de datos (MongoDB, PostgreSQL, MySQL)
- Autenticación de usuarios
- Gestión de pedidos
- Pasarela de pago
- Panel de administración
- Sistema de inventario

## 🛠️ Tecnologías utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript** (Vanilla) - Funcionalidad sin frameworks
- **Font Awesome 6** - Iconos

## 📱 Responsive Design

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Características destacadas del diseño

1. **Sistema de GAvanzadas**: Transiciones suaves, parallax, particles, intersection observer
4. **Glassmorphism**: Efectos de vidrio translúcido con backdrop-filter
5. **Efectos Glow**: Sombras luminosas y bordes brillantes con neón
6. **Accesibilidad**: Estructura semántica y buenas prácticas
7. **Performance**: Código optimizado sin librerías pesadas
8. **Sistema de Autenticación UI**: Modales completos de login/registro
9. **Efectos Visuales Únicos**: Partículas, gradientes animados, efectos de brillo
10. **Tema Oscuro Profesional**: Diseñado específicamente para dark mode
4. **Accesibilidad**: Estructura semántica y buenas prácticas
5. **Performance**: Código optimizado sin librerías pesadas

---

**Desarrollado con ❤️ para TiendaPremium**
